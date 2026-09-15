'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2,
  Building2,
  Globe2,
  Loader2
} from 'lucide-react';

const INQUIRY_TYPES = [
  'Custom Portrait Commission (People)',
  'Bespoke Pet & Animal Portrait',
  'Original Gallery Vault Acquisition',
  'Multi-Subject Heirloom (Up to 10 Subjects)',
  'Private Atelier Consultation'
];

export default function ContactContent() {
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [submitted, setSubmitted] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  
  // Live Studio Settings State
  const [studioInfo, setStudioInfo] = useState({
    studioEmail: 'info@sketchstudiox.com',
    companyName: 'SKETCH X STUDIO LTD',
    companyNumber: '17429707',
    incorporationJurisdiction: 'England and Wales (UK)',
    turnaroundDays: '7 - 14 Business Days',
    acceptingCommissions: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Fetch live studio settings from database API on load
  useEffect(() => {
    async function fetchStudioSettings() {
      try {
        setLoadingSettings(true);
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data && !data.error) {
          setStudioInfo({
            studioEmail: data.studioEmail || 'info@sketchstudiox.com',
            companyName: data.companyName || 'SKETCH X STUDIO LTD',
            companyNumber: data.companyNumber || '17429707',
            incorporationJurisdiction: data.incorporationJurisdiction || 'England and Wales (UK)',
            turnaroundDays: data.turnaroundDays || '7 - 14 Business Days',
            acceptingCommissions: data.acceptingCommissions ?? true,
          });
        }
      } catch (err) {
        console.error('Failed to load contact studio settings', err);
      } finally {
        setLoadingSettings(false);
      }
    }
    fetchStudioSettings();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Persist inquiry into local storage for Admin Concierge Desk
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('ssx_concierge_inquiries') || '[]');
      const newInquiry = {
        id: `INQ-${Date.now().toString().slice(-4)}`,
        type: inquiryType,
        ...formData,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Unread'
      };
      localStorage.setItem('ssx_concierge_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));
    } catch (err) {
      console.error('Storage error', err);
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Studio Ambient Glows */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.08)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 backdrop-blur-md text-[#e4c577] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#e4c577]" />
            <span>Client Concierge & Private Inquiries</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal text-[#FAF8F5] tracking-tight leading-[1.04]" style={{ fontFamily: 'Georgia, serif' }}>
            Connect directly with <br />
            <span className="italic font-light text-[#e4c577]">
              our atelier desk.
            </span>
          </h1>

          <p className="text-[#A8A196] font-light text-base sm:text-lg leading-relaxed pt-1">
            Whether inquiring about custom people & pet portraits, acquiring certified originals, or arranging a multi-subject family heirloom, our studio desk responds within 24 business hours.
          </p>
        </div>

        {/* Main Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Studio Information & Credentials */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="p-8 rounded-[32px] bg-[#171513] border border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)] space-y-6">
              <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal" style={{ fontFamily: 'Georgia, serif' }}>
                Direct Channels
              </h3>

              {loadingSettings ? (
                <div className="py-10 flex items-center justify-center gap-2 text-xs font-mono text-[#A8A196]">
                  <Loader2 className="w-5 h-5 animate-spin text-[#e4c577]" />
                  <span>Loading live studio credentials...</span>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  
                  {/* Official Email */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-[#171513] border border-[#e4c577]/30 flex items-center justify-center text-[#e4c577] shrink-0 shadow-2xs">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8A196]">Official Communications</span>
                      <a href={`mailto:${studioInfo.studioEmail}`} className="text-sm font-mono text-[#FAF8F5] font-bold hover:text-[#e4c577] block transition-colors">
                        {studioInfo.studioEmail}
                      </a>
                      <p className="text-[11px] text-[#A8A196] font-light">Direct desk for commissions, previews & client care</p>
                    </div>
                  </div>

                  {/* UK Registration Credentials */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-[#171513] border border-[#e4c577]/30 flex items-center justify-center text-[#e4c577] shrink-0 shadow-2xs">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8A196]">Corporate Entity</span>
                      <p className="text-sm font-serif text-[#FAF8F5] font-bold" style={{ fontFamily: 'Georgia, serif' }}>{studioInfo.companyName}</p>
                      <p className="text-[11px] text-[#A8A196] font-mono">Company Number: {studioInfo.companyNumber}</p>
                      <p className="text-[11px] text-[#A8A196] font-light">Registered in {studioInfo.incorporationJurisdiction}</p>
                    </div>
                  </div>

                  {/* Freight & Worldwide Delivery */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-[#171513] border border-[#e4c577]/30 flex items-center justify-center text-[#e4c577] shrink-0 shadow-2xs">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8A196]">Global Fulfillment</span>
                      <p className="text-sm font-mono text-[#FAF8F5] font-semibold">Worldwide Tracked Delivery</p>
                      <p className="text-[11px] text-[#A8A196] font-light">Insured transit with wax-sealed Certificate of Authenticity</p>
                    </div>
                  </div>

                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#A8A196]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#e4c577]" />
                  24-Hour Curator Window
                </span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {studioInfo.acceptingCommissions ? 'Easel Active' : 'Easel Paused'}
                </span>
              </div>
            </div>

            {/* Privacy & Photo Confidentiality Guarantee */}
            <div className="p-6 rounded-[28px] bg-[#171513] border border-[#e4c577]/30 text-white space-y-3 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,rgba(228,197,119,0.15)_0%,transparent_70%)] pointer-events-none" />
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono text-[#e4c577]">
                <ShieldCheck className="w-4 h-4" />
                <span>Strict Photo Confidentiality</span>
              </div>
              <p className="text-xs text-[#A8A196] font-light leading-relaxed">
                All uploaded family portraits, pet reference photos, and personal memories submitted to {studioInfo.companyName} remain strictly confidential and are never shared publicly without explicit written consent.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Concierge Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-[32px] bg-[#171513] border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]">
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#e4c577] font-semibold">
                      Transmission Received
                    </span>
                    <h3 className="font-serif text-3xl text-[#FAF8F5] font-normal" style={{ fontFamily: 'Georgia, serif' }}>
                      Thank you, {formData.name || 'Patron'}.
                    </h3>
                    <p className="text-xs text-[#A8A196] font-light max-w-md mx-auto leading-relaxed">
                      Your inquiry regarding <strong className="text-[#FAF8F5]">{inquiryType}</strong> has been received by our studio curator. We will reply to <span className="font-mono text-[#FAF8F5] font-medium">{formData.email}</span> within 24 business hours.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs uppercase tracking-widest font-mono font-semibold hover:brightness-110 transition-all cursor-pointer"
                  >
                    <span>Send Another Transmission</span>
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Inquiry Topic Picker */}
                  <div className="space-y-2.5">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-[#A8A196] font-mono font-semibold block">
                      Nature of Inquiry
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {INQUIRY_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setInquiryType(type)}
                          className={`p-3 rounded-xl border text-[11px] font-mono text-left transition-all cursor-pointer ${
                            inquiryType === type
                              ? 'border-[#e4c577] bg-[#e4c577]/10 text-[#FAF8F5] font-medium ring-1 ring-[#e4c577]/40 shadow-2xs'
                              : 'border-white/10 bg-black/40 text-[#A8A196] hover:border-[#e4c577]/50 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-mono text-[#A8A196] block">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Lady Eleanor Vance"
                        className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#FAF8F5] outline-none focus:border-[#e4c577] transition-colors placeholder:text-white/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-mono text-[#A8A196] block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eleanor@example.co.uk"
                        className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#FAF8F5] outline-none focus:border-[#e4c577] transition-colors placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-[#A8A196] block">Telephone / WhatsApp (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7000 000000"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#FAF8F5] outline-none focus:border-[#e4c577] transition-colors placeholder:text-white/30"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-[#A8A196] block">Commission Scope & Directives *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details: subject count (Person/Pet), target size (e.g. A3 or 20x30 in), preferred medium (Charcoal, Graphite, or Colored Pencil), and any desired composition timeline..."
                      className="w-full p-4 rounded-xl bg-black/50 border border-white/10 text-xs text-[#FAF8F5] outline-none focus:border-[#e4c577] transition-colors placeholder:text-white/30"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Transmit Concierge Inquiry</span>
                    <Send className="w-3.5 h-3.5 text-[#0A0908] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <p className="text-center text-[10px] text-[#A8A196] font-mono">
                    Official UK Registered Atelier ({studioInfo.companyNumber}) &bull; Encrypted Desk Dispatch
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}