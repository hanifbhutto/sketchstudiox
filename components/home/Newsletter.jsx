'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Mail, Sparkles, Shield, Clock, Bell, Award } from 'lucide-react';

const PREFERENCES = [
  { id: 'all', label: 'All Curations & Originals' },
  { id: 'commissions', label: 'Custom Easel Slots' },
  { id: 'pets', label: 'Pet & Portrait Releases' }
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [preference, setPreference] = useState('all');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Persist subscriber dynamically for Admin Console / Ingestion
    try {
      const existing = JSON.parse(localStorage.getItem('ssx_patron_subscribers') || '[]');
      const newSubscriber = {
        email,
        preference,
        date: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem('ssx_patron_subscribers', JSON.stringify([newSubscriber, ...existing]));
    } catch (err) {
      console.error('Storage error', err);
    }

    setSubscribed(true);
  };

  return (
    <section className="relative py-24 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#0A0908] text-[#FAF8F5] border-t border-white/10 overflow-hidden">
      
      {/* Animated Breathing Ambient Glows */}
      <motion.div 
        animate={{ scale: [1, 1.06, 1], opacity: [0.1, 0.16, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] sm:w-[650px] h-[300px] sm:h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.14)_0%,transparent_70%)] blur-[100px] sm:blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-1/4 w-[250px] sm:w-[550px] h-[250px] sm:h-[450px] bg-[radial-gradient(ellipse_at_bottom,rgba(228,197,119,0.08)_0%,transparent_70%)] blur-[110px] sm:blur-[130px] pointer-events-none" 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Deep Obsidian Dark Box with Smooth Scroll Entry Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="rounded-[28px] sm:rounded-[36px] bg-[#171513] border border-[#e4c577]/30 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] overflow-hidden relative"
        >
          
          {/* Subtle Internal Gold Sheen */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[radial-gradient(circle,rgba(228,197,119,0.12)_0%,transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            
            {/* Left Column: Atelier Narrative & VIP Privileges */}
            <div className="lg:col-span-6 p-6 sm:p-14 lg:border-r border-white/10 flex flex-col justify-between space-y-8">
              
              <div className="space-y-4">
                {/* Gold Live Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e4c577]/30 bg-[#e4c577]/10 backdrop-blur-md text-[#e4c577] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e4c577] animate-pulse" />
                  <span>Private Studio Register</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF8F5] tracking-tight leading-[1.12] sm:leading-[1.08]" style={{ fontFamily: 'Georgia, serif' }}>
                  Be first to witness <br />
                  <span className="italic font-light text-[#e4c577]">
                    new originals & drops.
                  </span>
                </h2>

                <p className="text-[#A8A196] font-light text-sm sm:text-base leading-relaxed max-w-md">
                  We render only a limited number of master originals and bespoke portrait commissions each quarter. Registered patrons receive private preview catalogs 48 hours prior to public release.
                </p>
              </div>

              {/* Collector Privileges List */}
              <div className="space-y-3.5 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-xs text-[#FAF8F5]/90">
                  <div className="w-6 h-6 rounded-full bg-[#e4c577]/15 border border-[#e4c577]/30 flex items-center justify-center text-[#e4c577] shrink-0">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span>Priority booking for bespoke monthly portrait & pet commissions</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#FAF8F5]/90">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-3 h-3" />
                  </div>
                  <span>48-hour advance access to curated original drawings & drops</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#FAF8F5]/90">
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#FAF8F5] shrink-0">
                    <Shield className="w-3 h-3" />
                  </div>
                  <span>Zero marketing spam &bull; strictly exhibition and slot dispatches</span>
                </div>
              </div>

            </div>

            {/* Right Column: Dark Registration Form */}
            <div className="lg:col-span-6 p-6 sm:p-14 bg-black/40 flex flex-col justify-center">
              
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.04] rounded-3xl p-8 border border-[#e4c577]/40 shadow-sm text-center space-y-3.5 backdrop-blur-md"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal" style={{ fontFamily: 'Georgia, serif' }}>
                    Welcome to the Atelier Circle
                  </h3>
                  <p className="text-xs text-[#A8A196] font-light max-w-sm mx-auto leading-relaxed">
                    A private transmission confirmation has been logged for <span className="font-mono text-[#e4c577] font-medium">{email}</span>. You will receive exclusive preview access ahead of public vault releases.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Preferences Picker */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-[#A8A196] font-mono font-semibold block">
                      Dispatch Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {PREFERENCES.map((pref) => (
                        <button
                          key={pref.id}
                          type="button"
                          onClick={() => setPreference(pref.id)}
                          className={`py-2 px-2 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all duration-300 text-center border cursor-pointer ${
                            preference === pref.id
                              ? 'bg-[#FAF8F5] text-[#0A0908] border-white font-bold shadow-xs'
                              : 'bg-white/[0.04] text-[#A8A196] border-white/10 hover:border-[#e4c577]/50 hover:text-[#FAF8F5]'
                          }`}
                        >
                          {pref.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input and Action Button */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-[#A8A196] font-mono font-semibold block">
                      Collector Contact
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-white/[0.05] border border-white/15 focus-within:border-[#e4c577] focus-within:ring-2 focus-within:ring-[#e4c577]/20 transition-all shadow-inner backdrop-blur-md">
                      <div className="flex items-center gap-2.5 w-full px-3.5">
                        <Mail className="w-4 h-4 text-[#e4c577] shrink-0" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="collector@domain.com"
                          required
                          className="w-full py-2.5 text-xs text-[#FAF8F5] bg-transparent outline-none placeholder:text-[#686057] font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all duration-300 shrink-0 shadow-lg group cursor-pointer"
                      >
                        <span>Request Access</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Micro Footer Guarantee */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#A8A196] pt-1 font-light">
                    <span className="flex items-center gap-1.5 font-mono text-[10px]">
                      <Bell className="w-3 h-3 text-[#e4c577]" />
                      Strictly maximum 1 bulletin / month
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#e4c577] font-mono font-medium">
                      Encrypted &bull; UK 17429707
                    </span>
                  </div>

                </form>
              )}

            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}