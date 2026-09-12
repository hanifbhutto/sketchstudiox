import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    const artworks = await prisma.artwork.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(artworks);
  } catch (error) {
    console.error('Fetch artworks error:', error);
    return NextResponse.json({ error: 'Failed to fetch artworks.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      category,
      price,
      medium,
      substrate,
      dimensions,
      status = 'Available',
      description = '',
      image,
      year = '2026',
    } = body;

    if (!title || !price) {
      return NextResponse.json({ error: 'Title and price are required.' }, { status: 400 });
    }

    const count = await prisma.artwork.count();
    const generatedId = `ssx-${String(count + 1).padStart(2, '0')}`;

    const newArtwork = await prisma.artwork.create({
      data: {
        id: generatedId,
        title,
        category,
        price: parseFloat(price),
        medium: medium || 'Graphite & Charcoal',
        substrate: substrate || 'French Cotton',
        dimensions: dimensions || '16 × 20 in',
        status,
        description,
        image: image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        year: String(year),
        isColor: false,
      },
    });

    return NextResponse.json(newArtwork, { status: 201 });
  } catch (error) {
    console.error('Create artwork error:', error);
    return NextResponse.json({ error: 'Failed to create artwork.' }, { status: 500 });
  }
}