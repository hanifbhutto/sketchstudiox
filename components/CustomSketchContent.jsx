'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  Trash2, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Info,
  Building2,
  Loader2,
  MapPin,
  AlertCircle
} from 'lucide-react';
import PricingTableSection from '../app/custom-sketch/PricingTableModal';

const MEDIUMS = [
  { id: 'charcoal', label: 'Raw Willow Charcoal', desc: 'Deep tonal contrast, velvety shadows & rich matte texture' },
  { id: 'graphite', label: '8B Fine Graphite', desc: 'Hyper-detailed precision lines, skin gradations & fine highlights' },
  { id: 'hybrid', label: 'Graphite + Charcoal Blend', desc: 'Precision eye work with charcoal atmospheric depth' },
];

const DEFAULT_FALLBACK_RATES = {
  'A4 (8×12)': { 1: 200 },
  'A3 (12×16)': { 1: 250, 2: 400 },
  '16×20': { 1: 300, 2: 450, 3: 550 },
  '18×24': { 1: 350, 2: 500, 3: 650, 4: 750 },
  '20×30': { 1: 400, 2: 550, 3: 700, 4: 800, 5: 900 },
  '24×36': { 1: 450, 2: 650, 3: 750, 4: 850, 5: 950, 6: 1050 },
  '30×40': { 1: 550, 2: 750, 3: 900, 4: 1050, 5: 1150, 6: 1300, 7: 1450, 8: 1600, 9: 1750, 10: 1850 }
};

const AVAILABLE_SIZES = [
  { id: 'a4', name: 'A4', dimensions: '8×12', desc: 'Single subject portrait or pet study', maxSubjects: 1 },
  { id: 'a3', name: 'A3', dimensions: '12×16', desc: 'Most requested for single portraits & couples', popular: true, maxSubjects: 2 },
  { id: '16x20', name: '16×20', dimensions: '16×20', desc: 'Classic medium scale for 1 to 3 figures', maxSubjects: 3 },
  { id: '18x24', name: '18×24', dimensions: '18×24', desc: 'Spacious canvas for families & multi-pets', maxSubjects: 4 },
  { id: '20x30', name: '20×30', dimensions: '20×30', desc: 'Gallery exhibition scale for up to 5 subjects', maxSubjects: 5 },
  { id: '24x36', name: '24×36', dimensions: '24×36', desc: 'Substantial statement centerpiece up to 6 subjects', maxSubjects: 6 },
  { id: '30x40', name: '30×40', dimensions: '30×40', desc: 'Grand heirloom master study (supports up to 10 subjects)', maxSubjects: 10 },
];

