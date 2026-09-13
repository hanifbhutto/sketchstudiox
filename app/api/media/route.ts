import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // Agar aapke project mein yeh path hai, ya phir standard client

// GET: Saari saved images fetch karne ke liye
export async function GET() {
  try {
    const mediaFiles = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: mediaFiles });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch media' }, { status: 500 });
  }
}

// POST: Cloudinary upload ke baad database mein record save karne ke liye
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { publicId, secureUrl, filename } = body;

    const newMedia = await prisma.media.create({
      data: {
        publicId,
        secureUrl,
        filename,
      },
    });

    return NextResponse.json({ success: true, data: newMedia });
  } catch (error) {
    console.error('Error saving media record:', error);
    return NextResponse.json({ success: false, error: 'Failed to save media record' }, { status: 500 });
  }
}