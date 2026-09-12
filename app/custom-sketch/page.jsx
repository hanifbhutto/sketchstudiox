'use client';

import { useState } from 'react';
import { 
  UploadCloud, 
  Trash2, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

const SIZES = [
  { id: 'a4', label: 'A4 (8.3 × 11.7 in)', basePrice: 120, desc: 'Ideal for single portrait or pet' },
  { id: 'a3', label: 'A3 (11.7 × 16.5 in)', basePrice: 190, desc: 'Most popular for couples & details', recommended: true },
  { id: 'a2', label: 'A2 (16.5 × 23.4 in)', basePrice: 280, desc: 'Large statement piece for family' },
];

const MEDIUMS = [
  { id: 'charcoal', label: 'Raw Charcoal', desc: 'Deep, dramatic contrast & rich matte shadows', extra: 0 },
  { id: 'graphite', label: 'Fine 8B Graphite', desc: 'Surgical precision, realistic skin & fine line work', extra: 20 },
  { id: 'mixed', label: 'Charcoal + Graphite Hybrid', desc: 'Graphite precision for eyes with charcoal depth', extra: 40 },
];

const SUBJECT_COUNTS = [
  { count: 1, label: 'Single Subject', multiplier: 1 },
  { count: 2, label: '2 Subjects (Couple / 2 Faces)', multiplier: 1.4 },
  { count: 3, label: '3 Subjects (Family / Pets)', multiplier: 1.75 },
  { count: 4, label: '4+ Subjects (Group Portrait)', multiplier: 2.1 },
];

export default function CustomSketchPage() {
  const { addToCart, setIsCartOpen } = useCart();

  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [selectedMedium, setSelectedMedium] = useState(MEDIUMS[0]);
  const [selectedSubject, setSelectedSubject] = useState(SUBJECT_COUNTS[0]);
  const [includeFrame, setIncludeFrame] = useState(false);
  const [notes, setNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    setFileName('');
  };

  const frameCost = includeFrame ? 65 : 0;
  const totalPrice = Math.round(
    (selectedSize.basePrice + selectedMedium.extra) * selectedSubject.multiplier + frameCost
  );

  const handleAddCustomToCart = () => {
    if (!previewUrl) return;

    const customCommissionItem = {
      id: `custom-${Date.now()}`,
      title: `Bespoke Portrait (${selectedSubject.label})`,
      category: 'Custom Commission',
      medium: selectedMedium.label,
      dimensions: selectedSize.label,
      frame: includeFrame ? 'Museum Hardwood (+Mat Board)' : 'Unframed Sheet',
      price: totalPrice,
      image: previewUrl,
      notes: notes || 'Standard atelier lighting & portraiture balance',
      isCustom: true,
    };

    addToCart(customCommissionItem);
    setIsAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden">
      
      {/* Fine Cotton Grain Background */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-multiply pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#C29B38 0.75px, transparent 0.75px), radial-gradient(#1A1A1A 0.5px, #FAF8F5 0.5px)`,
          backgroundSize: '24px 24px, 12px 12px',
          backgroundPosition: '0 0, 6px 6px'
        }}
      />

      {/* Studio Ambient Glows */}
      <div className="absolute top-20 left-10 w-[600px] h-[450px] bg-gradient-to-tr from-[#D4A348]/15 via-rose-300/5 to-transparent blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-20 right-10 w-[550px] h-[500px] bg-gradient-to-bl from-stone-900/10 via-[#D4A348]/12 to-transparent blur-[140px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Editorial Header */}
        <div className="max-w-2xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4A348]/40 bg-[#D4A348]/10 backdrop-blur-md text-[#8C6415] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>Atelier Commission Service</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-[1.08]">
            Commission your <br />
            <span className="italic font-light bg-gradient-to-r from-[#D4A348] via-[#B88728] to-[#8C6415] bg-clip-text text-transparent">
              original portrait.
            </span>
          </h1>

          <p className="text-[#686057] font-light text-sm sm:text-base leading-relaxed">
            Upload your reference photograph, configure dimensions and medium, and review real-time live acquisition pricing before adding to your bag.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Customizer Flow */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Upload Photo Dropzone */}
            <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E5DFD7] shadow-[0_12px_35px_-10px_rgba(212,163,72,0.08)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-[#FAF8F5] flex items-center justify-center text-[10px]">1</span>
                  Reference Image
                </span>
                <span className="text-[11px] text-[#867E74] font-mono">JPG, PNG up to 25MB</span>
              </div>

              {!previewUrl ? (
                <label className="border-2 border-dashed border-[#E5DFD7] hover:border-[#C29B38] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#FAF8F3]/60 group">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E5DFD7] flex items-center justify-center text-[#8C6415] group-hover:scale-105 group-hover:bg-[#1A1A1A] group-hover:text-white transition-all shadow-2xs mb-3">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#1A1A1A] font-medium font-mono">
                    Click or Drag to Upload Photograph
                  </span>
                  <span className="text-[11px] text-[#867E74] mt-1 font-light">
                    Clear facial lighting and sharp eye details recommended
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-[#E5DFD7] bg-[#FAF8F3] p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#1A1A1A] truncate max-w-[200px] sm:max-w-xs">
                        {fileName}
                      </p>
                      <span className="text-[10px] text-emerald-700 uppercase tracking-wider font-mono flex items-center gap-1 mt-0.5">
                        <Check className="w-3 h-3" /> Ready for Artist Rendering
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeImage}
                    className="p-2.5 rounded-xl hover:bg-white text-zinc-400 hover:text-rose-600 transition-colors mr-1 cursor-pointer"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Dimensions & Paper Size */}
            <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E5DFD7] shadow-[0_12px_35px_-10px_rgba(212,163,72,0.08)] space-y-4">
              <span className="font-mono text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-[#FAF8F5] flex items-center justify-center text-[10px]">2</span>
                Artwork Dimensions
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer ${
                      selectedSize.id === size.id
                        ? 'border-[#C29B38] bg-[#FAF8F3] shadow-xs ring-1 ring-[#C29B38]/40'
                        : 'border-[#E5DFD7] bg-white hover:border-[#D4A348]/60'
                    }`}
                  >
                    {size.recommended && (
                      <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-[#D4A348] to-[#C29B38] text-[#0A0908] text-[9px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 rounded-full shadow-2xs">
                        Popular
                      </span>
                    )}
                    <h3 className="font-mono text-xs font-semibold text-[#1A1A1A]">{size.label}</h3>
                    <p className="text-[11px] text-[#686057] font-light mt-1">{size.desc}</p>
                    <span className="font-mono text-xs text-[#8C6415] font-bold block mt-3">
                      ${size.basePrice} USD
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Drawing Medium & Subjects */}
            <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E5DFD7] shadow-[0_12px_35px_-10px_rgba(212,163,72,0.08)] space-y-6">
              
              {/* Medium Selection */}
              <div className="space-y-3">
                <span className="font-mono text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-[#FAF8F5] flex items-center justify-center text-[10px]">3</span>
                  Artistic Medium
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MEDIUMS.map((med) => (
                    <button
                      key={med.id}
                      onClick={() => setSelectedMedium(med)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedMedium.id === med.id
                          ? 'border-[#C29B38] bg-[#FAF8F3] ring-1 ring-[#C29B38]/40 shadow-xs'
                          : 'border-[#E5DFD7] bg-white hover:border-[#D4A348]/60'
                      }`}
                    >
                      <h4 className="font-serif text-sm font-normal text-[#1A1A1A]">{med.label}</h4>
                      <p className="text-[10px] text-[#686057] leading-snug mt-1">{med.desc}</p>
                      {med.extra > 0 ? (
                        <span className="text-[10px] font-mono text-[#8C6415] font-semibold block mt-2">
                          +${med.extra} USD
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[#867E74] block mt-2">
                          Standard
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Subjects */}
              <div className="space-y-3 pt-4 border-t border-[#E5DFD7]">
                <label className="text-xs uppercase tracking-wider text-[#867E74] font-mono block font-medium">
                  Number of Figures / Faces
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SUBJECT_COUNTS.map((sub) => (
                    <button
                      key={sub.count}
                      onClick={() => setSelectedSubject(sub)}
                      className={`py-2.5 px-3 rounded-xl border text-[11px] font-mono uppercase tracking-wider transition-all text-center cursor-pointer ${
                        selectedSubject.count === sub.count
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FAF8F5] shadow-xs font-semibold'
                          : 'border-[#E5DFD7] bg-white text-[#686057] hover:border-[#C29B38]'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Museum Framing Add-on */}
              <div className="pt-4 border-t border-[#E5DFD7] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] font-mono">
                    Museum Mat & Solid Hardwood Frame
                  </h4>
                  <p className="text-[11px] text-[#686057] font-light mt-0.5">
                    Solid wood frame, acid-free bevel mat board, anti-glare UV acrylic.
                  </p>
                </div>
                <button
                  onClick={() => setIncludeFrame(!includeFrame)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                    includeFrame ? 'bg-[#1A1A1A]' : 'bg-stone-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full shadow-xs transition-transform ${
                      includeFrame ? 'translate-x-6 bg-[#D4A348]' : 'translate-x-0 bg-white'
                    }`}
                  />
                </button>
              </div>

              {/* Special Instructions */}
              <div className="space-y-2 pt-2 border-t border-[#E5DFD7]">
                <label className="text-xs uppercase tracking-wider text-[#867E74] font-mono block">
                  Artist Directives & Composition Requests (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Combine multiple family photos, remove background objects, enhance contrast..."
                  rows={3}
                  className="w-full p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38] transition-colors placeholder:text-[#A8A196]"
                />
              </div>

            </div>

          </div>

          {/* Right Column: Sticky Commission Estimate & Live Pricing */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E5DFD7] shadow-[0_20px_50px_-15px_rgba(212,163,72,0.15)] space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#E5DFD7] pb-4">
                <span className="font-serif text-xl text-[#1A1A1A]">Commission Estimate</span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full font-mono font-medium">
                  Guaranteed Proof
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs text-[#686057] font-light">
                <div className="flex justify-between">
                  <span>Base Canvas ({selectedSize.label})</span>
                  <span className="font-mono text-[#1A1A1A] font-medium">${selectedSize.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium ({selectedMedium.label})</span>
                  <span className="font-mono text-[#1A1A1A] font-medium">
                    {selectedMedium.extra > 0 ? `+$${selectedMedium.extra}` : 'Included'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Subject Multiplier ({selectedSubject.label})</span>
                  <span className="font-mono text-[#1A1A1A] font-medium">
                    {selectedSubject.multiplier > 1 ? `${selectedSubject.multiplier}x` : '1x'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Museum Hardwood Matting</span>
                  <span className="font-mono text-[#1A1A1A] font-medium">
                    {includeFrame ? '+$65' : 'None'}
                  </span>
                </div>
                <div className="flex justify-between text-[#867E74]">
                  <span>Digital Proof Inspection</span>
                  <span className="font-mono text-emerald-700 font-medium">Free Included</span>
                </div>
              </div>

              {/* Total Price Display */}
              <div className="pt-4 border-t border-[#E5DFD7] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#867E74] block font-mono">
                    Total Acquisition
                  </span>
                  <span className="text-xs text-[#686057] font-light">Includes insured courier delivery</span>
                </div>
                <span className="text-3xl font-serif text-[#1A1A1A] font-normal">
                  ${totalPrice} <span className="text-xs font-sans text-[#867E74] font-normal">USD</span>
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleAddCustomToCart}
                disabled={!previewUrl}
                className={`w-full py-4 rounded-2xl text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  previewUrl
                    ? isAdded
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C29B38] shadow-[0_12px_28px_-8px_rgba(212,163,72,0.35)]'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300 shadow-none'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Added to Acquisition Bag</span>
                  </>
                ) : (
                  <>
                    <span>{previewUrl ? 'Add Commission to Bag' : 'Upload Photo to Continue'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Trust Indicators */}
              <div className="pt-2 space-y-2.5 border-t border-[#E5DFD7] text-[11px] text-[#686057] font-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% digital proof approval guarantee before shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#8C6415] shrink-0" />
                  <span>Standard atelier turnaround: 4 to 7 business days</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}