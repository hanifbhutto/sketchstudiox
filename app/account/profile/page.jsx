'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [patronEmail, setPatronEmail] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('patronEmail');
    if (!savedEmail) return;
    setPatronEmail(savedEmail);

    async function fetchProfile() {
      try {
        const res = await fetch(`/api/auth/profile?email=${encodeURIComponent(savedEmail)}`);
        const data = await res.json();
        if (res.ok && data.user) {
          setProfileData({
            name: data.user.name || '',
            phone: data.user.phone || '',
            address: data.user.address || '',
            city: data.user.city || '',
            country: data.user.country || '',
          });
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    }
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: patronEmail, ...profileData }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Patron profile updated securely.');
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        alert(data.error || 'Failed to update profile.');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Network error while saving profile.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 sm:p-10 rounded-[28px] bg-white border border-[#E5DFD7] space-y-6 shadow-xs"
    >
      <div className="space-y-1">
        <h2 className="font-serif text-2xl text-[#1A1A1A]">Patron Credentials & Address</h2>
        <p className="text-xs text-[#867E74]">Update your contact details and archival shipping destination.</p>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-mono text-[#867E74] block">Full Name</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-mono text-[#867E74] block">Registered Email (Read-only)</label>
          <input
            type="email"
            disabled
            value={patronEmail}
            className="w-full px-4 py-3 rounded-xl bg-stone-100 border border-[#E5DFD7] text-xs text-stone-500 font-mono cursor-not-allowed"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-mono text-[#867E74] block">Phone Number</label>
          <input
            type="text"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            placeholder="+44 20 7946 0912"
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-stone-500 outline-none focus:border-[#C29B38]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-mono text-[#867E74] block">Address</label>
          <textarea
            rows={2}
            value={profileData.address}
            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
            placeholder="Street address, apartment, suite..."
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38] resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-mono text-[#867E74] block">City</label>
            <input
              type="text"
              value={profileData.city}
              onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
              placeholder="Enter City"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-mono text-[#867E74] block">Country</label>
            <input
              type="text"
              value={profileData.country}
              onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
              placeholder="Enter Country"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD7] text-xs text-[#1A1A1A] outline-none focus:border-[#C29B38]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={updating}
          className="w-full py-4 rounded-xl bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C29B38] transition-all cursor-pointer mt-4"
        >
          {updating ? 'Saving Records...' : 'Save Profile Changes'}
        </button>
      </form>
    </motion.div>
  );
}