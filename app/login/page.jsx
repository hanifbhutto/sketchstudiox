'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Mail, ShieldCheck, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const isRegister = activeTab === 'register';

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push('/account');
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center">
      
      {/* Studio Ambient Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,163,72,0.08)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full p-8 sm:p-10 rounded-[32px] bg-white border border-[#E5DFD7] shadow-[0_20px_60px_-15px_rgba(212,163,72,0.15)] relative z-10 space-y-7"
      >
        {/* 1. Logo, Title & Description */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C29B38] to-[#E5BF65] text-[#0A0908] flex items-center justify-center mx-auto font-serif text-lg font-bold shadow-md">
            X
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#C29B38] font-semibold block">
              Private Patron Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
              {isRegister ? 'Join the Atelier Circle' : 'Collector Sign In'}
            </h1>
          </div>

          <p className="text-xs text-[#867E74] font-light leading-relaxed max-w-xs mx-auto">
            {isRegister
              ? 'Register your patron credentials to archive digital certificates and track custom portrait commissions.'
              : 'Sign in with your collector credentials to inspect active drawings and view authenticated ledger records.'}
          </p>
        </div>

        {/* 2. Modern Pill Switcher Tabs */}
        <div className="p-1 rounded-full bg-[#FAF8F3] border border-[#E5DFD7] grid grid-cols-2 gap-1 relative">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`relative py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 z-10 flex items-center justify-center cursor-pointer ${
              !isRegister ? 'text-[#0A0908] font-bold' : 'text-[#867E74] hover:text-[#1A1A1A]'
            }`}
          >
            {!isRegister && (
              <motion.div
                layoutId="activeAuthTab"
                className="absolute inset-0 bg-white rounded-full shadow-xs border border-amber-900/10"
                transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              />
            )}
            <span className="relative z-10">Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`relative py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 z-10 flex items-center justify-center cursor-pointer ${
              isRegister ? 'text-[#0A0908] font-bold' : 'text-[#867E74] hover:text-[#1A1A1A]'
            }`}
          >
            {isRegister && (
              <motion.div
                layoutId="activeAuthTab"
                className="absolute inset-0 bg-white rounded-full shadow-xs border border-amber-900/10"
                transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              />
            )}
            <span className="relative z-10">Register</span>
          </button>
        </div>

        {/* 3. Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-1.5 overflow-hidden"
              >
                <label className="text-[10px] uppercase tracking-wider font-mono text-[#867E74] block">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    required={isRegister}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Eleanor Vance"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38] transition-colors pl-10"
                  />
                  <User className="w-4 h-4 text-[#867E74] absolute left-3.5 pointer-events-none" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-mono text-[#867E74] block">
              Collector Email
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="collector@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38] transition-colors pl-10"
              />
              <Mail className="w-4 h-4 text-[#867E74] absolute left-3.5 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-wider font-mono text-[#867E74] block">
                Security Passcode
              </label>
              {!isRegister && (
                <button
                  type="button"
                  className="text-[10px] font-mono text-[#C29B38] hover:text-[#1A1A1A] transition-colors"
                >
                  Forgot Key?
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs font-mono text-[#1A1A1A] outline-none focus:border-[#C29B38] transition-colors pl-10"
              />
              <Lock className="w-4 h-4 text-[#867E74] absolute left-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(212,163,72,0.35)] flex items-center justify-center gap-2 cursor-pointer mt-3"
          >
            {loading ? (
              <span className="font-mono animate-pulse">Authenticating Ledger...</span>
            ) : (
              <>
                <span>{isRegister ? 'Complete Patron Registration' : 'Access Private Vault'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Security Safeguard */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-center gap-2 text-[10px] text-[#867E74] font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted 256-Bit Patron Ledger</span>
        </div>
      </motion.div>
    </div>
  );
}