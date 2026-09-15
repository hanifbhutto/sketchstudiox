import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// DELETE: Remove specific cart item by ID and delete cart if empty
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get('itemId');

    if (!itemId) {
      return NextResponse.json({ error: 'Item ID required' }, { status: 400 });
    }

    // 1. Find the item first to get its cartId before deleting it
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    const cartId = cartItem.cartId;

    // 2. Delete the cart item from database
    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    // 3. Check how many items are left in this cart
    const remainingItemsCount = await prisma.cartItem.count({
      where: { cartId },
    });

    // 4. If no items remain, delete the parent Cart record too!
    if (remainingItemsCount === 0) {
      await prisma.cart.delete({
        where: { id: cartId },
      }).catch(() => {});
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Item removed successfully',
      cartEmpty: remainingItemsCount === 0 
    }, { status: 200 });
  } catch (error) {
    console.error('Delete Cart Item Error:', error);
    return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 });
  }
}