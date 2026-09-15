'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Palette
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  // Live validation rules
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email.trim());
  const isPasswordValid = password.length >= 8;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isEmailValid || !isPasswordValid) return;

    setLoading(true);
    setServerError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication credentials failed.');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0A0908] text-[#FAF8F5] flex items-center justify-center p-4 overflow-hidden selection:bg-[#e4c577] selection:text-black">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(228,197,119,0.06)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Glass Card Container matching website atelier aesthetic */}
        <div className="rounded-[32px] border border-white/10 bg-[#171513]/90 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
          
          {/* Header section */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#e4c577]/20 via-[#e4c577]/10 to-transparent border border-[#e4c577]/30 flex items-center justify-center text-[#e4c577] shadow-inner">
                <Palette className="w-7 h-7 stroke-[1.75]" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#0A0908]"></span>
              </span>
            </div>
            
            <h1 className="text-2xl font-serif tracking-wide text-[#FAF8F5] font-normal" style={{ fontFamily: 'Georgia, serif' }}>
              Sketch Studio <span className="text-[#e4c577] font-sans font-semibold">X</span>
            </h1>
            <p className="text-xs tracking-wider uppercase text-[#A8A196] mt-1.5 font-mono">
              Curator & Admin Portal
            </p>
          </div>

          {/* Server Error Notification */}
          {serverError && (
            <div className="mb-6 flex items-start gap-3 p-3.5 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-[#FAF8F5]">Curator Email</label>
                {touched.email && (
                  <span className={`text-[11px] font-medium transition-colors ${isEmailValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isEmailValid ? 'Valid email' : 'Valid email required'}
                  </span>
                )}
              </div>

              <div className="relative group">
                <Mail className="w-4 h-4 text-[#A8A196] absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#e4c577] transition-colors pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="admin@sketchstudiox.com"
                  className={`w-full bg-black/50 border rounded-xl pl-10 pr-10 py-3 text-sm text-[#FAF8F5] placeholder-white/30 focus:outline-none transition-all duration-200 ${
                    touched.email && !isEmailValid
                      ? 'border-rose-400 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30'
                      : touched.email && isEmailValid
                      ? 'border-emerald-400/50 focus:border-emerald-400'
                      : 'border-white/10 focus:border-[#e4c577] focus:ring-1 focus:ring-[#e4c577]/20'
                  }`}
                />
                {touched.email && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    {isEmailValid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-[#FAF8F5]">Access Key</label>
                {touched.password && (
                  <span className={`text-[11px] font-medium transition-colors ${isPasswordValid ? 'text-emerald-400' : 'text-[#A8A196]'}`}>
                    {isPasswordValid ? 'Strong key' : 'Min. 8 characters'}
                  </span>
                )}
              </div>

              <div className="relative group">
                <Lock className="w-4 h-4 text-[#A8A196] absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#e4c577] transition-colors pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••••••"
                  className={`w-full bg-black/50 border rounded-xl pl-10 pr-11 py-3 text-sm text-[#FAF8F5] placeholder-white/30 focus:outline-none transition-all duration-200 ${
                    touched.password && !isPasswordValid
                      ? 'border-white/20 focus:border-[#e4c577]'
                      : touched.password && isPasswordValid
                      ? 'border-emerald-400/50 focus:border-emerald-400'
                      : 'border-white/10 focus:border-[#e4c577] focus:ring-1 focus:ring-[#e4c577]/20'
                  }`}
                />
                
                {/* Show/Hide password toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A196] hover:text-[#FAF8F5] transition-colors p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] p-[1px] font-medium shadow-lg shadow-[#e4c577]/10 transition-all duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <div className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] px-4 text-[#0A0908] font-semibold transition-colors">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#0A0908]" />
                    <span className="text-xs uppercase tracking-wider font-mono">Verifying Vault Access...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">Authorize Entry</span>
                    <ArrowRight className="w-4 h-4 text-[#0A0908] group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Footer security badge */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-[#A8A196] font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e4c577]" />
            <span>End-to-End Encrypted Studio Vault</span>
          </div>

        </div>
      </div>
    </div>
  );
}