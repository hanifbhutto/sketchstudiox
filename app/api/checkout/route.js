import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to get PayPal Access Token & Status using Database Settings
async function getPayPalCredentials() {
  const settings = await prisma.studioSettings.findFirst();

  // Check if gateway is explicitly disabled by admin
  if (settings && settings.paypalEnabled === false) {
    return { disabled: true };
  }

  const clientId = settings?.paypalClientId;
  const clientSecret = settings?.paypalClientSecret;
  const isSandbox = settings?.paypalEnv !== 'production';

  // If credentials are missing or default placeholder, signal simulation mode
  if (!clientId || clientId === 'sb-client-id-sample-token-ssx' || !clientSecret) {
    return { simulation: true, isSandbox };
  }

  const baseURL = isSandbox 
    ? 'https://api-m.sandbox.paypal.com' 
    : 'https://api-m.paypal.com';

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch(`${baseURL}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error_description || 'Failed to authenticate with PayPal gateway.');
  }

  return { accessToken: data.access_token, isSandbox };
}

export async function POST(req) {
  try {
    const { userId, cartId, items: clientItems, shippingDetails, totalAmount } = await req.json();

    if (!shippingDetails || !shippingDetails.email || !shippingDetails.firstName) {
      return NextResponse.json({ error: 'Shipping details and email are required.' }, { status: 400 });
    }

    let cartItems = clientItems || [];
    if (cartItems.length === 0 && cartId) {
      const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { items: { include: { artwork: true } } },
      });
      if (cart) cartItems = cart.items;
    }

    if (cartItems.length === 0) {
      return NextResponse.json({ error: 'Your acquisition bag is empty.' }, { status: 400 });
    }

    const host = req.headers.get('origin') || 'http://localhost:3000';
    const paypalAuth = await getPayPalCredentials();

    // 1. If gateway disabled by admin
    if (paypalAuth.disabled) {
      return NextResponse.json({ 
        error: 'PayPal payment gateway is currently inactive by studio administration.' 
      }, { status: 400 });
    }

    // 2. If simulation mode active (credentials not provided yet)
    if (paypalAuth.simulation) {
      const mockToken = 'SIMULATED-PAYPAL-TOKEN-' + Date.now();
      return NextResponse.json({
        success: true,
        paypalRedirectUrl: `${host}/checkout/success?token=${mockToken}`,
      }, { status: 200 });
    }

    const baseURL = paypalAuth.isSandbox 
      ? 'https://api-m.sandbox.paypal.com' 
      : 'https://api-m.paypal.com';

    // 3. Real PayPal Official Redirect API Call
    const paypalRes = await fetch(`${baseURL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${paypalAuth.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: Number(totalAmount).toFixed(2),
            },
          },
        ],
        application_context: {
          return_url: `${host}/checkout/success`,
          cancel_url: `${host}/checkout`,
        },
      }),
    });

    const paypalData = await paypalRes.json();

    if (!paypalRes.ok) {
      throw new Error(paypalData.message || 'Failed to initialize PayPal official redirect session.');
    }

    const approvalLink = paypalData.links?.find(link => link.rel === 'approve')?.href;

    if (!approvalLink) {
      throw new Error('PayPal official approval link could not be generated.');
    }

    return NextResponse.json({
      success: true,
      paypalRedirectUrl: approvalLink, // Official PayPal Website URL
    }, { status: 200 });

  } catch (error) {
    console.error('PayPal Gateway Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}