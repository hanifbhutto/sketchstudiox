import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import crypto from 'crypto';

export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const mediaItem = await prisma.media.findUnique({
      where: { id },
    });

    if (!mediaItem) {
      return NextResponse.json({ success: false, error: 'Media not found in database' }, { status: 404 });
    }

    if (mediaItem.publicId) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'oeullaft';
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      if (apiKey && apiSecret) {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const stringToSign = `public_id=${mediaItem.publicId}&timestamp=${timestamp}${apiSecret}`;
        const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

        const formData = new URLSearchParams();
        formData.append('public_id', mediaItem.publicId);
        formData.append('signature', signature);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp);

        const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
          method: 'POST',
          body: formData,
        });

        const cloudinaryData = await cloudinaryRes.json();
        console.log('Cloudinary Delete Response:', cloudinaryData);
      }
    }

    // 3. Aakhir mein database se record delete kar dein
    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Media deleted successfully from Cloudinary and database' });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete media record' }, { status: 500 });
  }
}