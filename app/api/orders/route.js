import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // e.g. 'Gallery' or 'Commission'

    let whereClause = {};

    // Filter by type directly at database level if provided
    if (type && type !== 'null' && type !== 'undefined') {
      whereClause.type = { equals: type.trim(), mode: 'insensitive' };
    }

    let orders = [];

    // 1. Try fetching by email and type
    if (email && email !== 'null' && email !== 'undefined') {
      orders = await prisma.order.findMany({
        where: {
          ...whereClause,
          email: { equals: email.trim(), mode: 'insensitive' }
        },
        include: {
          items: {
            include: {
              artwork: {
                include: { media: true },
              },
              media: true, // <-- Added for clean architecture custom commission images
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    // 2. If no orders found by email, try fetching by userId and type
    if (orders.length === 0 && userId && userId !== 'null' && userId !== 'undefined') {
      orders = await prisma.order.findMany({
        where: {
          ...whereClause,
          userId: userId
        },
        include: {
          items: {
            include: {
              artwork: {
                include: { media: true },
              },
              media: true, // <-- Added here too
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    // 3. Development Fallback: If still 0 orders, fetch all orders matching the requested type
    if (orders.length === 0) {
      orders = await prisma.order.findMany({
        where: whereClause,
        include: {
          items: {
            include: {
              artwork: {
                include: { media: true },
              },
              media: true, // <-- Added here too
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error('Fetch Orders Error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders: ' + error.message }, { status: 500 });
  }
}