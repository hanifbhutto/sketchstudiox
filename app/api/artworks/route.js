import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'All Artworks';
    const sort = searchParams.get('sort') || 'featured';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = 9;
    const skip = (page - 1) * limit;

    const where = {};
    if (category !== 'All Artworks' && category !== 'All Works') {
      where.category = { equals: category, mode: 'insensitive' };
    }

    let orderBy = { createdAt: 'desc' };
    if (sort === 'price-asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price-desc') {
      orderBy = { price: 'desc' };
    }

    const [artworks, totalCount] = await Promise.all([
      prisma.artwork.findMany({
        where,
        include: {
          media: true, // <--- Yeh relation add karna zaroori hai taake secureUrl mil jaye
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.artwork.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit) || 1;

    return NextResponse.json({
      artworks,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Public artworks fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve exhibition artworks.' },
      { status: 500 }
    );
  }
}