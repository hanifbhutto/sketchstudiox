import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// 1. GET: Fetch studio settings
export async function GET() {
  try {
    let settings = await prisma.studioSettings.findFirst({
      include: { logoMedia: true },
    });

    if (!settings) {
      settings = await prisma.studioSettings.create({
        data: {
          studioEmail: 'info@sketchstudiox.com',
          companyName: 'SKETCH X STUDIO LTD',
          companyNumber: '17429707',
          incorporationJurisdiction: 'England and Wales (UK)',
          currency: 'USD',
          paypalClientId: 'sb-client-id-sample-token-ssx',
          paypalEnv: 'sandbox',
          paypalEnabled: true,
          turnaroundDays: '7 - 14 Business Days',
          acceptingCommissions: true,
          autoConfirmOrders: true,
          logoMediaId: null,
          proprietorName: null,
          proprietorEmail: null,
          proprietorPhone: null,
          proprietorAddress: null,
          whatsappNumber: null, // <-- Added here
          whatsappEnabled: false, // <-- Added here
        },
        include: { logoMedia: true },
      });
    }

    const formatted = {
      ...settings,
      logoUrl: settings.logoMedia?.secureUrl || '',
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Fetch studio settings error:', error);
    return NextResponse.json({ error: 'Failed to retrieve settings.' }, { status: 500 });
  }
}

// 2. POST: Upsert studio settings
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      studioEmail,
      companyName,
      companyNumber,
      incorporationJurisdiction,
      currency,
      paypalClientId,
      paypalClientSecret,
      paypalEnv,
      paypalEnabled,
      turnaroundDays,
      acceptingCommissions,
      autoConfirmOrders,
      logoMediaId,
      proprietorName,
      proprietorEmail,
      proprietorPhone,
      proprietorAddress,
      whatsappNumber, // <-- Added here
      whatsappEnabled, // <-- Added here
    } = body;

    let settings = await prisma.studioSettings.findFirst();

    const dataPayload = {
      studioEmail,
      companyName,
      companyNumber,
      incorporationJurisdiction,
      currency,
      paypalClientId,
      paypalEnv,
      paypalEnabled,
      turnaroundDays,
      acceptingCommissions,
      autoConfirmOrders,
      proprietorName: proprietorName || null,
      proprietorEmail: proprietorEmail || null,
      proprietorPhone: proprietorPhone || null,
      proprietorAddress: proprietorAddress || null,
      whatsappNumber: whatsappNumber || null, // <-- Added here
      whatsappEnabled: whatsappEnabled ?? false, // <-- Added here
      logoMedia: logoMediaId 
        ? { connect: { id: logoMediaId } } 
        : { disconnect: true },
    };

    if (paypalClientSecret !== undefined && paypalClientSecret !== '') {
      dataPayload.paypalClientSecret = paypalClientSecret;
    }

    if (settings) {
      settings = await prisma.studioSettings.update({
        where: { id: settings.id },
        data: dataPayload,
        include: { logoMedia: true },
      });
    } else {
      settings = await prisma.studioSettings.create({
        data: {
          ...dataPayload,
          paypalClientSecret: paypalClientSecret || '',
        },
        include: { logoMedia: true },
      });
    }

    const formatted = {
      ...settings,
      logoUrl: settings.logoMedia?.secureUrl || '',
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Save studio settings error:', error);
    return NextResponse.json({ error: 'Failed to update settings.' }, { status: 500 });
  }
}