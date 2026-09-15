import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch cart items using cartId or userId
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const cartId = searchParams.get('cartId');
    const userId = searchParams.get('userId');

    let cart = null;

    if (userId) {
      cart = await prisma.cart.findUnique({
        where: { userId },
        include: { 
          items: { 
            include: { 
              artwork: { 
                include: { media: true } // Added media inclusion
              } 
            } 
          } 
        },
      });
    }

    if (!cart && cartId) {
      cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { 
          items: { 
            include: { 
              artwork: { 
                include: { media: true } // Added media inclusion
              } 
            } 
          } 
        },
      });
    }

    return NextResponse.json({ 
      cartId: cart ? cart.id : null,
      items: cart ? cart.items : [] 
    }, { status: 200 });
  } catch (error) {
    console.error('Fetch Cart Error:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

// POST: Add item to cart (Handles Guest & User carts via userId)
export async function POST(req) {
  try {
    const { cartId, userId, artworkId, frame } = await req.json();

    if (!artworkId) {
      return NextResponse.json({ error: 'Artwork ID required' }, { status: 400 });
    }

    let cart = null;

    // 1. Find existing cart by cartId or userId
    if (cartId) {
      cart = await prisma.cart.findUnique({ where: { id: cartId } });
    }
    if (!cart && userId) {
      cart = await prisma.cart.findUnique({ where: { userId } });
    }

    // 2. If no cart exists anywhere, create a new guest cart
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: userId || null },
      });
    }

    // 3. Check if artwork already exists in this cart
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, artworkId },
    });

    if (!existingItem) {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          artworkId,
          frame: frame || 'Ebony Hardwood & Museum Mat',
        },
      });
    }

    // Fetch updated cart with relations
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { 
        items: { 
          include: { 
            artwork: { 
              include: { media: true } // Added media inclusion
            } 
          } 
        } 
      },
    });

    return NextResponse.json({ 
      success: true, 
      cartId: updatedCart.id, 
      items: updatedCart.items 
    }, { status: 200 });
  } catch (error) {
    console.error('Add to Cart Error:', error);
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}