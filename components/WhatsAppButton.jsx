'use client';

import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';

export default function WhatsAppButton() {
  const [whatsappConfig, setWhatsappConfig] = useState({
    enabled: false,
    number: '',
    siteName: 'Sketch X Studio'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data && !data.error) {
          setWhatsappConfig({
            enabled: data.whatsappEnabled ?? false,
            number: data.whatsappNumber || '',
            siteName: data.companyName || 'Sketch X Studio'
          });
        }
      } catch (err) {
        console.error('Failed to load WhatsApp configuration', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  // Agar widget disabled hai, number missing hai, ya load ho raha hai toh render na karein
  if (loading || !whatsappConfig.enabled || !whatsappConfig.number) {
    return null;
  }

  const cleanNumber = whatsappConfig.number.toString().replace(/\D/g, '');
  const defaultMsg = encodeURIComponent(`Hello ${whatsappConfig.siteName}! I need some help regarding the platform.`);

  return (
    <div className='whatsAppFixedFloatButton fixed md:bottom-10! md:right-6! bottom-10! right-6! z-[55]!'>
      <a 
        href={`https://wa.me/${cleanNumber}?text=${defaultMsg}`} 
        target='_blank' 
        rel="noopener noreferrer"
        className="flex items-center no-underline group"
      >
        <div className="bg-white py-1 px-2 text-[12px] font-medium rounded-lg mr-3 text-slate-700 shadow-md border border-slate-100 hidden sm:block">
          Need Help? Contact Us
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#2db742] animate-ping opacity-25"></div>
          <div className="relative rounded-full bg-[#2db742] p-3 flex items-center justify-center text-white shadow-[0_10px_25px_rgba(45,183,66,0.4)] transition-transform group-hover:scale-110">
            <FaWhatsapp className="text-[30px]" />
          </div>
        </div>
      </a>
    </div>
  );
}