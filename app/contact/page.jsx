'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

const INQUIRY_TYPES = [
  'Custom Portrait Commission',
  'Original Artwork Acquisition',
  'Exhibition & Gallery Representation',
  'Private Appointment'
];

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden">
      
      {/* Studio Ambient Glows */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(212,163,72,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[600px] h-[500px] bg-gradient-to-bl from-indigo-500/5 via-amber-300/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D4A348]/30 bg-[#D4A348]/10 backdrop-blur-md text-[#8C6415] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>Client Concierge & Private Inquiries</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal text-[#1A1A1A] tracking-tight leading-[1.04]">
            Connect directly with <br />
            <span className="italic font-light bg-gradient-to-r from-[#D4A348] via-[#B88728] to-[#8C6415] bg-clip-text text-transparent">
              our atelier studio.
            </span>
          </h1>

          <p className="text-[#686057] font-light text-base sm:text-lg leading-relaxed pt-1">
            Whether you seek a multi-figure heirloom commission, original exhibition acquisition, or private consultation, our atelier team responds within 24 business hours.
          </p>
        </div>

        {/* Main Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Studio Information & Guarantees */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Atelier Information Card */}
            <div className="p-8 rounded-[32px] bg-white border border-[#E5DFD7] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] space-y-6">
              <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal">
                Direct Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7]/70">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#D4A348]/30 flex items-center justify-center text-[#C29B38] shrink-0 shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#867E74]">Concierge Dispatch</span>
                    <p className="text-sm font-mono text-[#1A1A1A] font-medium">concierge@sketchstudiox.com</p>
                    <p className="text-[11px] text-[#867E74] font-light">Direct desk of the lead studio curator</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7]/70">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#D4A348]/30 flex items-center justify-center text-[#C29B38] shrink-0 shadow-2xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#867E74]">Private Client Line</span>
                    <p className="text-sm font-mono text-[#1A1A1A] font-medium">+1 (800) 842-7890</p>
                    <p className="text-[11px] text-[#867E74] font-light">Mon &ndash; Fri, 9:00 AM &ndash; 6:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7]/70">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#D4A348]/30 flex items-center justify-center text-[#C29B38] shrink-0 shadow-2xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#867E74]">Physical Atelier</span>
                    <p className="text-sm font-serif text-[#1A1A1A]">Sketch Studio X Atelier</p>
                    <p className="text-[11px] text-[#867E74] font-light">454 West Broadway, SoHo, New York, NY 10012</p>
                  </div>
                </div>
              </div>

              {/* Atelier Commitment */}
              <div className="pt-4 border-t border-[#E5DFD7] flex items-center justify-between text-[11px] font-mono text-[#736B63]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C29B38]" />
                  24hr Response Window
                </span>
                <span className="text-emerald-700 font-medium">Studio Active</span>
              </div>
            </div>

            {/* Privacy & Provenance Guarantee Badge */}
            <div className="p-6 rounded-[28px] bg-[#0E0C0A] border border-[#D4A348]/30 text-white space-y-3 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,rgba(212,163,72,0.15)_0%,transparent_70%)] pointer-events-none" />
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono text-[#D4A348]">
                <ShieldCheck className="w-4 h-4" />
                <span>Confidential Patron Privilege</span>
              </div>
              <p className="text-xs text-[#A8A196] font-light leading-relaxed">
                All family photographs, personal milestones, and commissioned portrait references sent to the atelier remain strictly confidential and are deleted after archive sign-off.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Concierge Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-[32px] bg-white border border-[#E5DFD7] shadow-[0_20px_50px_-15px_rgba(212,163,72,0.1)]">
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#C29B38] font-semibold">
                      Transmission Received
                    </span>
                    <h3 className="font-serif text-3xl text-[#1A1A1A] font-normal">
                      Thank you, {formData.name || 'Collector'}.
                    </h3>
                    <p className="text-xs text-[#686057] font-light max-w-md mx-auto leading-relaxed">
                      Your inquiry has been routed to our studio curator. We will review your directive and reply to <span className="font-mono text-[#1A1A1A] font-medium">{formData.email}</span> within 24 hours.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-mono font-medium hover:bg-[#C29B38] transition-all"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Inquiry Topic Picker */}
                  <div className="space-y-2.5">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-[#867E74] font-mono font-semibold block">
                      Nature of Inquiry
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {INQUIRY_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setInquiryType(type)}
                          className={`p-3 rounded-xl border text-[11px] font-mono text-left transition-all ${
                            inquiryType === type
                              ? 'border-[#C29B38] bg-[#FAF8F3] text-[#1A1A1A] font-medium ring-1 ring-[#C29B38]/30 shadow-2xs'
                              : 'border-[#E5DFD7] bg-white text-[#736B63] hover:border-amber-400'
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
                      <label className="text-[10px] uppercase tracking-wider font-mono text-[#867E74] block">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Marcus Sterling"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-mono text-[#867E74] block">Collector Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@domain.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-[#867E74] block">Direct Telephone (Optional for WhatsApp updates)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-mono text-[#867E74] block">Project Scope & Directive Details</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share your vision: subject description, target dimensions, desired timeline, or any specific requests regarding reference photos..."
                      className="w-full p-4 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38] transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(212,163,72,0.35)] flex items-center justify-center gap-2 group"
                  >
                    <span>Transmit Concierge Inquiry</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <p className="text-center text-[10px] text-[#867E74] font-mono">
                    Protected by 256-bit encrypted transmission &bull; Zero marketing solicitation
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