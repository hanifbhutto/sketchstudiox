'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  X, 
  Palette, 
  UploadCloud, 
  Check, 
  Loader2,
  Trash2,
  Edit3,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import DeleteConfirmModal from '../../../../components/admin/DeleteConfirmModal';
import MediaPickerModal from '../../../../components/admin/MediaPickerModal';

const CATEGORIES = [
  'Human Portraits',
  'Pet & Animal Portraits',
  'Couples & Family Studies',
  'Bridal & Cultural Heritage',
  'Classical Figures'
];

const SUBSTRATES = [
  '300 GSM French Cotton Arches',
  'Fabriano Artistico Extra White',
  'Strathmore 500 Series Bristol',
  'Hahnemühle Nostalgie Heavyweight'
];

const DEFAULT_FORM = {
  title: '',
  category: CATEGORIES[0],
  price: '',
  medium: 'Raw Willow Charcoal & Fine 8B Graphite',
  substrate: SUBSTRATES[0],
  dimensions: '16 × 20 in',
  status: 'Available',
  description: '',
  framed: false,
  signed: true,
};

const DEFAULT_TOUCHED = {
  title: false,
  price: false,
  dimensions: false,
  medium: false,
};

const ITEMS_PER_PAGE = 10;

export default function AdminArtworksPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  
  // Media Picker Modal State
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [touched, setTouched] = useState(DEFAULT_TOUCHED);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Live Inline Validation Rules
  const isTitleValid = formData.title.trim().length >= 3;
  const isPriceValid = !isNaN(Number(formData.price)) && Number(formData.price) > 0;
  const isDimensionsValid = formData.dimensions.trim().length >= 3;
  const isMediumValid = formData.medium.trim().length >= 3;

  const isFormValid = isTitleValid && isPriceValid && isDimensionsValid && isMediumValid;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Fetch live artworks from API
  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/artworks');
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      }
    } catch (err) {
      console.error('Failed to load gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setImagePreview(null);
    setSelectedMediaId(null);
    setTouched(DEFAULT_TOUCHED);
    setShowModal(true);
  };

  const handleOpenEdit = (art) => {
    setEditingId(art.id);
    setFormData({
      title: art.title || '',
      category: art.category || CATEGORIES[0],
      price: art.price !== undefined ? String(art.price) : '',
      medium: art.medium || 'Raw Willow Charcoal & Fine 8B Graphite',
      substrate: art.substrate || SUBSTRATES[0],
      dimensions: art.dimensions || '16 × 20 in',
      status: art.status || 'Available',
      description: art.description || '',
      framed: false,
      signed: true,
    });
    setImagePreview(art.image || art.media?.secureUrl || null);
    setSelectedMediaId(art.mediaId || null);
    setTouched({ title: true, price: true, dimensions: true, medium: true });
    setShowModal(true);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const next = 
      currentStatus === 'Available' 
        ? 'Reserved' 
        : currentStatus === 'Reserved' 
        ? 'Archived' 
        : 'Available';

    setItems((prev) =>
      prev.map((art) => (art.id === id ? { ...art, status: next } : art))
    );

    try {
      const res = await fetch(`/api/admin/artworks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      fetchArtworks();
    }
  };

  const handleTriggerDelete = (art) => {
    setDeleteTarget({ id: art.id, title: art.title });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/artworks/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');

      setItems((prev) => prev.filter((art) => art.id !== deleteTarget.id));
      setDeleteTarget(null);

      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    } catch (err) {
      alert('Could not delete artwork from database.');
      fetchArtworks();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ title: true, price: true, dimensions: true, medium: true });

    if (!isFormValid) return;

    setSubmitting(true);
    try {
      const isEditing = Boolean(editingId);
      const endpoint = isEditing ? `/api/admin/artworks/${editingId}` : '/api/admin/artworks';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          mediaId: selectedMediaId,
        }),
      });

      if (!res.ok) throw new Error('Database transaction failed');
      const savedItem = await res.json();

      if (isEditing) {
        setItems((prev) => prev.map((art) => (art.id === editingId ? savedItem : art)));
      } else {
        setItems((prev) => [savedItem, ...prev]);
        setCurrentPage(1);
      }

      setShowModal(false);
      setEditingId(null);
      setFormData(DEFAULT_FORM);
      setImagePreview(null);
      setSelectedMediaId(null);
      setTouched(DEFAULT_TOUCHED);
    } catch (err) {
      alert('Error saving artwork to database.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 text-[#FAF8F5]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#e4c577] font-semibold flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-[#e4c577]" />
            Permanent Master Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Gallery Originals Inventory</h1>
          <p className="text-xs text-[#A8A196] font-light">
            Registry of one-of-one authentic originals published dynamically across the live exhibition.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={fetchArtworks}
            className="p-2.5 rounded-full border border-white/10 text-[#A8A196] hover:text-[#FAF8F5] hover:bg-white/5 transition-colors cursor-pointer"
            title="Reload live inventory"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#e4c577]' : ''}`} />
          </button>

          <button 
            onClick={handleOpenAdd} 
            className="px-5 py-3 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs font-mono uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer font-bold shadow-md"
          >
            <Plus className="w-4 h-4 text-[#0A0908]" />
            <span>Publish New Original</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-[32px] bg-[#171513] border border-white/10 shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#A8A196]">
            <Loader2 className="w-6 h-6 animate-spin text-[#e4c577]" />
            <span>Accessing gallery records...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="p-16 text-center text-xs font-mono text-[#A8A196]">
            No artworks recorded in database. Click "Publish New Original" to add one.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/30 text-[10px] text-[#A8A196] uppercase tracking-wider">
                    <th className="p-4 font-semibold">Asset</th>
                    <th className="p-4 font-semibold">Catalog Ref</th>
                    <th className="p-4 font-semibold">Title & Category</th>
                    <th className="p-4 font-semibold">Medium & Substrate</th>
                    <th className="p-4 font-semibold">Dimensions</th>
                    <th className="p-4 font-semibold">Acquisition Price</th>
                    <th className="p-4 font-semibold">Current State</th>
                    <th className="p-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentItems.map((art) => (
                    <tr key={art.id} className="hover:bg-white/[0.02] transition-colors">
                      
                      <td className="p-4">
                        <div className="w-12 h-14 rounded-xl overflow-hidden bg-stone-900 border border-white/10 shrink-0 flex items-center justify-center relative">
                          {art.media?.secureUrl || art.image ? (
                            <img 
                              src={art.media?.secureUrl || art.image} 
                              alt={art.title} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-stone-500 gap-0.5">
                              <Palette className="w-4 h-4 text-stone-500" />
                              <span className="text-[8px] font-mono tracking-tighter uppercase">No Image</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="p-4 font-bold text-[#e4c577] uppercase whitespace-nowrap">
                        {art.id}
                      </td>

                      <td className="p-4">
                        <span className="font-serif text-sm font-medium text-[#FAF8F5] block" style={{ fontFamily: 'Georgia, serif' }}>
                          {art.title}
                        </span>
                        <span className="text-[10px] text-[#A8A196] block font-mono">
                          {art.category} &bull; Certified {art.year || '2026'}
                        </span>
                      </td>

                      <td className="p-4 text-[#A8A196]">
                        <span className="text-[#FAF8F5] block">{art.medium}</span>
                        <span className="text-[10px] text-[#A8A196]">{art.substrate}</span>
                      </td>

                      <td className="p-4 text-[#FAF8F5] whitespace-nowrap">
                        {art.dimensions}
                      </td>

                      <td className="p-4 font-bold text-[#e4c577] whitespace-nowrap">
                        ${art.price} <span className="text-[10px] font-normal text-[#A8A196]">USD</span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono border ${
                          art.status === 'Available'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 font-semibold'
                            : art.status === 'Reserved'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 font-semibold'
                            : 'bg-white/10 text-white/50 border-white/10'
                        }`}>
                          {art.status}
                        </span>
                      </td>

                      <td className="p-4 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => handleToggleStatus(art.id, art.status)}
                          className="px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-[#e4c577] hover:bg-white/5 text-[10px] text-[#FAF8F5] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                          title="Cycle state"
                        >
                          Cycle
                        </button>

                        <button
                          onClick={() => handleOpenEdit(art)}
                          className="p-1.5 rounded-lg border border-white/10 text-stone-300 hover:text-[#e4c577] hover:border-[#e4c577] hover:bg-white/5 transition-colors cursor-pointer inline-flex items-center"
                          title="Edit Masterpiece Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleTriggerDelete(art)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer inline-flex items-center"
                          title="Delete Artwork"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer Controls */}
            {items.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-black/30 text-xs font-mono text-[#A8A196]">
                <span>
                  Showing <span className="font-semibold text-[#FAF8F5]">{startIndex + 1}</span> to <span className="font-semibold text-[#FAF8F5]">{Math.min(startIndex + ITEMS_PER_PAGE, items.length)}</span> of <span className="font-semibold text-[#FAF8F5]">{items.length}</span> entries
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-white/10 bg-[#171513] text-[#FAF8F5] hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  <span className="px-3 py-1 font-semibold text-[#FAF8F5]">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-white/10 bg-[#171513] text-[#FAF8F5] hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Shared Publish / Edit Modal with Media Picker Integration */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#171513] text-[#FAF8F5] rounded-[32px] p-6 sm:p-10 max-w-2xl w-full border border-white/15 shadow-2xl space-y-6 my-8">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#e4c577] font-bold">
                    {editingId ? `Edit Record (${editingId})` : 'Curatorial Ingestion'}
                  </span>
                  <span className="text-[10px] font-mono text-[#A8A196]">&bull; Live Database Sync</span>
                </div>
                <h3 className="font-serif text-2xl text-[#FAF8F5] mt-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {editingId ? 'Modify Master Original' : 'Publish Master Original'}
                </h3>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 rounded-xl hover:bg-white/10 cursor-pointer text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6 text-xs font-mono">
              
              {/* Exhibition Asset Selector via Media Vault */}
              <div className="space-y-1.5">
                <label className="text-[#FAF8F5] uppercase tracking-wider text-[11px] block font-semibold">
                  Exhibition Asset Vault
                </label>
                
                {!imagePreview ? (
                  <button
                    type="button"
                    onClick={() => setShowMediaPicker(true)}
                    className="w-full border-2 border-dashed border-white/20 hover:border-[#e4c577]/60 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/40 group"
                  >
                    <UploadCloud className="w-6 h-6 text-[#e4c577] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs uppercase tracking-wider text-[#FAF8F5] font-semibold">
                      Select Asset from Media Vault
                    </span>
                    <span className="text-[10px] text-[#A8A196] mt-0.5">Browse cloud repository & direct upload</span>
                  </button>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/50 p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={imagePreview} alt="Preview" className="w-14 h-14 object-cover rounded-xl" />
                      <div>
                        <span className="text-[#FAF8F5] font-bold block">Asset Linked</span>
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Ready for exhibition
                        </span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setShowMediaPicker(true)}
                      className="px-3 py-1.5 rounded-lg text-[#e4c577] hover:bg-[#e4c577]/15 text-[10px] cursor-pointer font-bold uppercase transition-colors"
                    >
                      Change Asset
                    </button>
                  </div>
                )}
              </div>

              {/* Title & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Artwork Title with Validation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[#FAF8F5] block font-medium">Artwork Title *</label>
                    {touched.title && (
                      <span className={`text-[10px] ${isTitleValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isTitleValid ? 'Valid' : 'Min 3 chars required'}
                      </span>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="e.g. The Nocturne Gaze"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      onBlur={() => handleBlur('title')}
                      className={`w-full px-3.5 py-2.5 pr-9 rounded-xl bg-black/50 border outline-none transition-all duration-200 text-[#FAF8F5] placeholder-white/30 ${
                        touched.title && !isTitleValid
                          ? 'border-rose-400 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30'
                          : touched.title && isTitleValid
                          ? 'border-emerald-400/70 focus:border-emerald-400'
                          : 'border-white/10 focus:border-[#e4c577]'
                      }`}
                    />
                    {touched.title && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {isTitleValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Collection / Category */}
                <div className="space-y-1.5">
                  <label className="text-[#FAF8F5] block font-medium">Collection / Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat} className="bg-[#171513] text-[#FAF8F5]">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing, Dimensions & State Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Price with Validation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[#FAF8F5] block font-medium">Price ($ USD) *</label>
                    {touched.price && (
                      <span className={`text-[10px] ${isPriceValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPriceValid ? 'Valid' : 'Must be > 0'}
                      </span>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="e.g. 480"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      onBlur={() => handleBlur('price')}
                      className={`w-full px-3.5 py-2.5 pr-9 rounded-xl bg-black/50 border outline-none transition-all duration-200 text-[#FAF8F5] placeholder-white/30 ${
                        touched.price && !isPriceValid
                          ? 'border-rose-400 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30'
                          : touched.price && isPriceValid
                          ? 'border-emerald-400/70 focus:border-emerald-400'
                          : 'border-white/10 focus:border-[#e4c577]'
                      }`}
                    />
                    {touched.price && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {isPriceValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Dimensions with Validation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[#FAF8F5] block font-medium">Dimensions *</label>
                    {touched.dimensions && (
                      <span className={`text-[10px] ${isDimensionsValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isDimensionsValid ? 'Valid' : 'Required'}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="e.g. 18 × 24 in"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      onBlur={() => handleBlur('dimensions')}
                      className={`w-full px-3.5 py-2.5 pr-9 rounded-xl bg-black/50 border outline-none transition-all duration-200 text-[#FAF8F5] placeholder-white/30 ${
                        touched.dimensions && !isDimensionsValid
                          ? 'border-rose-400 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30'
                          : touched.dimensions && isDimensionsValid
                          ? 'border-emerald-400/70 focus:border-emerald-400'
                          : 'border-white/10 focus:border-[#e4c577]'
                      }`}
                    />
                    {touched.dimensions && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {isDimensionsValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Current State */}
                <div className="space-y-1.5">
                  <label className="text-[#FAF8F5] block font-medium">Current State</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                  >
                    <option value="Available" className="bg-[#171513] text-[#FAF8F5]">Available for Sale</option>
                    <option value="Reserved" className="bg-[#171513] text-[#FAF8F5]">Reserved by Patron</option>
                    <option value="Archived" className="bg-[#171513] text-[#FAF8F5]">Archived / Sold</option>
                  </select>
                </div>
              </div>

              {/* Medium & Substrate Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Medium with Validation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[#FAF8F5] block font-medium">Medium Used *</label>
                    {touched.medium && (
                      <span className={`text-[10px] ${isMediumValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isMediumValid ? 'Valid' : 'Required'}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="e.g. Raw Willow Charcoal & 8B Graphite"
                      value={formData.medium}
                      onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                      onBlur={() => handleBlur('medium')}
                      className={`w-full px-3.5 py-2.5 pr-9 rounded-xl bg-black/50 border outline-none transition-all duration-200 text-[#FAF8F5] placeholder-white/30 ${
                        touched.medium && !isMediumValid
                          ? 'border-rose-400 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30'
                          : touched.medium && isMediumValid
                          ? 'border-emerald-400/70 focus:border-emerald-400'
                          : 'border-white/10 focus:border-[#e4c577]'
                      }`}
                    />
                    {touched.medium && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {isMediumValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Paper Substrate */}
                <div className="space-y-1.5">
                  <label className="text-[#FAF8F5] block font-medium">Paper Substrate</label>
                  <select 
                    value={formData.substrate}
                    onChange={(e) => setFormData({ ...formData, substrate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                  >
                    {SUBSTRATES.map(sub => (
                      <option key={sub} value={sub} className="bg-[#171513] text-[#FAF8F5]">{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[#FAF8F5] block font-medium">Description & Technique Notes</label>
                <textarea 
                  rows={2}
                  placeholder="Atmospheric tonal gradations created with raw vine charcoal and dry brush dusting..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5] placeholder-white/30 resize-none"
                />
              </div>

              {/* Verification Switches */}
              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A8A196]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={formData.signed} 
                    onChange={(e) => setFormData({ ...formData, signed: e.target.checked })}
                    className="rounded accent-[#e4c577] w-4 h-4" 
                  />
                  <span>Hand-signed + Certificate Included</span>
                </label>
              </div>

              {/* Action Submit with Active State */}
              <button 
                type="submit" 
                disabled={submitting || !isFormValid}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] uppercase tracking-[0.2em] hover:brightness-110 transition-all cursor-pointer font-bold shadow-lg text-xs flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#0A0908]" />
                    <span>Syncing with Database...</span>
                  </>
                ) : (
                  <span>{editingId ? 'Save Masterpiece Changes' : 'Publish to Exhibition Catalog'}</span>
                )}
              </button>

            </form>
          </div>
        </div>
      )}

      {/* Reusable Media Picker Modal */}
      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(mediaItem) => {
          setImagePreview(mediaItem.secureUrl);
          setSelectedMediaId(mediaItem.id);
        }}
      />

      {/* Standalone Reusable Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        itemIdentifier={deleteTarget ? `"${deleteTarget.title}" (${deleteTarget.id})` : ''}
        loading={isDeleting}
      />

    </div>
  );
}