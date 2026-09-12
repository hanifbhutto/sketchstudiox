'use client';

import { useState } from 'react';
import { 
  Plus, 
  X, 
  Palette, 
  UploadCloud, 
  Check, 
  ShieldCheck, 
  Image as ImageIcon,
  Sparkles 
} from 'lucide-react';

const INITIAL_CATALOG = [
  { 
    id: 'ssx-01', 
    title: 'The Silent Contemplation', 
    category: 'Portraits',
    price: 340, 
    medium: '8B Graphite on Arches', 
    substrate: '300 GSM French Cotton',
    dimensions: '16 × 20 in', 
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    year: '2026'
  },
  { 
    id: 'ssx-02', 
    title: 'Bonded in Charcoal', 
    category: 'Couples',
    price: 420, 
    medium: 'Raw Willow Charcoal', 
    substrate: 'Fabriano Artistico Extra White',
    dimensions: '18 × 24 in', 
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    year: '2026'
  },
  { 
    id: 'ssx-03', 
    title: 'Grit & Grace', 
    category: 'Figures',
    price: 290, 
    medium: 'Compressed Charcoal Powder', 
    substrate: 'Heavyweight Bristol Smooth',
    dimensions: '12 × 16 in', 
    status: 'Reserved',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    year: '2026'
  },
];

const CATEGORIES = [
  'Human Portraits',
  'Pet & Animal Portraits',     // Flyer ka core feature (Dogs, Cats)
  'Couples & Family Studies',
  'Bridal & Cultural Heritage', // Flyer top-left Indian/Eastern bride
  'Classical Figures'
];
const SUBSTRATES = [
  '300 GSM French Cotton Arches',
  'Fabriano Artistico Extra White',
  'Strathmore 500 Series Bristol',
  'Hahnemühle Nostalgie Heavyweight'
];

