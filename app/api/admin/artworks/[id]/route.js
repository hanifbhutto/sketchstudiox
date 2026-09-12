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
      image,
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
        ...(image && { image }),
      },
    });

    return NextResponse.json(updated);
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