'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // PayPal Payer/Order Token

  const [status, setStatus] = useState('Verifying payment and registering order...');
  const [createdOrder, setCreatedOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function finalizeOrder() {
      try {
        const shippingDetailsStr = localStorage.getItem('pending_shipping');
        const cartItemsStr = localStorage.getItem('pending_cart');
        const userId = localStorage.getItem('userId');
        const cartId = localStorage.getItem('active_cart_id');

        if (!shippingDetailsStr || !cartItemsStr) {
          throw new Error('Checkout session expired or missing details.');
        }

        const shippingDetails = JSON.parse(shippingDetailsStr);
        const items = JSON.parse(cartItemsStr);
        const subtotal = items.reduce((acc, item) => acc + (item.price || item.artwork?.price || 0), 0);

        // Call backend to create the order now that payment is successful
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userId || null,
            cartId: cartId || null,
            items: items,
            shippingDetails: shippingDetails,
            totalAmount: subtotal,
            paypalToken: token
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to log order in ledger.');

        setCreatedOrder(data);
        setStatus('Acquisition Confirmed Successfully!');

        // Clean up temporary storage
        localStorage.removeItem('pending_shipping');
        localStorage.removeItem('pending_cart');
        localStorage.removeItem('active_cart_id');

        // Auto redirect after 4 seconds
        setTimeout(() => {
          router.push(`/account/orders/${data.orderId}`);
        }, 4000);

      } catch (err) {
        console.error('Finalize order error:', err);
        setError(err.message);
      }
    }

    finalizeOrder();
  }, [token, router]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-[#FAF8F5]">
      <div className="max-w-md w-full p-8 rounded-[32px] bg-white border border-[#E5DFD7] shadow-xl text-center space-y-6">
        
        {error ? (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
              !
            </div>
            <h2 className="font-serif text-xl text-[#1A1A1A]">Settlement Error</h2>
            <p className="text-xs text-rose-600 font-mono">{error}</p>
            <Link href="/checkout" className="inline-block px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-mono rounded-xl uppercase">
              Return to Checkout
            </Link>
          </div>
        ) : createdOrder ? (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C29B38] font-bold">Provenance Secured</span>
            <h2 className="font-serif text-2xl text-[#1A1A1A]">Payment Confirmed</h2>
            <p className="text-xs text-[#686057] font-light">
              Order <strong className="font-mono text-[#1A1A1A]">{createdOrder.orderNumber}</strong> has been successfully registered. Redirecting to your ledger...
            </p>
            <Link href={`/account/orders/${createdOrder.orderId}`} className="block w-full py-3 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider font-bold">
              View Order Details Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4 py-8">
            <Loader2 className="w-10 h-10 animate-spin text-[#C29B38] mx-auto" />
            <p className="text-xs font-mono text-[#867E74]">{status}</p>
          </div>
        )}

      </div>
    </div>
  );
}