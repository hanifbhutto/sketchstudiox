import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

const DEFAULT_FLYER_RATES = {
  'A4 (8×12)': { 1: 200 },
  'A3 (12×16)': { 1: 250, 2: 400 },
  '16×20': { 1: 300, 2: 450, 3: 550 },
  '18×24': { 1: 350, 2: 500, 3: 650, 4: 750 },
  '20×30': { 1: 400, 2: 550, 3: 700, 4: 800, 5: 900 },
  '24×36': { 1: 450, 2: 650, 3: 750, 4: 850, 5: 950, 6: 1050 },
  '30×40': { 1: 550, 2: 750, 3: 900, 4: 1050, 5: 1150, 6: 1300, 7: 1450, 8: 1600, 9: 1750, 10: 1850 }
};

// 1. GET: Fetch all rates from PricingRate table and reconstruct grid
export async function GET() {
  try {
    const records = await prisma.pricingRate.findMany();

    // Agar table empty ho to default flyer rates se seed kar dein
    if (records.length === 0) {
      const seedEntries = [];
      for (const [canvasSize, subjects] of Object.entries(DEFAULT_FLYER_RATES)) {
        for (const [subjectCount, price] of Object.entries(subjects)) {
          seedEntries.push({
            canvasSize,
            subjectCount: Number(subjectCount),
            price: Number(price),
          });
        }
      }

      await prisma.pricingRate.createMany({
        data: seedEntries,
        skipDuplicates: true,
      });

      return NextResponse.json({ rates: DEFAULT_FLYER_RATES });
    }

    // Records ko nested object format mein structure karein: { [canvasSize]: { [subjectCount]: price } }
    const matrix = {};
    for (const row of records) {
      if (!matrix[row.canvasSize]) {
        matrix[row.canvasSize] = {};
      }
      matrix[row.canvasSize][row.subjectCount] = row.price;
    }

    return NextResponse.json({ rates: matrix });
  } catch (error) {
    console.error('Fetch pricing matrix error:', error);
    return NextResponse.json({ error: 'Failed to retrieve pricing records.' }, { status: 500 });
  }
}

// 2. POST: Upsert updated rates into PricingRate table
export async function POST(request) {
  try {
    const body = await request.json();
    const { rates } = body;

    if (!rates || typeof rates !== 'object') {
      return NextResponse.json({ error: 'Invalid rates data payload.' }, { status: 400 });
    }

    // Transaction ke zariye safe updates
    const updates = [];
    for (const [canvasSize, subjects] of Object.entries(rates)) {
      for (const [subjectCount, price] of Object.entries(subjects)) {
        if (price !== '' && price !== undefined && !isNaN(Number(price))) {
          updates.push(
            prisma.pricingRate.upsert({
              where: {
                canvasSize_subjectCount: {
                  canvasSize,
                  subjectCount: Number(subjectCount),
                },
              },
              update: {
                price: parseFloat(price),
              },
              create: {
                canvasSize,
                subjectCount: Number(subjectCount),
                price: parseFloat(price),
              },
            })
          );
        }
      }
    }

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save pricing matrix error:', error);
    return NextResponse.json({ error: 'Failed to update rates in database.' }, { status: 500 });
  }
}