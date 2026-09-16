import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma'; // Apne prisma client ka path check kar lein

async function getPayPalAccessToken(clientId, clientSecret, env) {
  const baseUrl = env === 'production' 
    ? 'https://api-m.paypal.com' 
    : 'https://api-m.sandbox.paypal.com';

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'x-www-form-urlencoded',
    },
  });

  const data = await res.json();
  return { accessToken: data.access_token, baseUrl };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, currency = 'USD' } = body;

    // Database se admin settings fetch karein
    const settings = await prisma.studioSettings.findFirst();
    
    if (!settings || !settings.paypalEnabled) {
      return NextResponse.json({ error: 'PayPal gateway is currently inactive.' }, { status: 400 });
    }

    const clientId = settings.paypalClientId;
    const clientSecret = settings.paypalClientSecret;
    const env = settings.paypalEnv; // 'sandbox' ya 'production'

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'PayPal credentials not configured in admin settings.' }, { status: 400 });
    }

    const { accessToken, baseUrl } = await getPayPalAccessToken(clientId, clientSecret, env);

    // PayPal par order create karein
    const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: Number(amount).toFixed(2),
            },
          },
        ],
      }),
    });

    const orderData = await orderRes.json();
    return NextResponse.json({ id: orderData.id });

  } catch (err) {
    console.error('PayPal Create Order Error:', err);
    return NextResponse.json({ error: 'Failed to create PayPal order.' }, { status: 500 });
  }
}