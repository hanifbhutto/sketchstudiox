import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId, guestCartId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // 1. Check if user already has a cart in DB linked with userId
    let userCart = await prisma.cart.findUnique({
      where: { userId },
      include: { 
        items: { 
          include: { 
            artwork: { 
              include: { media: true } 
            } 
          } 
        } 
      },
    });

    let activeCart = null;

    if (guestCartId) {
      const guestCart = await prisma.cart.findUnique({
        where: { id: guestCartId },
        include: { 
          items: { 
            include: { 
              artwork: { 
                include: { media: true } 
              } 
            } 
          } 
        },
      });

      if (guestCart && guestCart.items.length > 0) {
        // If user had an old separate cart, delete it and use the guest cart
        if (userCart && userCart.id !== guestCart.id) {
          await prisma.cart.delete({ where: { id: userCart.id } }).catch(() => {});
        }
        // Bind guest cart to this logged-in user
        activeCart = await prisma.cart.update({
          where: { id: guestCart.id },
          data: { userId },
          include: { 
            items: { 
              include: { 
                artwork: { 
                  include: { media: true } 
                } 
              } 
            } 
          },
        });
      } else {
        // Guest cart had no items, use user's existing DB cart if any
        if (userCart) {
          activeCart = userCart;
        } else if (guestCart) {
          activeCart = await prisma.cart.update({
            where: { id: guestCart.id },
            data: { userId },
            include: { 
              items: { 
                include: { 
                  artwork: { 
                    include: { media: true } 
                  } 
                } 
              } 
            },
          });
        }
      }
    } else {
      if (userCart) {
        activeCart = userCart;
      }
    }

    // If still no cart found anywhere, create a brand new one for this user
    if (!activeCart) {
      activeCart = await prisma.cart.create({
        data: { userId },
        include: { 
          items: { 
            include: { 
              artwork: { 
                include: { media: true } 
              } 
            } 
          } 
        },
      });
    }

    return NextResponse.json({
      success: true,
      cartId: activeCart.id,
      items: activeCardItemsHelper(activeCart.items), // or activeCart.items
    }, { status: 200 });
  } catch (error) {
    console.error('Cart Sync Error:', error);
    return NextResponse.json({ error: 'Failed to sync cart' }, { status: 500 });
  }
}

function activeCardItemsHelper(items) {
  return items || [];
}