import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId, cartId, shippingDetails, totalAmount } = await req.json();

    if (!shippingDetails || !shippingDetails.email || !shippingDetails.firstName) {
      return NextResponse.json({ error: 'Shipping details and email are required.' }, { status: 400 });
    }

    let cart = null;
    if (cartId) {
      cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { items: { include: { artwork: true } } },
      });
    }

    if (!cart && userId) {
      cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { artwork: true } } },
      });
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      return NextResponse.json({ error: 'Your acquisition bag is empty or invalid.' }, { status: 400 });
    }

    const order = await prisma.$transaction(async (tx) => {
      const totalOrdersCount = await tx.order.count();
      const exactDbOrderNumber = `SSX-${10001 + totalOrdersCount}`;

      const newOrder = await tx.order.create({
        data: {
          orderNumber: exactDbOrderNumber,
          userId: userId || null,
          email: shippingDetails.email,
          name: `${shippingDetails.firstName} ${shippingDetails.lastName}`.trim(),
          address: shippingDetails.address,
          city: shippingDetails.city,
          postalCode: shippingDetails.postalCode,
          country: shippingDetails.country,
          totalAmount: Number(totalAmount),
          status: 'Pending',
        },
      });

      const orderItemPromises = cart.items.map((cartItem) => 
        tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            artworkId: cartItem.artworkId,
            frame: cartItem.frame || 'Standard Presentation', // Fixed: changed item.frame to cartItem.frame
            price: cartItem.artwork?.price || 0,
            quantity: cartItem.quantity || 1,
          },
        })
      );

      await Promise.all(orderItemPromises);

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      await tx.cart.delete({ where: { id: cart.id } }).catch(() => {});

      return newOrder;
    }, { timeout: 10000 });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      message: 'Order placed successfully.',
    }, { status: 200 });

  } catch (error) {
    console.error('Checkout Processing Error:', error);
    return NextResponse.json({ error: 'Failed to process checkout settlement.' }, { status: 500 });
  }
}