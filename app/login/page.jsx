'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Mail, ShieldCheck, User, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function LoginPage() {
  const router = useRouter();
  const { syncUserCartAfterLogin } = useCart();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Live validation states
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const isRegister = activeTab === 'register';

  // Real-time validation checks
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 6;
  const isNameValid = !isRegister || formData.name.trim().length >= 2;

  const isFormValid = isEmailValid && isPasswordValid && isNameValid;

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Authentication failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      if (isRegister) {
        setSuccessMessage('Registration successful! Please sign in with your credentials.');
        setActiveTab('login');
        setFormData({ name: '', email: formData.email, password: '' });
        setTouched({ name: false, email: false, password: false });
        setLoading(false);
      } else {
        // Login Success
        localStorage.setItem('patronEmail', formData.email);
        
        // Agar aapki login API user object / id return karti hai (misal ke tor par data.user.id ya data.id):
        if (data.user?.id) {
          localStorage.setItem('userId', data.user.id);
          // Guest cart ko user ke sath sync aur replace karne ke liye call karein:
          await syncUserCartAfterLogin(data.user.id);
        }

        router.push('/account');
      }
    } catch (err) {
      console.error('Auth Network Error:', err);
      setErrorMessage('Network connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center">
      
      {/* Studio Ambient Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,163,72,0.08)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full p-8 sm:p-10 rounded-[32px] bg-white border border-[#E5DFD7] shadow-[0_20px_60px_-15px_rgba(212,163,72,0.15)] relative z-10 space-y-6"
      >
        {/* Header */}
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

        {/* Success / Error Banners */}
        {successMessage && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-mono">
            {errorMessage}
          </motion.div>
        )}

        {/* Tabs Switcher */}
        <div className="p-1 rounded-full bg-[#FAF8F3] border border-[#E5DFD7] grid grid-cols-2 gap-1 relative">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setSuccessMessage(''); setErrorMessage(''); }}
            className={`relative py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 z-10 flex items-center justify-center cursor-pointer ${
              !isRegister ? 'text-[#0A0908] font-bold' : 'text-[#867E74] hover:text-[#1A1A1A]'
            }`}
          >
            {!isRegister && (
              <motion.div layoutId="activeAuthTab" className="absolute inset-0 bg-white rounded-full shadow-xs border border-amber-900/10" transition={{ type: 'spring', damping: 24, stiffness: 300 }} />
            )}
            <span className="relative z-10">Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('register'); setSuccessMessage(''); setErrorMessage(''); }}
            className={`relative py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 z-10 flex items-center justify-center cursor-pointer ${
              isRegister ? 'text-[#0A0908] font-bold' : 'text-[#867E74] hover:text-[#1A1A1A]'
            }`}
          >
            {isRegister && (
              <motion.div layoutId="activeAuthTab" className="absolute inset-0 bg-white rounded-full shadow-xs border border-amber-900/10" transition={{ type: 'spring', damping: 24, stiffness: 300 }} />
            )}
            <span className="relative z-10">Register</span>
          </button>
        </div>

        {/* Form with Live Validation */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {isRegister && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-1.5 overflow-hidden">
                <label className="text-[10px] uppercase tracking-wider font-mono text-[#867E74] block">Full Name</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={() => handleBlur('name')}
                    placeholder="Eleanor Vance"
                    className={`w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border text-xs text-[#1A1A1A] outline-none transition-colors pl-10 ${
                      touched.name && !isNameValid ? 'border-rose-400' : 'border-[#E5DFD7] focus:border-[#C29B38]'
                    }`}
                  />
                  <User className="w-4 h-4 text-[#867E74] absolute left-3.5 pointer-events-none" />
                </div>
                {touched.name && !isNameValid && (
                  <p className="text-[10px] text-rose-600 font-mono flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Minimum 2 characters required.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-mono text-[#867E74] block">Collector Email</label>
            <div className="relative flex items-center">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onBlur={() => handleBlur('email')}
                placeholder="collector@domain.com"
                className={`w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border text-xs text-[#1A1A1A] outline-none transition-colors pl-10 ${
                  touched.email && !isEmailValid ? 'border-rose-400' : 'border-[#E5DFD7] focus:border-[#C29B38]'
                }`}
              />
              <Mail className="w-4 h-4 text-[#867E74] absolute left-3.5 pointer-events-none" />
            </div>
            {touched.email && !isEmailValid && (
              <p className="text-[10px] text-rose-600 font-mono flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Please enter a valid email address.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-wider font-mono text-[#867E74] block">Security Passcode</label>
            </div>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onBlur={() => handleBlur('password')}
                placeholder="••••••••••••"
                className={`w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border text-xs font-mono text-[#1A1A1A] outline-none transition-colors pl-10 pr-10 ${
                  touched.password && !isPasswordValid ? 'border-rose-400' : 'border-[#E5DFD7] focus:border-[#C29B38]'
                }`}
              />
              <Lock className="w-4 h-4 text-[#867E74] absolute left-3.5 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-[#867E74] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {touched.password && !isPasswordValid && (
              <p className="text-[10px] text-rose-600 font-mono flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Password must be at least 6 characters.
              </p>
            )}
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`w-full py-4 rounded-2xl text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2 mt-3 ${
              !isFormValid 
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed' 
                : 'bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C29B38] shadow-[0_12px_28px_-8px_rgba(212,163,72,0.35)] cursor-pointer'
            }`}
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