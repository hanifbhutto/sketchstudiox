import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, email, name, address, city, postalCode, country, phone, details, pricing, imageUrl } = body;

    if (!email || !imageUrl) {
      return NextResponse.json({ error: 'Reference photo and patron email are required.' }, { status: 400 });
    }

    // Generate unique sequential commission reference number
    const totalCount = await prisma.order.count({ where: { type: 'Commission' } });
    const orderNumber = `CMX-${20001 + totalCount}`;

    // First, create or find the Media record for the Cloudinary image
    const publicId = `commission-${Date.now()}`;
    const mediaRecord = await prisma.media.create({
      data: {
        id: crypto.randomUUID(),
        publicId: publicId,
        secureUrl: imageUrl,
        filename: 'commission-reference-photo.jpg'
      }
    });

    // Create the commission order using clean OrderItem fields (No fake artwork needed!)
    const commissionOrder = await prisma.order.create({
      data: {
        id: crypto.randomUUID(),
        orderNumber: orderNumber,
        type: 'Commission',
        userId: userId || null,
        email: email,
        name: name || 'Valued Patron',
        address: address || 'Custom Atelier Commission',
        city: city || 'London',
        postalCode: postalCode || 'N/A',
        country: country || 'United Kingdom',
        totalAmount: Number(pricing.totalPrice || 0),
        status: 'Photo Ingested',
        items: {
          create: [
            {
              id: crypto.randomUUID(),
              frame: details.frame || 'Archival Unframed Sheet',
              price: Number(pricing.totalPrice || 0),
              quantity: 1,
              // Direct fields matching our new clean OrderItem architecture
              title: `Bespoke Portrait (${details.subjectCount} Subjects)`,
              medium: details.medium || 'Raw Willow Charcoal',
              substrate: '300 GSM French Cotton Substrate',
              dimensions: details.size || 'A3 (12×16 in)',
              description: `Hand-drawn bespoke commission featuring ${details.subjectCount} subject(s) in ${details.medium}. Special notes: ${details.notes}`,
              mediaId: mediaRecord.id // Direct relation to Media
            }
          ]
        }
      },
      include: {
        items: {
          include: {
            media: true // Fetch media directly from OrderItem
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      orderId: commissionOrder.id,
      orderNumber: commissionOrder.orderNumber,
      message: 'Commission request registered successfully.'
    }, { status: 200 });

  } catch (error) {
    console.error('Create Commission Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit custom commission request.' }, { status: 500 });
  }
}