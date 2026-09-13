import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    const artworks = await prisma.artwork.findMany({
      include: { media: true }, // Media relation include kar rahe hain taake secureUrl mil sakay
      orderBy: { createdAt: 'desc' },
    });

    // Frontend ke liye data format adjust karna taake art.image mein media ka secureUrl mil jaye
    const formattedArtworks = artworks.map((art) => ({
      ...art,
      image: art.media?.secureUrl || '', // Agar media linked hai toh uska URL, warna empty
    }));

    return NextResponse.json(formattedArtworks);
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
      mediaId, // <--- Purane image ki jagah ab mediaId receive ho rahi hai
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
        mediaId: mediaId || null, // <--- Database mein mediaId save ho rahi hai
        year: String(year),
        isColor: false,
      },
      include: { media: true }, // Response mein media relation sath bhejne ke liye
    });

    const formatted = {
      ...newArtwork,
      image: newArtwork.media?.secureUrl || '',
    };

    return NextResponse.json(formatted, { status: 201 });
  } catch (error) {
    console.error('Create artwork error:', error);
    return NextResponse.json({ error: 'Failed to create artwork.' }, { status: 500 });
  }
}