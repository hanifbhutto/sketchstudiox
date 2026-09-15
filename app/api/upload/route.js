import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided for upload.' }, { status: 400 });
    }

    // Convert file to array buffer then to base64 buffer for Cloudinary upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload using a promise wrapper around Cloudinary upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'sketch-studio-commissions' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      secureUrl: uploadResult.secure_url, // <-- Fixed: secure_url (with underscore)
      publicId: uploadResult.public_id,
    }, { status: 200 });

  } catch (error) {
    console.error('Cloudinary Route Error:', error);
    return NextResponse.json({ error: error.message || 'Image upload failed.' }, { status: 500 });
  }
}