export default function AdminArtworksPage() {
  const [items, setItems] = useState(INITIAL_CATALOG);
  const [showModal, setShowModal] = useState(false);

  // Form State for dynamic publishing
  const [formData, setFormData] = useState({
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
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleToggleStatus = (id) => {
    setItems(prev => prev.map(art => {
      if (art.id === id) {
        const next = art.status === 'Available' ? 'Reserved' : art.status === 'Reserved' ? 'Archived' : 'Available';
        return { ...art, status: next };
      }
      return art;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    const newEntry = {
      id: `ssx-0${items.length + 1}`,
      title: formData.title,
      category: formData.category,
      price: Number(formData.price),
      medium: formData.medium,
      substrate: formData.substrate,
      dimensions: formData.dimensions,
      status: formData.status,
      image: imagePreview || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      year: '2026'
    };

    setItems([newEntry, ...items]);
    setShowModal(false);
    
    // Reset Form
    setFormData({
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
    });
    setImagePreview(null);
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

        <button 
          onClick={() => setShowModal(true)} 
          className="px-4 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors flex items-center gap-2 cursor-pointer self-start shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Original</span>
        </button>
      </div>

      {/* Originals Inventory Table */}
      <div className="rounded-2xl bg-white border border-[#E5DFD7] shadow-xs overflow-hidden">
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
                <th className="p-4 text-right font-semibold">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {items.map((art) => (
                <tr key={art.id} className="hover:bg-[#FAF8F3]/50 transition-colors">
                  
                  {/* Thumbnail */}
                  <td className="p-4">
                    <div className="w-12 h-14 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover grayscale" />
                    </div>
                  </td>

                  {/* ID */}
                  <td className="p-4 font-bold text-[#C29B38] uppercase whitespace-nowrap">
                    {art.id}
                  </td>

                  {/* Title & Category */}
                  <td className="p-4">
                    <span className="font-serif text-sm font-medium text-[#1A1A1A] block">
                      {art.title}
                    </span>
                    <span className="text-[10px] text-[#867E74] block font-mono">
                      {art.category} &bull; Certified {art.year}
                    </span>
                  </td>

                  {/* Medium & Substrate */}
                  <td className="p-4 text-[#686057]">
                    <span className="text-[#1A1A1A] block">{art.medium}</span>
                    <span className="text-[10px] text-[#867E74]">{art.substrate}</span>
                  </td>

                  {/* Dimensions */}
                  <td className="p-4 text-[#1A1A1A] whitespace-nowrap">
                    {art.dimensions}
                  </td>

                  {/* Price */}
                  <td className="p-4 font-bold text-[#1A1A1A] whitespace-nowrap">
                    ${art.price} <span className="text-[10px] font-normal text-[#867E74]">USD</span>
                  </td>

                  {/* Status Badge */}
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

                  {/* Action Toggle */}
                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(art.id)}
                      className="px-3 py-1.5 rounded-lg border border-[#E5DFD7] hover:border-[#C29B38] hover:bg-[#FAF8F3] text-[10px] text-[#1A1A1A] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                      title="Click to cycle status"
                    >
                      Cycle Status
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROFESSIONAL MULTI-FIELD PUBLISH MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-[32px] p-6 sm:p-10 max-w-2xl w-full border border-[#E5DFD7] shadow-2xl space-y-6 my-8">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#E5DFD7] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C29B38] font-bold">
                    Curatorial Ingestion
                  </span>
                  <span className="text-[10px] font-mono text-[#867E74]">&bull; 1-of-1 Unique Artwork</span>
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A] mt-1">Publish Master Original</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 rounded-xl hover:bg-stone-100 cursor-pointer text-stone-400 hover:text-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
              
              {/* Photo Dropzone Preview */}
              <div className="space-y-1.5">
                <label className="text-[#1A1A1A] uppercase tracking-wider text-[11px] block font-semibold">
                  High-Resolution Exhibition Capture
                </label>
                
                {!imagePreview ? (
                  <label className="border-2 border-dashed border-[#E5DFD7] hover:border-[#C29B38] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#FAF8F3]/60 group">
                    <UploadCloud className="w-6 h-6 text-[#8C6415] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold">
                      Upload Master File (JPG/PNG up to 25MB)
                    </span>
                    <span className="text-[10px] text-[#867E74] mt-0.5">High-res artwork scan for product loupe inspection</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-[#E5DFD7] bg-[#FAF8F3] p-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={imagePreview} alt="Preview" className="w-14 h-14 object-cover rounded-xl grayscale" />
                      <div>
                        <span className="text-[#1A1A1A] font-bold block">Master Artwork Ingested</span>
                        <span className="text-[10px] text-emerald-700 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Ready for exhibition display
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
                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block">Artwork Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. The Nocturne Gaze"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block">Gallery Collection / Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing, Dimensions & Substrate */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block">Acquisition Price ($ USD) *</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 480"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block">Dimensions (Inches)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 18 × 24 in"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block">Initial State</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  >
                    <option value="Available">Available for Sale</option>
                    <option value="Reserved">Reserved by Patron</option>
                    <option value="Archived">Archived / Sold</option>
                  </select>
                </div>
              </div>

              {/* Medium & Substrate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block">Medium Used</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Raw Willow Charcoal & 8B Graphite"
                    value={formData.medium}
                    onChange={(e) => setFormData({...formData, medium: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#1A1A1A] block">Paper Substrate</label>
                  <select 
                    value={formData.substrate}
                    onChange={(e) => setFormData({...formData, substrate: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                  >
                    {SUBSTRATES.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Curator Notes */}
              <div className="space-y-1.5">
                <label className="text-[#1A1A1A] block">Curatorial Description & Technique Notes</label>
                <textarea 
                  rows={2}
                  placeholder="Atmospheric tonal gradations created with raw vine charcoal and dry brush dusting..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38] placeholder:text-stone-400"
                />
              </div>

              {/* Verification Switches */}
              <div className="pt-2 border-t border-[#E5DFD7] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#686057]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={formData.signed} 
                    onChange={(e) => setFormData({...formData, signed: e.target.checked})}
                    className="rounded accent-[#C29B38] w-4 h-4" 
                  />
                  <span>Hand-signed on Recto & Verso + Certificate Included</span>
                </label>

                <div className="flex items-center gap-1.5 text-emerald-700 font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>UK Registered: 17429707</span>
                </div>
              </div>

              {/* Action Button */}
              <button 
                type="submit" 
                className="w-full py-4 rounded-2xl bg-[#1A1A1A] text-[#FAF8F5] uppercase tracking-[0.2em] hover:bg-[#C29B38] transition-colors cursor-pointer font-bold shadow-md text-xs"
              >
                Publish to Exhibition Catalog
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}