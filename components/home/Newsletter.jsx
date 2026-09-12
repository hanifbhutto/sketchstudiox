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
    <section className="relative py-28 px-6 sm:px-10 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#F5F2EC] border-t border-amber-900/10 overflow-hidden">
      
      {/* Soft Ambient Studio Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-tr from-amber-400/10 via-rose-300/6 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[450px] bg-gradient-to-bl from-indigo-500/8 via-amber-300/5 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Deep Obsidian Dark Box with Gold Accents */}
        <div className="rounded-[36px] bg-[#0E0C0A] border border-[#D4A348]/25 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative">
          
          {/* Subtle Internal Gold Sheen */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[radial-gradient(circle,rgba(212,163,72,0.12)_0%,transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            
            {/* Left Column: Atelier Narrative & VIP Privileges */}
            <div className="lg:col-span-6 p-8 sm:p-14 lg:border-r border-white/10 flex flex-col justify-between space-y-8">
              
              <div className="space-y-4">
                {/* Gold Live Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4A348]/30 bg-[#D4A348]/10 backdrop-blur-md text-[#E5BF65] text-[10px] uppercase tracking-[0.25em] font-mono font-semibold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A348] animate-pulse" />
                  <span>Private Studio Register</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#FAF8F5] tracking-tight leading-[1.08]">
                  Be first to witness <br />
                  <span className="font-serif italic font-normal bg-gradient-to-r from-[#E5BF65] via-[#D4A348] to-[#B88728] bg-clip-text text-transparent">
                    new originals & drops.
                  </span>
                </h2>

                <p className="text-[#A8A196] font-light text-sm sm:text-base leading-relaxed max-w-md">
                  We render only a limited number of master originals and bespoke portrait commissions each quarter. Registered patrons receive private preview catalogs 48 hours prior to public release.
                </p>
              </div>

              {/* Collector Privileges List */}
              <div className="space-y-3.5 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-xs text-[#DDD8CE]">
                  <div className="w-6 h-6 rounded-full bg-[#D4A348]/15 border border-[#D4A348]/30 flex items-center justify-center text-[#E5BF65] shrink-0">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span>Priority booking for bespoke monthly portrait & pet commissions</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#DDD8CE]">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-3 h-3" />
                  </div>
                  <span>48-hour advance access to curated original drawings & drops</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#DDD8CE]">
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#FAF8F5] shrink-0">
                    <Shield className="w-3 h-3" />
                  </div>
                  <span>Zero marketing spam &bull; strictly exhibition and slot dispatches</span>
                </div>
              </div>

            </div>

            {/* Right Column: Dark Registration Form */}
            <div className="lg:col-span-6 p-8 sm:p-14 bg-black/40 flex flex-col justify-center">
              
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.04] rounded-3xl p-8 border border-[#D4A348]/40 shadow-sm text-center space-y-3.5 backdrop-blur-md"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal">
                    Welcome to the Atelier Circle
                  </h3>
                  <p className="text-xs text-[#A8A196] font-light max-w-sm mx-auto leading-relaxed">
                    A private transmission confirmation has been logged for <span className="font-mono text-[#E5BF65] font-medium">{email}</span>. You will receive exclusive preview access ahead of public vault releases.
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
                              : 'bg-white/[0.04] text-[#A8A196] border-white/10 hover:border-[#D4A348]/50 hover:text-[#FAF8F5]'
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
                    <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-white/[0.05] border border-white/15 focus-within:border-[#D4A348] focus-within:ring-2 focus-within:ring-[#D4A348]/20 transition-all shadow-inner backdrop-blur-md">
                      <div className="flex items-center gap-2.5 w-full px-3.5">
                        <Mail className="w-4 h-4 text-[#C29B38] shrink-0" />
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
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4A348] to-[#C29B38] text-[#0A0908] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all duration-300 shrink-0 shadow-lg group cursor-pointer"
                      >
                        <span>Request Access</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Micro Footer Guarantee */}
                  <div className="flex items-center justify-between text-[11px] text-[#A8A196] pt-1 font-light">
                    <span className="flex items-center gap-1.5 font-mono text-[10px]">
                      <Bell className="w-3 h-3 text-[#D4A348]" />
                      Strictly maximum 1 bulletin / month
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#E5BF65] font-mono font-medium">
                      Encrypted &bull; UK 17429707
                    </span>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}