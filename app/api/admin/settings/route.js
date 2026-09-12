import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch the single settings record (or create default if empty)
    let settings = await prisma.studioSettings.findFirst();

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
          logoUrl: '',
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch studio settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Find existing settings record or create one
    let settings = await prisma.studioSettings.findFirst();

    if (settings) {
      settings = await prisma.studioSettings.update({
        where: { id: settings.id },
        data: {
          studioEmail: body.studioEmail,
          companyName: body.companyName,
          companyNumber: body.companyNumber,
          incorporationJurisdiction: body.incorporationJurisdiction,
          currency: body.currency,
          paypalClientId: body.paypalClientId,
          paypalEnv: body.paypalEnv,
          turnaroundDays: body.turnaroundDays,
          acceptingCommissions: Boolean(body.acceptingCommissions),
          autoConfirmOrders: Boolean(body.autoConfirmOrders),
          logoUrl: body.logoUrl || '',
        },
      });
    } else {
      settings = await prisma.studioSettings.create({
        data: {
          studioEmail: body.studioEmail,
          companyName: body.companyName,
          companyNumber: body.companyNumber,
          incorporationJurisdiction: body.incorporationJurisdiction,
          currency: body.currency,
          paypalClientId: body.paypalClientId,
          paypalEnv: body.paypalEnv,
          turnaroundDays: body.turnaroundDays,
          acceptingCommissions: Boolean(body.acceptingCommissions),
          autoConfirmOrders: Boolean(body.autoConfirmOrders),
          logoUrl: body.logoUrl || '',
        },
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Failed to save studio settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}