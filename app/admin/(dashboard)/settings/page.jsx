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
  Loader2,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin
} from 'lucide-react';
import MediaPickerModal from '../../../../components/admin/MediaPickerModal';

const DEFAULT_SETTINGS = {
  studioEmail: 'info@sketchstudiox.com',
  companyName: 'SKETCH X STUDIO LTD',
  companyNumber: '17429707',
  incorporationJurisdiction: 'England and Wales (UK)',
  currency: 'USD',
  paypalClientId: 'sb-client-id-sample-token-ssx',
  paypalClientSecret: '',
  paypalEnv: 'sandbox',
  paypalEnabled: true,
  turnaroundDays: '7 - 14 Business Days',
  acceptingCommissions: true,
  autoConfirmOrders: true,
  logoUrl: '',
  logoMediaId: null,
  proprietorName: '',
  proprietorEmail: '',
  proprietorPhone: '',
  proprietorAddress: '',
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Show/Hide Password State for PayPal Secret
  const [showSecret, setShowSecret] = useState(false);

  // Media Picker Modal State for Logo
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  // Fetch live settings from database on load
  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data && !data.error) {
          setSettings((prev) => ({
            ...prev,
            studioEmail: data.studioEmail || prev.studioEmail,
            companyName: data.companyName || prev.companyName,
            companyNumber: data.companyNumber || prev.companyNumber,
            incorporationJurisdiction: data.incorporationJurisdiction || prev.incorporationJurisdiction,
            currency: data.currency || prev.currency,
            paypalClientId: data.paypalClientId || prev.paypalClientId,
            paypalClientSecret: data.paypalClientSecret || prev.paypalClientSecret,
            paypalEnv: data.paypalEnv || prev.paypalEnv,
            paypalEnabled: data.paypalEnabled ?? prev.paypalEnabled,
            turnaroundDays: data.turnaroundDays || prev.turnaroundDays,
            acceptingCommissions: data.acceptingCommissions ?? prev.acceptingCommissions,
            autoConfirmOrders: data.autoConfirmOrders ?? prev.autoConfirmOrders,
            logoUrl: data.logoMedia?.secureUrl || data.logoUrl || '',
            logoMediaId: data.logoMediaId || null,
            proprietorName: data.proprietorName || '',
            proprietorEmail: data.proprietorEmail || '',
            proprietorPhone: data.proprietorPhone || '',
            proprietorAddress: data.proprietorAddress || '',
          }));
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

  const removeLogo = () => {
    setSettings((prev) => ({ ...prev, logoUrl: '', logoMediaId: null }));
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
      <div className="w-full h-96 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#A8A196]">
        <Loader2 className="w-6 h-6 animate-spin text-[#e4c577]" />
        <span>Loading atelier governance settings...</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 text-[#FAF8F5]">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#e4c577] font-semibold flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#e4c577]" />
            Atelier Governance &bull; Database Synchronized
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Studio Configuration</h1>
          <p className="text-xs text-[#A8A196] font-light">
            Manage legal entities, studio logo, automated notification endpoints, PayPal gateway keys, and studio capacity.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="px-4 py-2.5 rounded-full border border-white/10 text-xs font-mono text-[#A8A196] hover:bg-white/5 hover:text-[#FAF8F5] transition-colors flex items-center gap-1.5 cursor-pointer self-start"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#e4c577]" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PRIMARY FORMS (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Studio Brand Logo Management via Media Vault */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-[#171513] border border-white/10 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-base text-[#FAF8F5] flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                <Sparkles className="w-4 h-4 text-[#e4c577]" />
                <span>Atelier Brand Seal & Logo</span>
              </h3>
              <span className="text-[10px] font-mono text-[#A8A196]">Media Vault Integration</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                {settings.logoUrl ? (
                  <img src={settings.logoUrl} alt="Studio Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-serif text-xl font-bold text-[#e4c577]" style={{ fontFamily: 'Georgia, serif' }}>X</span>
                )}
              </div>

              <div className="flex-1 space-y-3 w-full">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowMediaPicker(true)}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs font-mono uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer inline-flex items-center gap-2 font-bold shadow-md"
                  >
                    <UploadCloud className="w-3.5 h-3.5 text-[#0A0908]" />
                    <span>Select Logo from Vault</span>
                  </button>

                  {settings.logoUrl && (
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="px-3.5 py-2.5 rounded-full border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-[#A8A196] font-light">
                  Choose or upload your studio watermark directly from the centralized Media Vault repository.
                </p>
              </div>
            </div>
          </div>

          {/* UK Corporate Registration Credentials */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-[#171513] border border-white/10 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-base text-[#FAF8F5] flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                <Building2 className="w-4 h-4 text-[#e4c577]" />
                <span>UK Companies House Legal Identity</span>
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Incorporation</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[#FAF8F5] block font-semibold">Registered Entity Name</label>
                <input 
                  type="text" 
                  value={settings.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#FAF8F5] block font-semibold">Company Registration Number</label>
                <input 
                  type="text" 
                  value={settings.companyNumber}
                  onChange={(e) => handleChange('companyNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[#FAF8F5] block font-semibold">Jurisdiction & Legal Structure</label>
                <input 
                  type="text" 
                  value={settings.incorporationJurisdiction}
                  onChange={(e) => handleChange('incorporationJurisdiction', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                />
              </div>
            </div>
          </div>

          {/* Proprietor & Studio Location Details (Optional) */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-[#171513] border border-white/10 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-base text-[#FAF8F5] flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                <User className="w-4 h-4 text-[#e4c577]" />
                <span>Proprietor & Studio Location Details</span>
              </h3>
              <span className="text-[10px] font-mono text-[#A8A196]">Optional Footer Display</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[#FAF8F5] block font-semibold">Proprietor Name</label>
                <input 
                  type="text" 
                  value={settings.proprietorName}
                  onChange={(e) => handleChange('proprietorName', e.target.value)}
                  placeholder="Enter Proprietor Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#FAF8F5] block font-semibold">Proprietor Email</label>
                <input 
                  type="email" 
                  value={settings.proprietorEmail}
                  onChange={(e) => handleChange('proprietorEmail', e.target.value)}
                  placeholder="e.g. arslan@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#FAF8F5] block font-semibold">Proprietor Phone</label>
                <input 
                  type="text" 
                  value={settings.proprietorPhone}
                  onChange={(e) => handleChange('proprietorPhone', e.target.value)}
                  placeholder="e.g. 123456789"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#FAF8F5] block font-semibold">Studio Physical Address</label>
                <input 
                  type="text" 
                  value={settings.proprietorAddress}
                  onChange={(e) => handleChange('proprietorAddress', e.target.value)}
                  placeholder="e.g. Street 6, Haroonabad, 62300, Pakistan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                />
              </div>
            </div>
          </div>

          {/* Communications & Automated Mailers */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-[#171513] border border-white/10 shadow-xl space-y-4">
            <h3 className="font-serif text-base text-[#FAF8F5] flex items-center gap-2 border-b border-white/10 pb-3" style={{ fontFamily: 'Georgia, serif' }}>
              <Mail className="w-4 h-4 text-[#e4c577]" />
              <span>Communications & Collector Desk</span>
            </h3>

            <div className="space-y-1.5 text-xs font-mono">
              <label className="text-[#FAF8F5] block font-semibold">Public Studio Communications Email</label>
              <input 
                type="email" 
                value={settings.studioEmail}
                onChange={(e) => handleChange('studioEmail', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
              />
              <span className="text-[10px] text-[#A8A196] block mt-1">
                Used in digital certificates of authenticity and order confirmation dispatch emails.
              </span>
            </div>
          </div>

          {/* Live Payment Gateway (PayPal Integration) */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-[#171513] border border-white/10 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-base text-[#FAF8F5] flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                <CreditCard className="w-4 h-4 text-[#e4c577]" />
                <span>PayPal Smart Buttons Payment Gateway</span>
              </h3>

              {/* Active / Inactive Toggle Switch */}
              <label className="flex items-center gap-2 cursor-pointer bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10">
                <input 
                  type="checkbox"
                  checked={settings.paypalEnabled ?? true}
                  onChange={(e) => handleChange('paypalEnabled', e.target.checked)}
                  className="rounded accent-[#e4c577] w-3.5 h-3.5 cursor-pointer"
                />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FAF8F5]">
                  {settings.paypalEnabled ? 'Gateway Active' : 'Gateway Inactive'}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[#FAF8F5] block font-semibold">Environment Mode</label>
                <select
                  value={settings.paypalEnv}
                  onChange={(e) => handleChange('paypalEnv', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                >
                  <option value="sandbox" className="bg-[#171513] text-[#FAF8F5]">Sandbox (Testing / Demo)</option>
                  <option value="production" className="bg-[#171513] text-[#FAF8F5]">Production (Live Settlements)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#FAF8F5] block font-semibold">Settlement Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                >
                  <option value="USD" className="bg-[#171513] text-[#FAF8F5]">USD ($) - Official Flyer Currency</option>
                  <option value="GBP" className="bg-[#171513] text-[#FAF8F5]">GBP (£) - UK Sterling Base</option>
                  <option value="EUR" className="bg-[#171513] text-[#FAF8F5]">EUR (€) - European Union</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[#FAF8F5] block font-semibold">PayPal REST Client ID</label>
                <input 
                  type="text" 
                  value={settings.paypalClientId}
                  onChange={(e) => handleChange('paypalClientId', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                  placeholder="Enter PayPal Client ID"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[#FAF8F5] block font-semibold">PayPal REST Client Secret</label>
                <div className="relative flex items-center">
                  <input 
                    type={showSecret ? "text" : "password"} 
                    value={settings.paypalClientSecret || ''}
                    onChange={(e) => handleChange('paypalClientSecret', e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                    placeholder="Enter PayPal Client Secret"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 text-[#A8A196] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                    title={showSecret ? "Hide Secret" : "Show Secret"}
                  >
                    {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Lead Times */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-[#171513] border border-white/10 shadow-xl space-y-4">
            <h3 className="font-serif text-base text-[#FAF8F5] flex items-center gap-2 border-b border-white/10 pb-3" style={{ fontFamily: 'Georgia, serif' }}>
              <Sparkles className="w-4 h-4 text-[#e4c577]" />
              <span>Studio Production Lead Times</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-[#FAF8F5] block font-semibold">Estimated Fulfillment Lead Time</label>
                <input 
                  type="text" 
                  value={settings.turnaroundDays}
                  onChange={(e) => handleChange('turnaroundDays', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-[#e4c577] text-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-black/50 border border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                  <input 
                    type="checkbox"
                    checked={settings.acceptingCommissions}
                    onChange={(e) => handleChange('acceptingCommissions', e.target.checked)}
                    className="rounded accent-[#e4c577] w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[11px] text-[#FAF8F5] font-semibold">
                    Easel Open: Accepting Custom Commissions
                  </span>
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: QUICK SUMMARY & ACTIONS (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-[32px] bg-[#171513] border border-white/10 shadow-xl space-y-5 sticky top-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8A196] font-semibold">
                Deployment
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <CircleDot className="w-3 h-3 text-emerald-400 animate-pulse" /> Live Ready
              </span>
            </div>

            <p className="text-xs text-[#A8A196] font-light leading-relaxed">
              Updates to payment gateway credentials or legal information take effect across checkout and digital certificate generations immediately.
            </p>

            <button 
              type="submit" 
              disabled={saving}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] hover:brightness-110 text-[#0A0908] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 font-bold shadow-lg disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#0A0908]" />
                  <span>Synchronizing...</span>
                </>
              ) : saved ? (
                <>
                  <Check className="w-4 h-4 text-[#0A0908]" />
                  <span>Configuration Synchronized</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>

            <div className="pt-4 border-t border-white/10 space-y-2.5 text-[11px] font-mono">
              <div className="flex items-center justify-between text-[#A8A196]">
                <span>Gateway Status:</span>
                <span className={`font-bold uppercase ${settings.paypalEnabled ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {settings.paypalEnabled ? settings.paypalEnv : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#A8A196]">
                <span>Base Currency:</span>
                <span className="text-[#FAF8F5] font-bold">{settings.currency}</span>
              </div>
              <div className="flex items-center justify-between text-[#A8A196]">
                <span>Lead Time:</span>
                <span className="text-[#FAF8F5] font-bold">{settings.turnaroundDays}</span>
              </div>
              <div className="flex items-center justify-between text-[#A8A196]">
                <span>Corporate ID:</span>
                <span className="text-[#FAF8F5] font-bold">{settings.companyNumber}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 text-[10px] font-mono text-[#A8A196] flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5 text-[#e4c577] shrink-0" />
                <span>Protected by UK Companies House Registry &bull; 17429707</span>
              </div>
            </div>

          </div>

        </div>

      </form>

      {/* Media Picker Modal for Logo Selection */}
      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(mediaItem) => {
          setSettings((prev) => ({
            ...prev,
            logoUrl: mediaItem.secureUrl,
            logoMediaId: mediaItem.id,
          }));
        }}
      />

    </div>
  );
}