export default function CustomSketchContent() {
  const router = useRouter();

  const [liveRates, setLiveRates] = useState(DEFAULT_FALLBACK_RATES);
  const [loadingRates, setLoadingRates] = useState(true);

  const [selectedSize, setSelectedSize] = useState(AVAILABLE_SIZES[1]); 
  const [subjectCount, setSubjectCount] = useState(1);
  const [selectedMedium, setSelectedMedium] = useState(MEDIUMS[0]);
  const [includeFrame, setIncludeFrame] = useState(false);
  const [notes, setNotes] = useState('');

  // Shipping & Recipient Details Form State
  const [shippingName, setShippingName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [phone, setPhone] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState('');

  // Pre-fill patron name if logged in
  useEffect(() => {
    const savedEmail = localStorage.getItem('patronEmail');
    if (savedEmail) {
      async function fetchProfile() {
        try {
          const res = await fetch(`/api/auth/profile?email=${encodeURIComponent(savedEmail)}`);
          const data = await res.json();
          if (data.user && data.user.name) {
            setShippingName(data.user.name);
          }
        } catch (err) {
          console.error('Error fetching profile name:', err);
        }
      }
      fetchProfile();
    }
  }, []);

  // Fetch live database pricing matrix on load
  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch('/api/admin/pricing');
        const data = await res.json();
        if (data.rates) {
          setLiveRates(data.rates);
        }
      } catch (err) {
        console.error('Failed to load live rates, using fallback:', err);
      } finally {
        setLoadingRates(false);
      }
    }
    fetchRates();
  }, []);

  // Countdown timer for automatic redirect after successful submission
  useEffect(() => {
    if (!submittedOrder) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = `/account/commissions/${submittedOrder.orderId}`;
    }
  }, [submittedOrder, countdown]);

  const findMatchingRateKey = (sizeName) => {
    const keys = Object.keys(liveRates);
    return keys.find(k => k.toLowerCase().includes(sizeName.toLowerCase())) || keys[1];
  };

  const matchedKey = findMatchingRateKey(selectedSize.name);
  const currentSizeRates = liveRates[matchedKey] || { 1: 250 };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    const newKey = findMatchingRateKey(size.name);
    const availableSubjects = Object.keys(liveRates[newKey] || { 1: 250 }).map(Number);
    const maxSub = Math.max(...availableSubjects);
    if (subjectCount > maxSub) {
      setSubjectCount(maxSub);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setErrorMessage('');
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileName('');
  };

  const basePrice = currentSizeRates[subjectCount] || currentSizeRates[1] || 250;
  const frameCost = includeFrame ? 75 : 0;
  const totalPrice = basePrice + frameCost;

  const handleSubmitCommission = async () => {
    if (!selectedFile) {
      setErrorMessage('Please upload a reference photo to proceed with your commission.');
      return;
    }

    const patronEmail = localStorage.getItem('patronEmail');
    const userId = localStorage.getItem('userId');

    if (!patronEmail) {
      localStorage.setItem('pending_commission_redirect', '/custom-sketch');
      router.push('/login?redirect=/custom-sketch');
      return;
    }

    if (!shippingName.trim() || !address.trim() || !city.trim() || !postalCode.trim()) {
      setErrorMessage('Please fill in all required delivery and recipient details (Name, Street Address, City, Postal Code).');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const imageFormData = new FormData();
      imageFormData.append('file', selectedFile);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: imageFormData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || (!uploadData.secureUrl && !uploadData.url)) {
        throw new Error(uploadData.error || 'Failed to secure reference photo in Cloudinary vault.');
      }

      const permanentImageUrl = uploadData.secureUrl || uploadData.url;

      const res = await fetch('/api/commissions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId || null,
          email: patronEmail,
          name: shippingName,
          address: address,
          city: city,
          postalCode: postalCode,
          country: country,
          phone: phone,
          details: {
            subjectCount,
            size: `${selectedSize.name} (${selectedSize.dimensions} in)`,
            medium: selectedMedium.label,
            frame: includeFrame ? 'Museum Solid Hardwood & Matting' : 'Archival Unframed Sheet',
            notes: notes || 'Standard atelier lighting & facial balance'
          },
          pricing: {
            totalPrice
          },
          imageUrl: permanentImageUrl
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit commission request.');
      }

      setSubmittedOrder({
        orderId: data.orderId,
        orderNumber: data.orderNumber
      });
    } catch (err) {
      console.error('Commission submission error:', err);
      setErrorMessage(err.message || 'Error submitting commission request.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Floating Success Toast Notification */}
      <AnimatePresence>
        {submittedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs px-4">
            <div className="max-w-md w-full p-8 rounded-[32px] bg-[#171513] border border-white/15 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#e4c577] font-bold">
                  Atelier Intake Registered
                </span>
                <h2 className="font-serif text-2xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
                  Commission Confirmed
                </h2>
                <p className="text-xs text-[#A8A196] font-light leading-relaxed">
                  Reference Number <strong className="font-mono text-[#FAF8F5]">{submittedOrder.orderNumber}</strong> has been securely logged with verified delivery details and permanent Cloudinary photo reference.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs text-[#A8A196]">
                <p>Redirecting to your commission tracker in <span className="text-[#e4c577] font-bold text-sm">{countdown}s</span>...</p>
              </div>

              <a
                href={`/account/commissions/${submittedOrder.orderId}`}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs font-mono uppercase tracking-wider hover:brightness-110 transition-all block font-bold text-center"
              >
                View Commission Tracker Now
              </a>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Atmospheric Atelier Glows */}
      <div className="absolute top-20 left-10 w-[600px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-20 right-10 w-[550px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.08)_0%,transparent_70%)] blur-[140px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 backdrop-blur-md text-[#e4c577] text-[10px] uppercase tracking-[0.22em] font-mono font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />
              <span>Official Live Atelier Rate Card</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#A8A196]">
              <Building2 className="w-3 h-3 text-[#e4c577]" />
              <span>SKETCH X STUDIO LTD &bull; UK No: 17429707</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#FAF8F5] tracking-tight leading-[1.08]" style={{ fontFamily: 'Georgia, serif' }}>
            Commission your <br />
            <span className="italic font-light text-[#e4c577]">
              bespoke heirloom portrait.
            </span>
          </h1>

          <p className="text-[#A8A196] font-light text-sm sm:text-base leading-relaxed">
            Every portrait is 100% hand-drawn from your reference photo (people or pets) on archival French cotton substrate. Select canvas format and number of subjects to compute live database pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Customizer Flow */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Upload Photo Dropzone */}
            <div className="rounded-[28px] bg-[#171513] p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#FAF8F5] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e4c577] text-[#0A0908] flex items-center justify-center text-[10px] font-bold">1</span>
                  Reference Photo (Person or Pet) <span className="text-rose-400">*</span>
                </span>
                <span className="text-[11px] text-[#A8A196] font-mono">JPG, PNG up to 25MB</span>
              </div>

              {!previewUrl ? (
                <label className="border-2 border-dashed border-white/15 hover:border-[#e4c577]/60 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/40 group">
                  <div className="w-12 h-12 rounded-full bg-[#171513] border border-white/15 flex items-center justify-center text-[#e4c577] group-hover:scale-105 group-hover:bg-[#e4c577] group-hover:text-[#0A0908] transition-all shadow-2xs mb-3">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#FAF8F5] font-medium font-mono">
                    Click or Drag to Upload Reference Photo
                  </span>
                  <span className="text-[11px] text-[#A8A196] mt-1 font-light text-center max-w-sm">
                    High-res directional daylight images yield the sharpest hand-rendered tonal gradient.
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-800 shrink-0 border border-white/10 relative">
                      <img src={previewUrl} alt="Reference Preview" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#FAF8F5] truncate max-w-[200px] sm:max-w-xs">
                        {fileName}
                      </p>
                      <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1 mt-0.5">
                        <Check className="w-3 h-3" /> Ready for Cloudinary Submission
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-2.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-rose-400 transition-colors mr-1 cursor-pointer"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Dimensions & Canvas Scale */}
            <div className="rounded-[28px] bg-[#171513] p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#FAF8F5] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e4c577] text-[#0A0908] flex items-center justify-center text-[10px] font-bold">2</span>
                  Canvas Dimensions
                </span>
                <span className="text-[11px] text-[#A8A196] font-mono">Select Format</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AVAILABLE_SIZES.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  const key = findMatchingRateKey(size.name);
                  const sizePrices = liveRates[key] || { 1: 200 };
                  const startingPrice = sizePrices[1] || 200;

                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => handleSizeSelect(size)}
                      className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer ${
                        isSelected
                          ? 'border-[#e4c577] bg-[#e4c577]/10 shadow-xs ring-1 ring-[#e4c577]/40'
                          : 'border-white/10 bg-black/40 hover:border-[#e4c577]/50'
                      }`}
                    >
                      {size.popular && (
                        <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-[9px] uppercase tracking-widest font-mono font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                          Atelier Popular
                        </span>
                      )}
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-mono text-xs font-bold text-[#FAF8F5]">
                          {size.name} <span className="text-[11px] text-[#A8A196] font-normal">({size.dimensions} in)</span>
                        </h3>
                        <span className="font-mono text-xs text-[#e4c577] font-bold">
                          From ${startingPrice}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A8A196] font-light mt-1.5 leading-snug">{size.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Subjects Count */}
            <div className="rounded-[28px] bg-[#171513] p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#FAF8F5] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e4c577] text-[#0A0908] flex items-center justify-center text-[10px] font-bold">3</span>
                  Number of Subjects (Person or Pet)
                </span>
                <span className="text-[11px] text-[#A8A196] font-mono">
                  Live Database Matrix
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                  const priceForSubject = currentSizeRates[num];
                  const isAvailable = priceForSubject !== undefined && priceForSubject !== null;
                  const isSelected = subjectCount === num;

                  return (
                    <button
                      key={num}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => setSubjectCount(num)}
                      className={`py-3 rounded-xl border text-xs font-mono transition-all text-center ${
                        isSelected
                          ? 'border-[#e4c577] bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] shadow-xs font-bold ring-2 ring-[#e4c577]/40'
                          : isAvailable
                          ? 'border-white/10 bg-black/40 text-[#FAF8F5] hover:border-[#e4c577]/60 cursor-pointer'
                          : 'border-white/5 bg-white/[0.02] text-white/20 cursor-not-allowed opacity-40'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Medium & Custom Directives */}
            <div className="rounded-[28px] bg-[#171513] p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-xs font-semibold text-[#FAF8F5] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e4c577] text-[#0A0908] flex items-center justify-center text-[10px] font-bold">4</span>
                  Artistic Medium Preference
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MEDIUMS.map((med) => (
                    <button
                      key={med.id}
                      type="button"
                      onClick={() => setSelectedMedium(med)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedMedium.id === med.id
                          ? 'border-[#e4c577] bg-[#e4c577]/10 ring-1 ring-[#e4c577]/40 shadow-xs'
                          : 'border-white/10 bg-black/40 hover:border-[#e4c577]/50'
                      }`}
                    >
                      <h4 className="font-serif text-sm font-normal text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>{med.label}</h4>
                      <p className="text-[10px] text-[#A8A196] leading-snug mt-1">{med.desc}</p>
                      <span className="text-[10px] font-mono text-emerald-400 block mt-2">
                        Included in Rate
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Museum Framing Addon */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] font-mono">
                    Museum Mat & Solid Hardwood Frame
                  </h4>
                  <p className="text-[11px] text-[#A8A196] font-light mt-0.5">
                    Acid-free bevel mat board, anti-glare museum acrylic, and sealed dust backing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIncludeFrame(!includeFrame)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer shrink-0 ${
                    includeFrame ? 'bg-[#e4c577]' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full shadow-xs transition-transform ${
                      includeFrame ? 'translate-x-6 bg-[#0A0908]' : 'translate-x-0 bg-white'
                    }`}
                  />
                </button>
              </div>

              {/* Special Directives */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-xs uppercase tracking-wider text-[#A8A196] font-mono block">
                  Composition Directives & Special Requests (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Combine faces from two separate photos, remove sunglasses, soften background shadows..."
                  rows={3}
                  className="w-full p-3.5 rounded-2xl bg-black/50 border border-white/10 text-xs text-[#FAF8F5] outline-none focus:border-[#e4c577] transition-colors placeholder:text-white/30"
                />
              </div>

            </div>

            {/* Step 5: Delivery & Recipient Details (Mandatory) */}
            <div className="rounded-[28px] bg-[#171513] p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#FAF8F5] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e4c577] text-[#0A0908] flex items-center justify-center text-[10px] font-bold">5</span>
                  Delivery & Recipient Details <span className="text-rose-400">*</span>
                </span>
                <span className="text-[11px] text-[#A8A196] font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#e4c577]" /> Secure Courier
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-[#A8A196]">Full Name <span className="text-rose-400">*</span></label>
                  <input
                    type="text"
                    required
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    placeholder="e.g. Iftikhar Hassan"
                    className="w-full p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#FAF8F5] outline-none focus:border-[#e4c577]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-[#A8A196]">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7000 000000"
                    className="w-full p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#FAF8F5] outline-none focus:border-[#e4c577]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-[#A8A196]">Street Address <span className="text-rose-400">*</span></label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 123 Gallery Way, Suite 4B"
                    className="w-full p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#FAF8F5] outline-none focus:border-[#e4c577]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-[#A8A196]">City <span className="text-rose-400">*</span></label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. London"
                    className="w-full p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#FAF8F5] outline-none focus:border-[#e4c577]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-[#A8A196]">Postal Code <span className="text-rose-400">*</span></label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. SW1A 1AA"
                    className="w-full p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#FAF8F5] outline-none focus:border-[#e4c577]"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Live Commission Price Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="rounded-[28px] bg-[#171513] p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-serif text-xl text-[#FAF8F5] block" style={{ fontFamily: 'Georgia, serif' }}>Commission Estimate</span>
                  <span className="text-[10px] font-mono text-[#A8A196]">Live Database Schedule</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-1 rounded-full font-mono font-semibold">
                  Proof Guaranteed
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs text-[#A8A196] font-light">
                <div className="flex justify-between">
                  <span>Canvas Scale:</span>
                  <span className="font-mono text-[#FAF8F5] font-semibold">
                    {selectedSize.name} ({selectedSize.dimensions} in)
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Selected Subjects:</span>
                  <span className="font-mono text-[#FAF8F5] font-semibold">
                    {subjectCount} {subjectCount === 1 ? 'Subject' : 'Subjects'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Artistic Medium:</span>
                  <span className="font-mono text-[#FAF8F5] font-medium">{selectedMedium.label}</span>
                </div>

                <div className="flex justify-between">
                  <span>Museum Hardwood Matting:</span>
                  <span className="font-mono text-[#FAF8F5] font-medium">
                    {includeFrame ? '+$75 USD' : 'Unframed Sheet'}
                  </span>
                </div>
              </div>

              {/* Total Price Display */}
              <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A8A196] block font-mono">
                    Total Acquisition
                  </span>
                  <span className="text-xs text-[#A8A196] font-light">Guaranteed proof sign-off</span>
                </div>
                <span className="text-3xl sm:text-4xl font-serif text-[#e4c577] font-normal" style={{ fontFamily: 'Georgia, serif' }}>
                  ${totalPrice} <span className="text-xs font-sans text-[#A8A196] font-normal">USD</span>
                </span>
              </div>

              {/* Inline Error Banner */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-3">
                  <Info className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleSubmitCommission}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !isSubmitting
                    ? 'bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] hover:brightness-110 shadow-[0_12px_28px_-8px_rgba(228,197,119,0.35)]'
                    : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10 shadow-none'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#0A0908]" />
                    <span>Uploading & Registering...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Commission Request</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0A0908]" />
                  </>
                )}
              </button>

              <div className="pt-2 space-y-2.5 border-t border-white/10 text-[11px] text-[#A8A196] font-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% digital proof approval before shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#e4c577] shrink-0" />
                  <span>Direct atelier contact: info@sketchstudiox.com</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic Pricing Table Section */}
        <PricingTableSection />

      </div>
    </div>
  );
}