import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// 1. GET: Fetch studio settings
export async function GET() {
  try {
    let settings = await prisma.studioSettings.findFirst({
      include: { logoMedia: true },
    });

    // Agar settings table empty hai toh default record create karein
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
          turnaroundDays: '7 - 14 Business Days',
          acceptingCommissions: true,
          autoConfirmOrders: true,
          logoMediaId: null,
        },
        include: { logoMedia: true },
      });
    }

    // Frontend compatibility ke liye logoUrl field attach kar rahe hain
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
      paypalClientSecret, // <-- Yeh add karein
      paypalEnv,
      paypalEnabled,      // <-- Yeh bhi add karein
      turnaroundDays,
      acceptingCommissions,
      autoConfirmOrders,
      logoMediaId,
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
      paypalEnabled,      // <-- Yahan bhi include karein
      turnaroundDays,
      acceptingCommissions,
      autoConfirmOrders,
      logoMediaId: logoMediaId || null,
    };

    // Agar user ne naya secret enter kiya hai tabhi update ho, 
    // taake agar blank chhor diya jaye toh purana secret overwrite na ho.
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