'use client';

import { useState } from 'react';
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
  Sparkles 
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const INITIAL_ORDERS = [
  // 1. CUSTOM SKETCH COMMISSION
  {
    id: 'SSX-9821',
    type: 'Commission', // <-- Custom Sketch
    customer: 'Lady Eleanor Vance',
    email: 'eleanor.vance@kensington.co.uk',
    date: '10 Sep 2026',
    itemTitle: 'Custom Bespoke Portrait',
    size: 'A3 (12×16 in)',
    persons: 1,
    pets: 1,
    totalSubjects: 2,
    medium: 'Raw Willow Charcoal',
    price: 400,
    framed: true,
    status: 'Phase 02: Hand-Rendering',
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    notes: 'Combine the golden retriever sitting beside me. Soften background and enhance eye reflections.',
    tracking: 'DHL-UK-994182'
  },
  // 2. GALLERY ORIGINAL SALE
  {
    id: 'SSX-9825',
    type: 'Original', // <-- Gallery Original Sale
    customer: 'Lord Julian Sterling',
    email: 'sterling.j@mayfair.co.uk',
    date: '11 Sep 2026',
    itemTitle: 'The Silent Contemplation (ssx-01)',
    size: '16 × 20 in',
    persons: 0,
    pets: 0,
    totalSubjects: null,
    medium: '8B Graphite on French Arches',
    price: 340,
    framed: false,
    status: 'Packaging & Provenance Wax Seal',
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    notes: 'Direct Gallery Acquisition. Deliver with stamped Certificate of Authenticity.',
    tracking: ''
  },
  // 3. CUSTOM PET SKETCH COMMISSION
  {
    id: 'SSX-9822',
    type: 'Commission',
    customer: 'Dr. Arthur Pendelton',
    email: 'pendelton.oxford@outlook.com',
    date: '11 Sep 2026',
    itemTitle: 'Custom Dual Canine Study',
    size: '20×30 in',
    persons: 0,
    pets: 2,
    totalSubjects: 2,
    medium: 'Vibrant Colored Pencil',
    price: 550,
    framed: false,
    status: 'Phase 01: Photo Ingested',
    photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80',
    notes: 'Capture the auburn tones of both spaniels accurately. Retain the natural paper white highlights.',
    tracking: ''
  }
];

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
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleSaveTracking = (orderId) => {
    if (!trackingInput.trim()) return;
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, tracking: trackingInput.trim() } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, tracking: trackingInput.trim() }));
    }
    alert(`Tracking ${trackingInput.trim()} registered.`);
    setTrackingInput('');
  };

  const filteredOrders = orders.filter(ord => {
    const matchesType = typeFilter === 'All' || ord.type === typeFilter;
    const matchesSearch = 
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.itemTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

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
            placeholder="Search Order ID, Client or Title..."
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
      <div className="rounded-2xl bg-white border border-[#E5DFD7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#E5DFD7] bg-[#FAF8F3] text-[10px] text-[#867E74] uppercase tracking-wider">
                <th className="p-4 font-semibold">Visual</th>
                <th className="p-4 font-semibold">Order Ref & Client</th>
                <th className="p-4 font-semibold">Type & Medium</th>
                <th className="p-4 font-semibold">Specification</th>
                <th className="p-4 font-semibold">Price Total</th>
                <th className="p-4 font-semibold">Fulfillment Stage</th>
                <th className="p-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF8F3]/50 transition-colors">
                  
                  {/* Thumbnail */}
                  <td className="p-4">
                    <div 
                      onClick={() => setSelectedOrder(ord)}
                      className="w-12 h-14 rounded-lg overflow-hidden bg-stone-200 border border-stone-300 relative cursor-pointer hover:scale-105 transition-transform"
                    >
                      <img src={ord.photo} alt="Visual" className="w-full h-full object-cover" />
                    </div>
                  </td>

                  {/* ID + Client */}
                  <td className="p-4">
                    <span className="font-bold text-[#C29B38] block">{ord.id}</span>
                    <span className="font-serif text-sm text-[#1A1A1A] block">{ord.customer}</span>
                    <span className="text-[10px] text-[#867E74] block">{ord.email}</span>
                  </td>

                  {/* Type & Medium */}
                  <td className="p-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider mb-1 ${
                      ord.type === 'Commission'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-stone-800 text-white'
                    }`}>
                      {ord.type === 'Commission' ? 'Custom Sketch' : 'Original Artwork'}
                    </span>
                    <span className="text-[#686057] block text-[11px]">{ord.medium}</span>
                  </td>

                  {/* Specification (Custom vs Original) */}
                  <td className="p-4">
                    {ord.type === 'Commission' ? (
                      <div>
                        <span className="text-[#1A1A1A] font-bold block">{ord.size}</span>
                        <span className="text-[10px] text-[#867E74]">
                          👤 {ord.persons} &bull; 🐾 {ord.pets} ({ord.totalSubjects} Subjects)
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[#1A1A1A] font-bold block">{ord.itemTitle}</span>
                        <span className="text-[10px] text-[#867E74]">1-of-1 Vault Piece &bull; {ord.size}</span>
                      </div>
                    )}
                  </td>

                  {/* Price */}
                  <td className="p-4 font-bold text-[#1A1A1A] whitespace-nowrap">
                    ${ord.price} <span className="text-[10px] font-normal text-[#867E74]">USD</span>
                  </td>

                  {/* Status */}
                  <td className="p-4 whitespace-nowrap">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono border bg-stone-50 border-stone-200 text-stone-700 font-semibold">
                      {ord.status}
                    </span>
                    {ord.tracking && (
                      <span className="text-[9px] text-emerald-600 block mt-1">
                        Tracking: {ord.tracking}
                      </span>
                    )}
                  </td>

                  {/* Inspect Button */}
                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedOrder(ord);
                        setTrackingInput(ord.tracking || '');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#C29B38] text-white text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Inspect Order
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unified Side Drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <div 
              onClick={() => setSelectedOrder(null)} 
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs" 
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
                      selectedOrder.type === 'Commission' ? 'bg-amber-100 text-amber-900' : 'bg-stone-800 text-white'
                    }`}>
                      {selectedOrder.type === 'Commission' ? 'Custom Sketch' : 'Original Artwork'}
                    </span>
                    <span className="text-[10px] font-mono text-[#867E74]">{selectedOrder.id}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] mt-1">{selectedOrder.customer}</h3>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-xl hover:bg-stone-100 text-stone-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo Box */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#867E74] uppercase block">
                  {selectedOrder.type === 'Commission' ? 'Client Uploaded Reference Photo' : 'Gallery Artwork Ingested'}
                </span>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-300">
                  <img src={selectedOrder.photo} alt="Ref" className="w-full h-full object-cover" />
                  {selectedOrder.type === 'Commission' && (
                    <a 
                      href={selectedOrder.photo} 
                      target="_blank" 
                      download
                      className="absolute bottom-3 right-3 px-3.5 py-2 rounded-xl bg-black/85 text-white text-[10px] uppercase font-mono flex items-center gap-2 hover:bg-[#C29B38]"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Client Photo
                    </a>
                  )}
                </div>
              </div>

              {/* Client Notes / Details */}
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C29B38] font-bold block">
                  {selectedOrder.type === 'Commission' ? 'Customer Drawing Directives' : 'Order Provenance Instructions'}
                </span>
                <p className="text-xs text-[#686057] leading-relaxed">"{selectedOrder.notes}"</p>
              </div>

              {/* Status Switcher based on Type */}
              <div className="space-y-2 pt-2 border-t border-[#E5DFD7]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#867E74] block font-semibold">
                  Update Fulfillment Stage
                </span>
                <div className="space-y-2">
                  {(selectedOrder.type === 'Commission' ? COMMISSION_PHASES : ORIGINAL_PHASES).map((phase) => (
                    <button
                      key={phase}
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
                    onChange={(e) => setTrackingInput(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs font-mono outline-none focus:border-[#C29B38]"
                  />
                  <button
                    onClick={() => handleSaveTracking(selectedOrder.id)}
                    className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase hover:bg-[#C29B38]"
                  >
                    Save
                  </button>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}