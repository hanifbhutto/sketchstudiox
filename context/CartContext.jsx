'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Initial Load: Fetch cart using userId or guest cartId from localStorage
  useEffect(() => {
    async function initializeCart() {
      try {
        const userId = localStorage.getItem('userId');
        const localCartId = localStorage.getItem('active_cart_id');

        let url = '/api/cart?';
        if (userId) {
          url += `userId=${encodeURIComponent(userId)}`;
        } else if (localCartId) {
          url += `cartId=${encodeURIComponent(localCartId)}`;
        } else {
          return;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          setCartItems(data.items || []);
          if (data.cartId) {
            setCartId(data.cartId);
            localStorage.setItem('active_cart_id', data.cartId);
          }
        }
      } catch (err) {
        console.error('Failed to initialize cart:', err);
      }
    }

    initializeCart();
  }, []); // Run on mount
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. Initial Load: Fetch cart using userId or guest cartId from localStorage
  useEffect(() => {
    async function initializeCart() {
      try {
        const userId = localStorage.getItem('userId');
        const localCartId = localStorage.getItem('active_cart_id');

        let url = '/api/cart?';
        if (userId) {
          url += `userId=${encodeURIComponent(userId)}`;
        } else if (localCartId) {
          url += `cartId=${encodeURIComponent(localCartId)}`;
        } else {
          return; // No session or guest cart yet
        }

        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          setCartItems(data.items || []);
          if (data.cartId) {
            setCartId(data.cartId);
            localStorage.setItem('active_cart_id', data.cartId);
          }
        }
      } catch (err) {
        console.error('Failed to initialize cart:', err);
      }
    }

    initializeCart();
  }, []);

  // 2. Add to Cart (Handles both Guest and Authenticated users)
  const addToCart = async (itemData) => {
    try {
      const userId = localStorage.getItem('userId');
      const currentCartId = localStorage.getItem('active_cart_id');

      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: currentCartId,
          userId: userId || null,
          artworkId: itemData.id,
          frame: itemData.frame,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setCartItems(data.items || []);
        setCartId(data.cartId);
        localStorage.setItem('active_cart_id', data.cartId);
        setIsCartOpen(true);
      } else {
        console.error('Error adding item to cart:', data.error);
      }
    } catch (err) {
      console.error('Network error during add to cart:', err);
    }
  };

  // Clear Cart on Order Completion or Logout
  const clearCart = async () => {
    try {
      const currentCartId = localStorage.getItem('active_cart_id');
      const userId = localStorage.getItem('userId');

      // Optional: call your backend API to clear the database cart items if needed
      if (currentCartId || userId) {
        await fetch(`/api/cart?${userId ? `userId=${userId}` : `cartId=${currentCartId}`}`, {
          method: 'DELETE',
        });
      }
    } catch (err) {
      console.error('Failed to clear cart on server:', err);
    } finally {
      setCartItems([]);
      localStorage.removeItem('active_cart_id');
      localStorage.removeItem('pending_cart');
      localStorage.removeItem('pending_shipping');
    }
  };

 // 3. Remove Item from Cart (Database + State)
  const removeFromCart = async (itemId) => {
    try {
      const res = await fetch(`/api/cart/item?itemId=${encodeURIComponent(itemId)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setCartItems((prev) => prev.filter((i) => i.id !== itemId));
      } else {
        console.error('Failed to delete item from database');
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  // 4. Sync Cart upon Login (Forces state refresh immediately without reload)
  const syncUserCartAfterLogin = async (loggedInUserId) => {
    try {
      const guestCartId = localStorage.getItem('active_cart_id');

      const res = await fetch('/api/cart/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: loggedInUserId,
          guestCartId: guestCartId || null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Immediately update state and localStorage
        setCartItems(data.items || []);
        setCartId(data.cartId);
        localStorage.setItem('userId', loggedInUserId);
        if (data.cartId) {
          localStorage.setItem('active_cart_id', data.cartId);
        }
      }
    } catch (err) {
      console.error('Failed to sync cart on login:', err);
    }
  };

  // 5. Clear Cart on Logout
  // 5. Clear Cart on Logout
  const logoutCart = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('patronEmail');
    localStorage.removeItem('active_cart_id'); // Explicitly remove cart id here
    setCartItems([]);
    setCartId(null);
  };

  

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => {
        const price = item.artwork?.price || 0;
        return acc + price * (item.quantity || 1);
      }, 0)
    : 0;

  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
    : 0;


    

  return (
    <CartContext.Provider
      value={{
        cart: cartItems,
        cartItems,
        cartId,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        syncUserCartAfterLogin,
        logoutCart,
        clearCart,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);