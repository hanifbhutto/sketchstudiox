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

    // 1. PRIMARY: Fetch strictly by userId if provided and valid
    if (userId && userId !== 'null' && userId !== 'undefined' && userId !== 'undefined') {
      orders = await prisma.order.findMany({
        where: {
          ...whereClause,
          userId: userId.trim(),
        },
        include: {
          items: {
            include: {
              artwork: {
                include: { media: true },
              },
              media: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    // 2. FALLBACK: If no orders found by userId (or userId wasn't sent), try fetching by email
    if (orders.length === 0 && email && email !== 'null' && email !== 'undefined') {
      orders = await prisma.order.findMany({
        where: {
          ...whereClause,
          email: { equals: email.trim(), mode: 'insensitive' },
        },
        include: {
          items: {
            include: {
              artwork: {
                include: { media: true },
              },
              media: true,
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