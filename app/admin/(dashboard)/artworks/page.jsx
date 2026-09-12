'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  X, 
  Palette, 
  UploadCloud, 
  Check, 
  ShieldCheck, 
  Loader2,
  Trash2,
  Edit3,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import DeleteConfirmModal from '../../../../components/admin/DeleteConfirmModal';

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

export default function AdminArtworksPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [imagePreview, setImagePreview] = useState(null);
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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setImagePreview(null);
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
    setImagePreview(art.image || null);
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

  // Open the custom delete modal
  const handleTriggerDelete = (art) => {
    setDeleteTarget({ id: art.id, title: art.title });
  };

  // Confirm delete handler
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
          ...(imagePreview && { image: imagePreview }),
        }),
      });

      if (!res.ok) throw new Error('Database transaction failed');
      const savedItem = await res.json();

      if (isEditing) {
        setItems((prev) => prev.map((art) => (art.id === editingId ? savedItem : art)));
      } else {
        setItems((prev) => [savedItem, ...prev]);
      }

      setShowModal(false);
      setEditingId(null);
      setFormData(DEFAULT_FORM);
      setImagePreview(null);
      setTouched(DEFAULT_TOUCHED);
    } catch (err) {
      alert('Error saving artwork to database.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5DFD7] pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-semibold flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-[#C29B38]" />
            Permanent Master Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">Gallery Originals Inventory</h1>
          <p className="text-xs text-[#867E74] font-light">
            Registry of one-of-one authentic originals published dynamically across the live exhibition.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={fetchArtworks}
            className="p-2.5 rounded-full border border-[#E5DFD7] text-[#867E74] hover:text-[#1A1A1A] hover:bg-[#FAF8F3] transition-colors cursor-pointer"
            title="Reload live inventory"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#C29B38]' : ''}`} />
          </button>

          <button 
            onClick={handleOpenAdd} 
            className="px-4 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Original</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-2xl bg-white border border-[#E5DFD7] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#867E74]">
            <Loader2 className="w-6 h-6 animate-spin text-[#C29B38]" />
            <span>Accessing gallery records...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="p-16 text-center text-xs font-mono text-[#867E74]">
            No artworks recorded in database. Click "Publish New Original" to add one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-[#E5DFD7] bg-[#FAF8F3] text-[10px] text-[#867E74] uppercase tracking-wider">
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
              <tbody className="divide-y divide-stone-100">
                {items.map((art) => (
                  <tr key={art.id} className="hover:bg-[#FAF8F3]/50 transition-colors">
                    
                    <td className="p-4">
                      <div className="w-12 h-14 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                        <img src={art.image} alt={art.title} className="w-full h-full object-cover grayscale" />
                      </div>
                    </td>

                    <td className="p-4 font-bold text-[#C29B38] uppercase whitespace-nowrap">
                      {art.id}
                    </td>

                    <td className="p-4">
                      <span className="font-serif text-sm font-medium text-[#1A1A1A] block">
                        {art.title}
                      </span>
                      <span className="text-[10px] text-[#867E74] block font-mono">
                        {art.category} &bull; Certified {art.year || '2026'}
                      </span>
                    </td>

                    <td className="p-4 text-[#686057]">
                      <span className="text-[#1A1A1A] block">{art.medium}</span>
                      <span className="text-[10px] text-[#867E74]">{art.substrate}</span>
                    </td>

                    <td className="p-4 text-[#1A1A1A] whitespace-nowrap">
                      {art.dimensions}
                    </td>

                    <td className="p-4 font-bold text-[#1A1A1A] whitespace-nowrap">
                      ${art.price} <span className="text-[10px] font-normal text-[#867E74]">USD</span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono border ${
                        art.status === 'Available'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold'
                          : art.status === 'Reserved'
                          ? 'bg-amber-50 text-amber-700 border-amber-200 font-semibold'
                          : 'bg-stone-100 text-stone-500 border-stone-200'
                      }`}>
                        {art.status}
                      </span>
                    </td>

                    <td className="p-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => handleToggleStatus(art.id, art.status)}
                        className="px-2.5 py-1.5 rounded-lg border border-[#E5DFD7] hover:border-[#C29B38] hover:bg-[#FAF8F3] text-[10px] text-[#1A1A1A] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                        title="Cycle state"
                      >
                        Cycle
                      </button>

                      <button
                        onClick={() => handleOpenEdit(art)}
                        className="p-1.5 rounded-lg border border-[#E5DFD7] text-stone-600 hover:text-[#C29B38] hover:border-[#C29B38] hover:bg-[#FAF8F3] transition-colors cursor-pointer inline-flex items-center"
                        title="Edit Masterpiece Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleTriggerDelete(art)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer inline-flex items-center"
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
        )}
      </div>

      {/* Shared Publish / Edit Modal with Inline Live Validation */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-[32px] p-6 sm:p-10 max-w-2xl w-full border border-[#E5DFD7] shadow-2xl space-y-6 my-8">
            
            <div className="flex justify-between items-start border-b border-[#E5DFD7] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C29B38] font-bold">
                    {editingId ? `Edit Record (${editingId})` : 'Curatorial Ingestion'}
                  </span>
                  <span className="text-[10px] font-mono text-[#867E74]">&bull; Live Database Sync</span>
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A] mt-1">
                  {editingId ? 'Modify Master Original' : 'Publish Master Original'}
                </h3>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 rounded-xl hover:bg-stone-100 cursor-pointer text-stone-400 hover:text-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6 text-xs font-mono">
              
              {/* Photo Input Preview */}
              <div className="space-y-1.5">
                <label className="text-[#1A1A1A] uppercase tracking-wider text-[11px] block font-semibold">
                  Exhibition Preview
                </label>
                
                {!imagePreview ? (
                  <label className="border-2 border-dashed border-[#E5DFD7] hover:border-[#C29B38] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#FAF8F3]/60 group">
                    <UploadCloud className="w-6 h-6 text-[#8C6415] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold">
                      Select Local Photo Preview
                    </span>
                    <span className="text-[10px] text-[#867E74] mt-0.5">Loads local preview for exhibition card</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-[#E5DFD7] bg-[#FAF8F3] p-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={imagePreview} alt="Preview" className="w-14 h-14 object-cover rounded-xl grayscale" />
                      <div>
                        <span className="text-[#1A1A1A] font-bold block">Asset Linked</span>
                        <span className="text-[10px] text-emerald-700 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Ready for exhibition
                        </span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setImagePreview(null)}
                      className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-[10px] cursor-pointer"
                    >
                      Replace
                    </button>
                  </div>
                )}
              </div>

              {/* Title & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Artwork Title with Validation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[#1A1A1A] block font-medium">Artwork Title *</label>
                    {touched.title && (
                      <span className={`text-[10px] ${isTitleValid ? 'text-emerald-700' : 'text-rose-600'}`}>
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
                      className={`w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#FAF8F3] border outline-none transition-all duration-200 ${
                        touched.title && !isTitleValid
                          ? 'border-rose-400 focus:border-rose-600 focus:ring-1 focus:ring-rose-200'
                          : touched.title && isTitleValid
                          ? 'border-emerald-500/70 focus:border-emerald-600'
                          : 'border-[#E5DFD7] focus:border-[#C29B38]'
                      }`}
                    />
                    {touched.title && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {isTitleValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Collection / Category */}
                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block font-medium">Collection / Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing, Dimensions & State Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Price with Validation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[#1A1A1A] block font-medium">Price ($ USD) *</label>
                    {touched.price && (
                      <span className={`text-[10px] ${isPriceValid ? 'text-emerald-700' : 'text-rose-600'}`}>
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
                      className={`w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#FAF8F3] border outline-none transition-all duration-200 ${
                        touched.price && !isPriceValid
                          ? 'border-rose-400 focus:border-rose-600 focus:ring-1 focus:ring-rose-200'
                          : touched.price && isPriceValid
                          ? 'border-emerald-500/70 focus:border-emerald-600'
                          : 'border-[#E5DFD7] focus:border-[#C29B38]'
                      }`}
                    />
                    {touched.price && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {isPriceValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Dimensions with Validation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[#1A1A1A] block font-medium">Dimensions *</label>
                    {touched.dimensions && (
                      <span className={`text-[10px] ${isDimensionsValid ? 'text-emerald-700' : 'text-rose-600'}`}>
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
                      className={`w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#FAF8F3] border outline-none transition-all duration-200 ${
                        touched.dimensions && !isDimensionsValid
                          ? 'border-rose-400 focus:border-rose-600 focus:ring-1 focus:ring-rose-200'
                          : touched.dimensions && isDimensionsValid
                          ? 'border-emerald-500/70 focus:border-emerald-600'
                          : 'border-[#E5DFD7] focus:border-[#C29B38]'
                      }`}
                    />
                    {touched.dimensions && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {isDimensionsValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Current State */}
                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block font-medium">Current State</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  >
                    <option value="Available">Available for Sale</option>
                    <option value="Reserved">Reserved by Patron</option>
                    <option value="Archived">Archived / Sold</option>
                  </select>
                </div>
              </div>

              {/* Medium & Substrate Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Medium with Validation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[#1A1A1A] block font-medium">Medium Used *</label>
                    {touched.medium && (
                      <span className={`text-[10px] ${isMediumValid ? 'text-emerald-700' : 'text-rose-600'}`}>
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
                      className={`w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#FAF8F3] border outline-none transition-all duration-200 ${
                        touched.medium && !isMediumValid
                          ? 'border-rose-400 focus:border-rose-600 focus:ring-1 focus:ring-rose-200'
                          : touched.medium && isMediumValid
                          ? 'border-emerald-500/70 focus:border-emerald-600'
                          : 'border-[#E5DFD7] focus:border-[#C29B38]'
                      }`}
                    />
                    {touched.medium && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {isMediumValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Paper Substrate */}
                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block font-medium">Paper Substrate</label>
                  <select 
                    value={formData.substrate}
                    onChange={(e) => setFormData({ ...formData, substrate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  >
                    {SUBSTRATES.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[#1A1A1A] block font-medium">Description & Technique Notes</label>
                <textarea 
                  rows={2}
                  placeholder="Atmospheric tonal gradations created with raw vine charcoal and dry brush dusting..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38] placeholder:text-stone-400"
                />
              </div>

              {/* Verification Switches */}
              <div className="pt-2 border-t border-[#E5DFD7] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#686057]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={formData.signed} 
                    onChange={(e) => setFormData({ ...formData, signed: e.target.checked })}
                    className="rounded accent-[#C29B38] w-4 h-4" 
                  />
                  <span>Hand-signed + Certificate Included</span>
                </label>

               
              </div>

              {/* Action Submit with Active State */}
              <button 
                type="submit" 
                disabled={submitting || !isFormValid}
                className="w-full py-4 rounded-2xl bg-[#1A1A1A] text-[#FAF8F5] uppercase tracking-[0.2em] hover:bg-[#C29B38] transition-colors cursor-pointer font-bold shadow-md text-xs flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1A1A1A]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
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