'use client';

import { useState, useEffect } from 'react';
import { 
  Package, 
  Eye, 
  Download, 
  X, 
  Check, 
  Truck, 
  Search, 
  Clock, 
  ShieldCheck, 
  Palette, 
  Sparkles,
  Loader2,
  ExternalLink,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const COMMISSION_PHASES = [
  'Phase 01: Photo Ingested',
  'Phase 02: Hand-Rendering',
  'Phase 03: Digital Proof Transmitted',
  'Phase 04: Wax-Sealed & Dispatched'
];

const ORIGINAL_PHASES = [
  'Payment Confirmed & Secured',
  'Packaging & Provenance Wax Seal',
  'Courier Dispatched'
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [typeFilter, setTypeFilter] = useState('All'); // 'All' | 'Commission' | 'Original'
  const [searchQuery, setSearchQuery] = useState('');
  const [updating, setUpdating] = useState(false);
  
  // Tracking Success Banner State
  const [trackingSuccess, setTrackingSuccess] = useState(false);

  // Confirmation Modal State for Cancellation
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Fetch real database orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data && data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to load database orders:', err);
    } finally {
      setLoading(false);
    }
  }

  // Update order status in database & local state
  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');

      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Status update error:', err);
      alert('Could not update order status.');
    } finally {
      setUpdating(false);
      setShowCancelModal(false);
    }
  };

  // Save tracking waybill to database with proper success banner (Retaining input value)
  const handleSaveTracking = async (orderId) => {
    if (!trackingInput.trim()) return;
    setUpdating(true);
    setTrackingSuccess(false);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, trackingNumber: trackingInput.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save tracking number');

      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, trackingNumber: trackingInput.trim() } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, trackingNumber: trackingInput.trim() }));
      }

      setTrackingSuccess(true);
      setTimeout(() => setTrackingSuccess(false), 4000); // Auto-hide after 4 seconds
    } catch (err) {
      console.error('Tracking save error:', err);
      alert('Could not save tracking waybill.');
    } finally {
      setUpdating(false);
    }
  };

  // Filter orders based on type (Commission vs Original/Gallery) & search query
  const filteredOrders = orders.filter(ord => {
    const isCommissionOrder = ord.items.some(i => !i.artworkId);
    const orderType = isCommissionOrder ? 'Commission' : 'Original';

    const matchesType = typeFilter === 'All' || orderType === typeFilter;
    const matchesSearch = 
      ord.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.email?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  if (loading) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#867E74]">
        <Loader2 className="w-6 h-6 animate-spin text-[#C29B38]" />
        <span>Loading atelier orders ledger from Supabase...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5DFD7] pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-semibold flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-[#C29B38]" />
            Atelier Unified Ledger
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">Sales & Commission Orders</h1>
          <p className="text-xs text-[#867E74] font-light">
            Unified pipeline tracking custom sketch commissions and gallery original acquisitions.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD7] text-[11px] font-mono text-[#686057]">
          <Clock className="w-3.5 h-3.5 text-[#C29B38]" />
          <span>{orders.length} Total Registered Sales</span>
        </div>
      </div>

      {/* Controls: Search + Type Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search Order Ref, Patron Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#E5DFD7] text-xs font-mono outline-none focus:border-[#C29B38]"
          />
        </div>

        {/* Filter Type: All vs Custom vs Originals */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/50 rounded-xl">
          {['All', 'Commission', 'Original'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                typeFilter === type
                  ? 'bg-white text-[#1A1A1A] font-bold shadow-xs'
                  : 'text-[#867E74] hover:text-[#1A1A1A]'
              }`}
            >
              {type === 'All' ? 'All Orders' : type === 'Commission' ? 'Custom Commissions' : 'Gallery Originals'}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-[#E5DFD7] text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-[#C29B38] mx-auto" />
          <h3 className="font-serif text-lg text-[#1A1A1A]">No orders found</h3>
          <p className="text-xs text-[#867E74] font-light">
            No acquisitions match your current filter or search criteria.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-[#E5DFD7] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-[#E5DFD7] bg-[#FAF8F3] text-[10px] text-[#867E74] uppercase tracking-wider">
                  <th className="p-4 font-semibold">Visual</th>
                  <th className="p-4 font-semibold">Order Ref & Patron</th>
                  <th className="p-4 font-semibold">Type & Medium</th>
                  <th className="p-4 font-semibold">Specification</th>
                  <th className="p-4 font-semibold">Price Total</th>
                  <th className="p-4 font-semibold">Fulfillment Stage</th>
                  <th className="p-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map((ord) => {
                  const isCommission = ord.items.some(i => !i.artworkId);
                  const firstItem = ord.items[0] || {};
                  const visualPhoto = firstItem.media?.secureUrl || firstItem.artwork?.media?.secureUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80';

                  return (
                    <tr key={ord.id} className="hover:bg-[#FAF8F3]/50 transition-colors">
                      
                      {/* Thumbnail */}
                      <td className="p-4">
                        <div 
                          onClick={() => setSelectedOrder(ord)}
                          className="w-12 h-14 rounded-lg overflow-hidden bg-stone-200 border border-stone-300 relative cursor-pointer hover:scale-105 transition-transform"
                        >
                          <img src={visualPhoto} alt="Visual" className="w-full h-full object-cover" />
                        </div>
                      </td>

                      {/* ID + Client */}
                      <td className="p-4">
                        <span className="font-bold text-[#C29B38] block">{ord.orderNumber}</span>
                        <span className="font-serif text-sm text-[#1A1A1A] block">{ord.name}</span>
                        <span className="text-[10px] text-[#867E74] block">{ord.email}</span>
                      </td>

                      {/* Type & Medium */}
                      <td className="p-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider mb-1 ${
                          isCommission
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-stone-800 text-white'
                        }`}>
                          {isCommission ? 'Custom Sketch' : 'Original Artwork'}
                        </span>
                        <span className="text-[#686057] block text-[11px]">
                          {isCommission ? (firstItem.medium || 'Willow Charcoal') : (firstItem.artwork?.medium || 'Graphite')}
                        </span>
                      </td>

                      {/* Specification */}
                      <td className="p-4">
                        {isCommission ? (
                          <div>
                            <span className="text-[#1A1A1A] font-bold block">{firstItem.dimensions || 'Standard Size'}</span>
                            <span className="text-[10px] text-[#867E74]">
                              {firstItem.title || 'Bespoke Commission'}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[#1A1A1A] font-bold block">{firstItem.artwork?.title || 'Gallery Masterpiece'}</span>
                            <span className="text-[10px] text-[#867E74]">1-of-1 Vault Piece &bull; {firstItem.frame || 'Standard'}</span>
                          </div>
                        )}
                      </td>

                      {/* Price */}
                      <td className="p-4 font-bold text-[#1A1A1A] whitespace-nowrap">
                        ${ord.totalAmount.toFixed(2)} <span className="text-[10px] font-normal text-[#867E74]">USD</span>
                      </td>

                      {/* Status */}
                      <td className="p-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono border font-semibold ${
                          ord.status === 'Cancelled'
                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                            : ord.status.includes('Phase') || ord.status.includes('Ingested')
                            ? 'bg-amber-50 border-amber-200 text-amber-800'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        }`}>
                          {ord.status}
                        </span>
                        {ord.trackingNumber && (
                          <span className="text-[9px] text-emerald-600 block mt-1">
                            Tracking: {ord.trackingNumber}
                          </span>
                        )}
                      </td>

                      {/* Inspect Button */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setTrackingInput(ord.trackingNumber || '');
                            setTrackingSuccess(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#C29B38] text-white text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Inspect Order
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Unified Side Drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <div 
              onClick={() => setSelectedOrder(null)} 
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs mb-0" 
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white border-l border-[#E5DFD7] z-50 p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl"
            >
              
              {/* Drawer Top */}
              <div className="flex items-center justify-between border-b border-[#E5DFD7] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${
                      selectedOrder.items.some(i => !i.artworkId) ? 'bg-amber-100 text-amber-900' : 'bg-stone-800 text-white'
                    }`}>
                      {selectedOrder.items.some(i => !i.artworkId) ? 'Custom Sketch' : 'Original Artwork'}
                    </span>
                    <span className="text-[10px] font-mono text-[#867E74]">{selectedOrder.orderNumber}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] mt-1">{selectedOrder.name}</h3>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-xl hover:bg-stone-100 text-stone-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Patron Shipping & Delivery Details */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#867E74] font-semibold block">
                  Patron Delivery Destination
                </span>
                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7] space-y-2 text-xs font-mono text-[#686057]">
                  <div className="flex items-center justify-between text-[#1A1A1A] font-bold border-b border-stone-200 pb-2">
                    <span>{selectedOrder.name}</span>
                    <span className="text-[11px] text-[#C29B38]">{selectedOrder.email}</span>
                  </div>
                  <div className="space-y-1 pt-1">
                    <div><strong className="text-[#1A1A1A]">Street Address:</strong> {selectedOrder.address || 'N/A'}</div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div><strong className="text-[#1A1A1A]">City:</strong> {selectedOrder.city || 'N/A'}</div>
                      <div><strong className="text-[#1A1A1A]">Postal Code:</strong> {selectedOrder.postalCode || 'N/A'}</div>
                    </div>
                    <div className="pt-1"><strong className="text-[#1A1A1A]">Country:</strong> {selectedOrder.country || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Photo Box */}
              {selectedOrder.items.map((item, idx) => {
                const refPhoto = item.media?.secureUrl || item.artwork?.media?.secureUrl;
                if (!refPhoto) return null;
                return (
                  <div key={idx} className="space-y-2">
                    <span className="text-[10px] font-mono text-[#867E74] uppercase block">
                      {!item.artworkId ? 'Client Uploaded Reference Photo' : 'Gallery Artwork Visual'}
                    </span>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-300">
                      <img src={refPhoto} alt="Ref" className="w-full h-full object-cover" />
                      <a 
                        href={refPhoto} 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute bottom-3 right-3 px-3.5 py-2 rounded-xl bg-black/85 text-white text-[10px] uppercase font-mono flex items-center gap-2 hover:bg-[#C29B38]"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Asset
                      </a>
                    </div>
                  </div>
                );
              })}

              {/* Manifest Items List */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#867E74] font-semibold block">
                  Order Manifest Items
                </span>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7] space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between font-bold text-[#1A1A1A]">
                      <span>{item.title || item.artwork?.title || 'Bespoke Item'}</span>
                      <span>${item.price.toFixed(2)} USD</span>
                    </div>
                    {item.description && (
                      <p className="text-[#686057] text-[11px] leading-relaxed">
                        <strong>Directives:</strong> "{item.description}"
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Status Switcher */}
              <div className="space-y-2 pt-2 border-t border-[#E5DFD7]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#867E74] block font-semibold">
                  Update Fulfillment Stage
                </span>
                <div className="space-y-2">
                  {(selectedOrder.items.some(i => !i.artworkId) ? COMMISSION_PHASES : ORIGINAL_PHASES).map((phase) => (
                    <button
                      key={phase}
                      disabled={updating}
                      onClick={() => updateOrderStatus(selectedOrder.id, phase)}
                      className={`w-full p-3 rounded-xl border text-xs font-mono text-left transition-all cursor-pointer flex items-center justify-between ${
                        selectedOrder.status === phase
                          ? 'border-[#C29B38] bg-[#FAF8F3] text-[#8C6415] font-bold'
                          : 'border-[#E5DFD7] text-[#686057] hover:border-[#C29B38]'
                      }`}
                    >
                      <span>{phase}</span>
                      {selectedOrder.status === phase && <Check className="w-4 h-4 text-[#C29B38]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Waybill Tracking */}
              <div className="space-y-2 pt-2 border-t border-[#E5DFD7]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#867E74] block font-semibold">
                  Dispatch Tracking Waybill
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. DHL-EXPRESS-99214"
                    value={trackingInput}
                    onChange={(e) => {
                      setTrackingInput(e.target.value);
                      setTrackingSuccess(false);
                    }}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs font-mono outline-none focus:border-[#C29B38]"
                  />
                  <button
                    disabled={updating}
                    onClick={() => handleSaveTracking(selectedOrder.id)}
                    className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase hover:bg-[#C29B38] cursor-pointer flex items-center justify-center min-w-[70px]"
                  >
                    {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                  </button>
                </div>

                {/* Success Toast Banner */}
                <AnimatePresence>
                  {trackingSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Waybill successfully registered & synchronized to database.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cancel Order Action Option */}
              <div className="space-y-2 pt-4 border-t border-rose-100">
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-600 block font-semibold">
                  Danger Zone / Termination
                </span>
                {selectedOrder.status !== 'Cancelled' ? (
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => setShowCancelModal(true)}
                    className="w-full p-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Cancel & Archive Acquisition</span>
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-mono font-bold text-center">
                    This Acquisition Has Been Cancelled
                  </div>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cancellation Confirmation Modal / Popup */}
      <AnimatePresence>
        {showCancelModal && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md w-full bg-white rounded-3xl border border-[#E5DFD7] p-8 shadow-2xl space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-[#1A1A1A]">Confirm Cancellation</h3>
                <p className="text-xs text-[#686057] font-light leading-relaxed">
                  Are you absolutely certain you wish to terminate and archive acquisition <strong className="font-mono text-[#1A1A1A]">{selectedOrder.orderNumber}</strong> for <strong className="text-[#1A1A1A]">{selectedOrder.name}</strong>? This action will update the ledger status to cancelled.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="py-3 rounded-xl border border-[#E5DFD7] bg-white text-[#1A1A1A] text-xs font-mono uppercase font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Keep Active
                </button>
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => updateOrderStatus(selectedOrder.id, 'Cancelled')}
                  className="py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-mono uppercase font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Yes, Cancel</span>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}