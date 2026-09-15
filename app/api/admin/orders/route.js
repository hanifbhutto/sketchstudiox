import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all orders with items, gallery art, and reference photos
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            artwork: {
              include: {
                media: true, // Gallery artwork media image
              },
            },
            media: true, // Custom commission reference photo
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch admin orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders from database.' }, { status: 500 });
  }
}

// PATCH: Update order status or tracking number
export async function PATCH(req) {
  try {
    const { orderId, status, trackingNumber } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required.' }, { status: 400 });
    }

    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    return NextResponse.json({ success: true, order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error('Failed to update order details:', error);
    return NextResponse.json({ error: 'Failed to update order details.' }, { status: 500 });
  }
}