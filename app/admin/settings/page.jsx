'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Check, 
  Mail, 
  Building2, 
  CreditCard, 
  Sliders, 
  Sparkles,
  RotateCcw,
  Lock,
  Globe2,
  Clock,
  CircleDot
} from 'lucide-react';

const DEFAULT_SETTINGS = {
  studioEmail: 'info@sketchstudiox.com',
  companyName: 'SKETCH X STUDIO LTD',
  companyNumber: '17429707',
  incorporationJurisdiction: 'England and Wales (UK)',
  currency: 'USD',
  paypalClientId: 'sb-client-id-sample-token-ssx',
  paypalEnv: 'sandbox',
  turnaroundDays: '7 - 14 Business Days',
  acceptingCommissions: true,
  autoConfirmOrders: true,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem('ssx_studio_config');
    if (cached) {
      try {
        setSettings(JSON.parse(cached));
      } catch (err) {
        console.error('Failed to parse cached settings', err);
      }
    }
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('ssx_studio_config', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetDefaults = () => {
    if (confirm('Restore baseline factory configurations for Sketch X Studio Ltd?')) {
      setSettings(DEFAULT_SETTINGS);
      localStorage.removeItem('ssx_studio_config');
      setSaved(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5DFD7] pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-semibold flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#C29B38]" />
            Atelier Governance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">Studio Configuration</h1>
          <p className="text-xs text-[#867E74] font-light">
            Manage legal entities, automated notification endpoints, PayPal gateway keys, and studio capacity.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="px-4 py-2 rounded-full border border-[#E5DFD7] text-xs font-mono text-[#867E74] hover:bg-stone-100 hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 cursor-pointer self-start"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PRIMARY FORMS (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* UK Corporate Registration Credentials */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E5DFD7] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-base text-[#1A1A1A] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#C29B38]" />
                <span>UK Companies House Legal Identity</span>
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Incorporation</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[#1A1A1A] block font-semibold">Registered Entity Name</label>
                <input 
                  type="text" 
                  value={settings.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1A1A1A] block font-semibold">Company Registration Number</label>
                <input 
                  type="text" 
                  value={settings.companyNumber}
                  onChange={(e) => handleChange('companyNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[#1A1A1A] block font-semibold">Jurisdiction & Legal Structure</label>
                <input 
                  type="text" 
                  value={settings.incorporationJurisdiction}
                  onChange={(e) => handleChange('incorporationJurisdiction', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                />
              </div>
            </div>
          </div>

          {/* Communications & Automated Mailers */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E5DFD7] shadow-xs space-y-4">
            <h3 className="font-serif text-base text-[#1A1A1A] flex items-center gap-2 border-b border-stone-100 pb-3">
              <Mail className="w-4 h-4 text-[#C29B38]" />
              <span>Communications & Collector Desk</span>
            </h3>

            <div className="space-y-1.5 text-xs font-mono">
              <label className="text-[#1A1A1A] block font-semibold">Public Studio Communications Email</label>
              <input 
                type="email" 
                value={settings.studioEmail}
                onChange={(e) => handleChange('studioEmail', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
              />
              <span className="text-[10px] text-[#867E74] block mt-1">
                Used in digital certificates of authenticity and order confirmation dispatch emails.
              </span>
            </div>
          </div>

          {/* Live Payment Gateway (PayPal Integration) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E5DFD7] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-base text-[#1A1A1A] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#C29B38]" />
                <span>PayPal Smart Buttons Payment Gateway</span>
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-mono text-[#8C6415] bg-[#FAF8F3] px-2.5 py-0.5 rounded-full border border-[#E5DFD7]">
                <Lock className="w-3 h-3 text-[#C29B38]" /> TLS 256-bit
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[#1A1A1A] block font-semibold">Environment Mode</label>
                <select
                  value={settings.paypalEnv}
                  onChange={(e) => handleChange('paypalEnv', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                >
                  <option value="sandbox">Sandbox (Testing / Demo)</option>
                  <option value="production">Production (Live Settlements)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1A1A1A] block font-semibold">Settlement Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                >
                  <option value="USD">USD ($) - Official Flyer Currency</option>
                  <option value="GBP">GBP (£) - UK Sterling Base</option>
                  <option value="EUR">EUR (€) - European Union</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[#1A1A1A] block font-semibold">PayPal REST Client ID</label>
                <input 
                  type="text" 
                  value={settings.paypalClientId}
                  onChange={(e) => handleChange('paypalClientId', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                />
              </div>
            </div>
          </div>

          {/* Operational Lead Times */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E5DFD7] shadow-xs space-y-4">
            <h3 className="font-serif text-base text-[#1A1A1A] flex items-center gap-2 border-b border-stone-100 pb-3">
              <Sparkles className="w-4 h-4 text-[#C29B38]" />
              <span>Studio Production Lead Times</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[#1A1A1A] block font-semibold">Estimated Fulfillment Lead Time</label>
                <input 
                  type="text" 
                  value={settings.turnaroundDays}
                  onChange={(e) => handleChange('turnaroundDays', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] outline-none focus:border-[#C29B38]"
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] cursor-pointer hover:bg-stone-50 transition-colors">
                  <input 
                    type="checkbox"
                    checked={settings.acceptingCommissions}
                    onChange={(e) => handleChange('acceptingCommissions', e.target.checked)}
                    className="rounded accent-[#C29B38] w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[11px] text-[#1A1A1A] font-semibold">
                    Easel Open: Accepting Custom Commissions
                  </span>
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: QUICK SUMMARY & ACTIONS (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Action Box */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5DFD7] shadow-xs space-y-4 sticky top-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#867E74] font-semibold">
                Deployment
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600">
                <CircleDot className="w-3 h-3 text-emerald-500 animate-pulse" /> Live Ready
              </span>
            </div>

            <p className="text-xs text-[#686057] font-light leading-relaxed">
              Updates to payment gateway credentials or legal information take effect across checkout and digital certificate generations immediately.
            </p>

            <button 
              type="submit" 
              className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors cursor-pointer flex items-center justify-center gap-2 font-bold shadow-xs"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Configuration Synchronized</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>

            {/* Quick Status Pillows */}
            <div className="pt-4 border-t border-stone-100 space-y-2.5 text-[11px] font-mono">
              <div className="flex items-center justify-between text-[#867E74]">
                <span>Gateway Status:</span>
                <span className="text-[#1A1A1A] font-bold uppercase">{settings.paypalEnv}</span>
              </div>
              <div className="flex items-center justify-between text-[#867E74]">
                <span>Base Currency:</span>
                <span className="text-[#1A1A1A] font-bold">{settings.currency}</span>
              </div>
              <div className="flex items-center justify-between text-[#867E74]">
                <span>Lead Time:</span>
                <span className="text-[#1A1A1A] font-bold">{settings.turnaroundDays}</span>
              </div>
              <div className="flex items-center justify-between text-[#867E74]">
                <span>Corporate ID:</span>
                <span className="text-[#1A1A1A] font-bold">{settings.companyNumber}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100">
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-[10px] font-mono text-[#867E74] flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                <span>Protected by UK Companies House Registry &bull; 17429707</span>
              </div>
            </div>

          </div>

        </div>

      </form>

    </div>
  );
}