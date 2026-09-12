'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X, Loader2, ShieldAlert } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Item',
  itemIdentifier = '',
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop Overlay with Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={loading ? undefined : onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-white rounded-3xl border border-[#E5DFD7] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10 select-none overflow-hidden"
        >
          {/* Subtle Ambient Red/Gold Tone Accent */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon & Heading */}
          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 shadow-xs">
              <AlertTriangle className="w-7 h-7 stroke-[1.8]" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose-600 font-bold flex items-center justify-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Irreversible Database Action
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                Confirm Permanent Removal
              </h3>
            </div>

            <p className="text-xs text-[#736B63] leading-relaxed font-sans max-w-xs">
              Are you certain you want to purge{' '}
              <span className="font-mono font-semibold text-[#1A1A1A] bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                {itemIdentifier || 'this item'}
              </span>{' '}
              from the master studio repository? This record cannot be restored.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-7 pt-5 border-t border-[#E5DFD7] text-xs font-mono">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl border border-[#E5DFD7] hover:bg-stone-100 text-[#1A1A1A] transition-colors cursor-pointer disabled:opacity-50 font-medium"
            >
              Retain Record
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm shadow-rose-600/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Purging...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Confirm Delete</span>
                </>
              )}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}