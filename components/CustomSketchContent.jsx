'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  MapPin
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

  // Local Preview Handler (Does NOT upload to Cloudinary yet)
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

  // Commission Submission Handler: Uploads image & creates order on successful submit
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
      // Step 1: Upload image to Cloudinary ONLY upon successful submission attempt
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

      // Step 2: Create Commission Order with permanent Cloudinary URL
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
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden">
      
      {/* 300 GSM Cotton Paper Texture */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-multiply pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#C29B38 0.75px, transparent 0.75px), radial-gradient(#1A1A1A 0.5px, #FAF8F5 0.5px)`,
          backgroundSize: '24px 24px, 12px 12px',
          backgroundPosition: '0 0, 6px 6px'
        }}
      />

      {/* Atmospheric Atelier Glows */}
      <div className="absolute top-20 left-10 w-[600px] h-[450px] bg-gradient-to-tr from-[#D4A348]/15 via-rose-300/5 to-transparent blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-20 right-10 w-[550px] h-[500px] bg-gradient-to-bl from-stone-900/10 via-[#D4A348]/12 to-transparent blur-[140px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4A348]/40 bg-[#D4A348]/10 backdrop-blur-md text-[#8C6415] text-[10px] uppercase tracking-[0.22em] font-mono font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
              <span>Official Live Atelier Rate Card</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5DFD7] text-[10px] font-mono text-[#867E74]">
              <Building2 className="w-3 h-3 text-[#C29B38]" />
              <span>SKETCH X STUDIO LTD &bull; UK No: 17429707</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-[1.08]">
            Commission your <br />
            <span className="italic font-light bg-gradient-to-r from-[#D4A348] via-[#B88728] to-[#8C6415] bg-clip-text text-transparent">
              bespoke heirloom portrait.
            </span>
          </h1>

          <p className="text-[#686057] font-light text-sm sm:text-base leading-relaxed">
            Every portrait is 100% hand-drawn from your reference photo (people or pets) on archival French cotton substrate. Select canvas format and number of subjects to compute live database pricing.
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
                  Reference Photo (Person or Pet) <span className="text-rose-600">*</span>
                </span>
                <span className="text-[11px] text-[#867E74] font-mono">JPG, PNG up to 25MB</span>
              </div>

              {!previewUrl ? (
                <label className="border-2 border-dashed border-[#E5DFD7] hover:border-[#C29B38] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#FAF8F3]/60 group">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E5DFD7] flex items-center justify-center text-[#8C6415] group-hover:scale-105 group-hover:bg-[#1A1A1A] group-hover:text-white transition-all shadow-2xs mb-3">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#1A1A1A] font-medium font-mono">
                    Click or Drag to Upload Reference Photo
                  </span>
                  <span className="text-[11px] text-[#867E74] mt-1 font-light text-center max-w-sm">
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
                <div className="relative rounded-2xl overflow-hidden border border-[#E5DFD7] bg-[#FAF8F3] p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                      <img src={previewUrl} alt="Reference Preview" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#1A1A1A] truncate max-w-[200px] sm:max-w-xs">
                        {fileName}
                      </p>
                      <span className="text-[10px] text-emerald-700 uppercase tracking-wider font-mono flex items-center gap-1 mt-0.5">
                        <Check className="w-3 h-3" /> Ready for Cloudinary Submission
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-2.5 rounded-xl hover:bg-white text-zinc-400 hover:text-rose-600 transition-colors mr-1 cursor-pointer"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Dimensions & Canvas Scale */}
            <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E5DFD7] shadow-[0_12px_35px_-10px_rgba(212,163,72,0.08)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-[#FAF8F5] flex items-center justify-center text-[10px]">2</span>
                  Canvas Dimensions
                </span>
                <span className="text-[11px] text-[#867E74] font-mono">Select Format</span>
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
                          ? 'border-[#C29B38] bg-[#FAF8F3] shadow-xs ring-1 ring-[#C29B38]/40'
                          : 'border-[#E5DFD7] bg-white hover:border-[#D4A348]/60'
                      }`}
                    >
                      {size.popular && (
                        <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-[#D4A348] to-[#C29B38] text-[#0A0908] text-[9px] uppercase tracking-widest font-mono font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                          Atelier Popular
                        </span>
                      )}
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-mono text-xs font-bold text-[#1A1A1A]">
                          {size.name} <span className="text-[11px] text-[#867E74] font-normal">({size.dimensions} in)</span>
                        </h3>
                        <span className="font-mono text-xs text-[#8C6415] font-bold">
                          From ${startingPrice}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#686057] font-light mt-1.5 leading-snug">{size.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Subjects Count */}
            <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E5DFD7] shadow-[0_12px_35px_-10px_rgba(212,163,72,0.08)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-[#FAF8F5] flex items-center justify-center text-[10px]">3</span>
                  Number of Subjects (Person or Pet)
                </span>
                <span className="text-[11px] text-[#867E74] font-mono">
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
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FAF8F5] shadow-xs font-bold ring-2 ring-[#D4A348]/40'
                          : isAvailable
                          ? 'border-[#E5DFD7] bg-white text-[#1A1A1A] hover:border-[#C29B38] cursor-pointer'
                          : 'border-stone-100 bg-stone-50 text-stone-300 cursor-not-allowed opacity-40'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Medium & Custom Directives */}
            <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E5DFD7] shadow-[0_12px_35px_-10px_rgba(212,163,72,0.08)] space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-[#FAF8F5] flex items-center justify-center text-[10px]">4</span>
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
                          ? 'border-[#C29B38] bg-[#FAF8F3] ring-1 ring-[#C29B38]/40 shadow-xs'
                          : 'border-[#E5DFD7] bg-white hover:border-[#D4A348]/60'
                      }`}
                    >
                      <h4 className="font-serif text-sm font-normal text-[#1A1A1A]">{med.label}</h4>
                      <p className="text-[10px] text-[#686057] leading-snug mt-1">{med.desc}</p>
                      <span className="text-[10px] font-mono text-emerald-700 block mt-2">
                        Included in Rate
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Museum Framing Addon */}
              <div className="pt-4 border-t border-[#E5DFD7] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] font-mono">
                    Museum Mat & Solid Hardwood Frame
                  </h4>
                  <p className="text-[11px] text-[#686057] font-light mt-0.5">
                    Acid-free bevel mat board, anti-glare museum acrylic, and sealed dust backing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIncludeFrame(!includeFrame)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer shrink-0 ${
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

              {/* Special Directives */}
              <div className="space-y-2 pt-2 border-t border-[#E5DFD7]">
                <label className="text-xs uppercase tracking-wider text-[#867E74] font-mono block">
                  Composition Directives & Special Requests (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Combine faces from two separate photos, remove sunglasses, soften background shadows..."
                  rows={3}
                  className="w-full p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38] transition-colors placeholder:text-[#A8A196]"
                />
              </div>

            </div>

            {/* Step 5: Delivery & Recipient Details (Mandatory) */}
            <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E5DFD7] shadow-[0_12px_35px_-10px_rgba(212,163,72,0.08)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-[#FAF8F5] flex items-center justify-center text-[10px]">5</span>
                  Delivery & Recipient Details <span className="text-rose-600">*</span>
                </span>
                <span className="text-[11px] text-[#867E74] font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C29B38]" /> Secure Courier
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-[#867E74]">Full Name <span className="text-rose-600">*</span></label>
                  <input
                    type="text"
                    required
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    placeholder="e.g. Iftikhar Hassan"
                    className="w-full p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-[#867E74]">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7000 000000"
                    className="w-full p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-[#867E74]">Street Address <span className="text-rose-600">*</span></label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 123 Gallery Way, Suite 4B"
                    className="w-full p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-[#867E74]">City <span className="text-rose-600">*</span></label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. London"
                    className="w-full p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-[#867E74]">Postal Code <span className="text-rose-600">*</span></label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. SW1A 1AA"
                    className="w-full p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38]"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Live Commission Price Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="rounded-[28px] bg-white p-6 sm:p-8 border border-[#E5DFD7] shadow-[0_20px_50px_-15px_rgba(212,163,72,0.15)] space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#E5DFD7] pb-4">
                <div>
                  <span className="font-serif text-xl text-[#1A1A1A] block">Commission Estimate</span>
                  <span className="text-[10px] font-mono text-[#867E74]">Live Database Schedule</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full font-mono font-semibold">
                  Proof Guaranteed
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs text-[#686057] font-light">
                <div className="flex justify-between">
                  <span>Canvas Scale:</span>
                  <span className="font-mono text-[#1A1A1A] font-semibold">
                    {selectedSize.name} ({selectedSize.dimensions} in)
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Selected Subjects:</span>
                  <span className="font-mono text-[#1A1A1A] font-semibold">
                    {subjectCount} {subjectCount === 1 ? 'Subject' : 'Subjects'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Artistic Medium:</span>
                  <span className="font-mono text-[#1A1A1A] font-medium">{selectedMedium.label}</span>
                </div>

                <div className="flex justify-between">
                  <span>Museum Hardwood Matting:</span>
                  <span className="font-mono text-[#1A1A1A] font-medium">
                    {includeFrame ? '+$75 USD' : 'Unframed Sheet'}
                  </span>
                </div>
              </div>

              {/* Total Price Display */}
              <div className="pt-4 border-t border-[#E5DFD7] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#867E74] block font-mono">
                    Total Acquisition
                  </span>
                  <span className="text-xs text-[#686057] font-light">Guaranteed proof sign-off</span>
                </div>
                <span className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal">
                  ${totalPrice} <span className="text-xs font-sans text-[#867E74] font-normal">USD</span>
                </span>
              </div>

              {/* Inline Error Banner */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-3">
                  <Info className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleSubmitCommission}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  !isSubmitting
                    ? 'bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C29B38] shadow-[0_12px_28px_-8px_rgba(212,163,72,0.35)]'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300 shadow-none'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading & Registering...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Commission Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="pt-2 space-y-2.5 border-t border-[#E5DFD7] text-[11px] text-[#686057] font-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% digital proof approval before shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#8C6415] shrink-0" />
                  <span>Direct atelier contact: info@sketchstudiox.com</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic Pricing Table Section */}
        <PricingTableSection />

      </div>

      {/* SUCCESS MODAL POPUP */}
      {submittedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/65 backdrop-blur-xs px-4">
          <div className="max-w-md w-full p-8 rounded-[32px] bg-white border border-[#E5DFD7] shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-bold">
                Atelier Intake Registered
              </span>
              <h2 className="font-serif text-2xl text-[#1A1A1A]">
                Commission Confirmed
              </h2>
              <p className="text-xs text-[#686057] font-light leading-relaxed">
                Reference Number <strong className="font-mono text-[#1A1A1A]">{submittedOrder.orderNumber}</strong> has been securely logged with verified delivery details and permanent Cloudinary photo reference.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7] font-mono text-xs text-[#867E74]">
              <p>Redirecting to your commission tracker in <span className="text-[#C29B38] font-bold text-sm">{countdown}s</span>...</p>
            </div>

            <a
              href={`/account/commissions/${submittedOrder.orderId}`}
              className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors block font-bold text-center"
            >
              View Commission Tracker Now
            </a>
          </div>
        </div>
      )}

    </div>
  );
}