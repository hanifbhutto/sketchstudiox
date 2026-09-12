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
    <div className="relative min-h-screen w-full bg-zinc-950 flex items-center justify-center p-4 overflow-hidden selection:bg-amber-500 selection:text-black">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Glass Card Container */}
        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          
          {/* Header section */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600/20 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                <Palette className="w-7 h-7 stroke-[1.75]" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-zinc-950"></span>
              </span>
            </div>
            
            <h1 className="text-2xl font-serif tracking-wide text-zinc-100 font-medium">
              Sketch Studio <span className="text-amber-400 font-sans font-semibold">X</span>
            </h1>
            <p className="text-xs tracking-wider uppercase text-zinc-400 mt-1.5 font-mono">
              Curator & Admin Portal
            </p>
          </div>

          {/* Server Error Notification */}
          {serverError && (
            <div className="mb-6 flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-zinc-300">Curator Email</label>
                {touched.email && (
                  <span className={`text-[11px] font-medium transition-colors ${isEmailValid ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isEmailValid ? 'Valid email' : 'Valid email required'}
                  </span>
                )}
              </div>

              <div className="relative group">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-400 transition-colors pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="admin@sketchstudiox.com"
                  className={`w-full bg-zinc-950/70 border rounded-xl pl-10 pr-10 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-all duration-200 ${
                    touched.email && !isEmailValid
                      ? 'border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                      : touched.email && isEmailValid
                      ? 'border-emerald-500/50 focus:border-emerald-500'
                      : 'border-zinc-800 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/20'
                  }`}
                />
                {touched.email && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    {isEmailValid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-zinc-300">Access Key</label>
                {touched.password && (
                  <span className={`text-[11px] font-medium transition-colors ${isPasswordValid ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    {isPasswordValid ? 'Strong key' : 'Min. 8 characters'}
                  </span>
                )}
              </div>

              <div className="relative group">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-amber-400 transition-colors pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••••••"
                  className={`w-full bg-zinc-950/70 border rounded-xl pl-10 pr-11 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-all duration-200 ${
                    touched.password && !isPasswordValid
                      ? 'border-zinc-700 focus:border-amber-500/80'
                      : touched.password && isPasswordValid
                      ? 'border-emerald-500/50 focus:border-emerald-500'
                      : 'border-zinc-800 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/20'
                  }`}
                />
                
                {/* Show/Hide password toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
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
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 p-[1px] font-medium shadow-lg shadow-amber-500/10 transition-all duration-200 hover:shadow-amber-500/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              <div className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 text-zinc-950 font-semibold transition-colors group-hover:bg-amber-400">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs uppercase tracking-wider font-mono">Verifying Vault Access...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">Authorize Entry</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Footer security badge */}
          <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500/70" />
            <span>End-to-End Encrypted Studio Vault</span>
          </div>

        </div>
      </div>
    </div>
  );
}