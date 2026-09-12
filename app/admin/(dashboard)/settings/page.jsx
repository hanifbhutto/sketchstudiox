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
  CircleDot,
  UploadCloud,
  Trash2,
  Loader2
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
  logoUrl: '',
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Fetch live settings from database on load
  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data && !data.error) {
          setSettings({
            studioEmail: data.studioEmail || DEFAULT_SETTINGS.studioEmail,
            companyName: data.companyName || DEFAULT_SETTINGS.companyName,
            companyNumber: data.companyNumber || DEFAULT_SETTINGS.companyNumber,
            incorporationJurisdiction: data.incorporationJurisdiction || DEFAULT_SETTINGS.incorporationJurisdiction,
            currency: data.currency || DEFAULT_SETTINGS.currency,
            paypalClientId: data.paypalClientId || DEFAULT_SETTINGS.paypalClientId,
            paypalEnv: data.paypalEnv || DEFAULT_SETTINGS.paypalEnv,
            turnaroundDays: data.turnaroundDays || DEFAULT_SETTINGS.turnaroundDays,
            acceptingCommissions: data.acceptingCommissions ?? DEFAULT_SETTINGS.acceptingCommissions,
            autoConfirmOrders: data.autoConfirmOrders ?? DEFAULT_SETTINGS.autoConfirmOrders,
            logoUrl: data.logoUrl || '',
          });
        }
      } catch (err) {
        console.error('Failed to load settings from database', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Logo File Upload (converts to base64 for database storage or direct URL)
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings((prev) => ({ ...prev, logoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setSettings((prev) => ({ ...prev, logoUrl: '' }));
  };

  // Save to Database API
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save settings');

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Save error:', err);
      alert('Could not synchronize settings with database.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (confirm('Restore baseline factory configurations for Sketch X Studio Ltd?')) {
      setSettings(DEFAULT_SETTINGS);
      try {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(DEFAULT_SETTINGS),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (err) {
        console.error('Reset error:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#867E74]">
        <Loader2 className="w-6 h-6 animate-spin text-[#C29B38]" />
        <span>Loading atelier governance settings...</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5DFD7] pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C29B38] font-semibold flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#C29B38]" />
            Atelier Governance &bull; Database Synchronized
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">Studio Configuration</h1>
          <p className="text-xs text-[#867E74] font-light">
            Manage legal entities, studio logo, automated notification endpoints, PayPal gateway keys, and studio capacity.
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
          
          {/* Studio Brand Logo Management */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E5DFD7] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-base text-[#1A1A1A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C29B38]" />
                <span>Atelier Brand Seal & Logo</span>
              </h3>
              <span className="text-[10px] font-mono text-[#867E74]">Header & Certificate Watermark</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD7] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                {settings.logoUrl ? (
                  <img src={settings.logoUrl} alt="Studio Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-serif text-xl font-bold text-[#C29B38]">X</span>
                )}
              </div>

              <div className="flex-1 space-y-3 w-full">
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors cursor-pointer inline-flex items-center gap-2">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload New Logo</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>

                  {settings.logoUrl && (
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="px-3 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-[#867E74] font-light">
                  Recommended: Square transparent PNG or high-res vector mark (min 200×200px).
                </p>
              </div>
            </div>
          </div>

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
              disabled={saving}
              className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#C29B38] transition-colors cursor-pointer flex items-center justify-center gap-2 font-bold shadow-xs disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C29B38]" />
                  <span>Synchronizing...</span>
                </>
              ) : saved ? (
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