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
          className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-[#171513] text-[#FAF8F5] rounded-[32px] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 select-none overflow-hidden"
        >
          {/* Subtle Ambient Tone Accent */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-5 right-5 p-2 rounded-xl text-[#A8A196] hover:text-[#FAF8F5] hover:bg-white/10 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon & Heading */}
          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 shadow-xs">
              <AlertTriangle className="w-7 h-7 stroke-[1.8]" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose-400 font-bold flex items-center justify-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Irreversible Database Action
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>
                Confirm Permanent Removal
              </h3>
            </div>

            <p className="text-xs text-[#A8A196] leading-relaxed font-sans max-w-xs">
              Are you certain you want to purge{' '}
              <span className="font-mono font-semibold text-[#FAF8F5] bg-black/50 px-1.5 py-0.5 rounded border border-white/10">
                {itemIdentifier || 'this item'}
              </span>{' '}
              from the master studio repository? This record cannot be restored.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-7 pt-5 border-t border-white/10 text-xs font-mono">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-[#FAF8F5] transition-colors cursor-pointer disabled:opacity-50 font-medium"
            >
              Retain Record
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-rose-600/30 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
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