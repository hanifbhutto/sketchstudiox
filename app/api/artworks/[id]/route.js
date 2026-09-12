import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const artwork = await prisma.artwork.findUnique({
      where: { id: id.toLowerCase() },  
      
    });

    if (!artwork) {
      return NextResponse.json(
        { error: 'Artwork not found in vault.' },
        { status: 404 }
      );
    }

    // Ensure price is returned as a proper number
    const formattedArtwork = {
      ...artwork,
      price: Number(artwork.price) || 0,
    };

    return NextResponse.json(formattedArtwork);
  } catch (error) {
    console.error('Fetch single artwork error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve artwork details.' },
      { status: 500 }
    );
  }
}