import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      shippingAddress,
      subjectType,
      size,
      medium,
      totalAmount,
      currency = 'USD',
      notes,
      referencePhotoUrl,
    } = body;

    if (!customerName || !customerEmail || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required customer or pricing details.' },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        shippingAddress: shippingAddress || '',
        subjectType: subjectType || 'Portrait',
        size: size || 'A3',
        medium: medium || 'Graphite',
        totalAmount: parseFloat(totalAmount),
        currency,
        notes: notes || '',
        referencePhotoUrl: referencePhotoUrl || null,
        status: 'PENDING_PAYMENT',
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error while saving order.' },
      { status: 500 }
    );
  }
}