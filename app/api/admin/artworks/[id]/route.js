import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

// 1. PUT / PATCH: Full artwork update (Edit) or status toggle
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      category,
      price,
      medium,
      substrate,
      dimensions,
      status,
      description,
      mediaId, // <--- Purane image ki jagah ab mediaId aa rahi hai
    } = body;

    const updated = await prisma.artwork.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(category && { category }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(medium && { medium }),
        ...(substrate && { substrate }),
        ...(dimensions && { dimensions }),
        ...(status && { status }),
        ...(description !== undefined && { description }),
        ...(mediaId !== undefined && { mediaId: mediaId || null }), // <--- Database mein mediaId update ho rahi hai
      },
      include: { media: true }, // <--- Media relation sath fetch kar rahe hain
    });

    // Frontend compatibility ke liye formatted object return kar rahe hain
    const formatted = {
      ...updated,
      image: updated.media?.secureUrl || '',
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Artwork update error:', error);
    return NextResponse.json(
      { error: 'Failed to update artwork in database.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  return PUT(request, { params });
}

// 2. DELETE: Remove artwork from database
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.artwork.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Artwork delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete artwork.' },
      { status: 500 }
    );
  }
}