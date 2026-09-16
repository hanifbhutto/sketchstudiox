import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

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
    const { orderID, shippingData, cartItems, userId } = await req.json();

    const settings = await prisma.studioSettings.findFirst();
    if (!settings) {
      return NextResponse.json({ error: 'Settings not found.' }, { status: 400 });
    }

    let amountPaid = 0;
    let currency = settings.currency || 'USD';

    // CHECK IF IT'S A MOCK PAYMENT TEST
    if (orderID && orderID.startsWith('MOCK-PAYPAL-')) {
      // Calculate total amount from cart items directly for mock test
      amountPaid = (cartItems || []).reduce((sum, item) => {
        const price = item.artwork?.price || item.price || 0;
        const qty = item.quantity || 1;
        return sum + (price * qty);
      }, 0);
    } else {
      // REAL PAYPAL CAPTURE FLOW
      const { accessToken, baseUrl } = await getPayPalAccessToken(
        settings.paypalClientId,
        settings.paypalClientSecret,
        settings.paypalEnv
      );

      const captureRes = await fetch(`${baseUrl}/v2/checkout/orders/${orderID}/capture`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const captureData = await captureRes.json();

      if (captureData.status !== 'COMPLETED') {
        return NextResponse.json({ error: 'Payment capture failed.' }, { status: 400 });
      }

      const captureUnit = captureData.purchase_units?.[0]?.payments?.captures?.[0];
      amountPaid = captureUnit ? parseFloat(captureUnit.amount.value) : 0;
      currency = captureUnit ? captureUnit.amount.currency_code : 'USD';
    }

    // GENERATE UNIQUE ORDER NUMBER & SAVE TO DATABASE
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SSX-${new Date().getFullYear()}-${randomNum}`;

    const savedOrder = await prisma.order.create({
      data: {
        orderNumber: orderNumber,
        type: 'Gallery',
        userId: userId || null,
        email: shippingData?.email || '',
        name: `${shippingData?.firstName || ''} ${shippingData?.lastName || ''}`.trim(),
        address: shippingData?.address || '',
        city: shippingData?.city || '',
        postalCode: shippingData?.postalCode || '',
        country: shippingData?.country || 'United Kingdom',
        totalAmount: amountPaid,
        status: 'Confirmed',
        items: {
          create: (cartItems || []).map((item) => {
            const art = item.artwork || {};
            return {
              artworkId: art.id || item.artworkId || null,
              title: art.title || item.title || 'Master Original',
              frame: item.frame || 'Ebony Hardwood & Museum Mat',
              price: art.price || item.price || 0,
              quantity: item.quantity || 1,
            };
          }),
        },
      },
      include: {
        items: true,
      },
    });

    try {
      if (userId) {
        const userCart = await prisma.cart.findFirst({ where: { userId } });
        if (userCart) {
          await prisma.cartItem.deleteMany({ where: { cartId: userCart.id } });
          await prisma.cart.delete({ where: { id: userCart.id } });
        }
      }
    } catch (cartCleanupErr) {
      console.warn('Server-side cart cleanup warning:', cartCleanupErr);
    }

    return NextResponse.json({ success: true, order: savedOrder });

  } catch (err) {
    console.error('PayPal Capture & Order Save Error:', err);
    return NextResponse.json({ error: 'Failed to capture payment and save order.' }, { status: 500 });
  }
}