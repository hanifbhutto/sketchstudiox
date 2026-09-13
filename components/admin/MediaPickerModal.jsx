'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, UploadCloud, Check, Loader2, FolderOpen, Copy, ExternalLink, Trash2 } from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function MediaPickerModal({ isOpen, onClose, onSelect }) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data.success) {
        setMediaList(data.data);
      }
    } catch (error) {
      console.error('Error fetching media library:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
      setSelectedItem(null);
      setCopiedId(null);
      setDeleteTarget(null);
    }
  }, [isOpen]);

  // Handle direct file upload inside picker modal
  const handleDirectUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'sketchstudio_preset';
      formData.append('upload_preset', uploadPreset);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'oeullaft';
      
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const cloudinaryData = await res.json();

      if (cloudinaryData.secure_url) {
        const dbRes = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            publicId: cloudinaryData.public_id,
            secureUrl: cloudinaryData.secure_url,
            filename: file.name,
          }),
        });
        const dbData = await dbRes.json();
        
        const savedMedia = dbData.data || dbData;

        if (savedMedia) {
          await fetchMedia();
          setSelectedItem(savedMedia);
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  // Trigger Delete Modal
  const handleTriggerDelete = (e, item) => {
    e.stopPropagation();
    setDeleteTarget(item);
  };

  // Confirm delete handler using custom DeleteConfirmModal
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/media/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');

      setMediaList((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      if (selectedItem?.id === deleteTarget.id) {
        setSelectedItem(null);
      }
      setDeleteTarget(null);
    } catch (err) {
      alert('Could not delete media from database.');
      fetchMedia();
    } finally {
      setIsDeleting(false);
    }
  };

  // Copy URL to Clipboard with Green Badge Feedback
  const handleCopyUrl = (e, item) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.secureUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleConfirmSelection = () => {
    if (selectedItem) {
      onSelect(selectedItem);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-[32px] p-6 sm:p-8 max-w-3xl w-full border border-[#E5DFD7] shadow-2xl space-y-6 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-start border-b border-[#E5DFD7] pb-4 shrink-0">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C29B38] font-bold">
                Atelier Vault Selector
              </span>
              <h3 className="font-serif text-2xl text-[#1A1A1A] mt-1">Select Asset from Media Vault</h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-xl hover:bg-stone-100 cursor-pointer text-stone-400 hover:text-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Upload New Asset Bar Inside Modal */}
          <div className="flex items-center justify-between bg-[#FAF8F3] p-4 rounded-2xl border border-[#E5DFD7] shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-[#686057]">
              <FolderOpen className="w-4 h-4 text-[#C29B38]" />
              <span>Need a new asset? Upload directly to vault:</span>
            </div>

            <label className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#C29B38] text-white text-xs font-mono uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs">
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload New Image</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleDirectUpload} className="hidden" disabled={uploading} />
            </label>
          </div>

          {/* Media Grid */}
          <div className="flex-1 overflow-y-auto min-h-[300px] max-h-[45vh] pr-1">
            {loading ? (
              <div className="p-16 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#867E74]">
                <Loader2 className="w-6 h-6 animate-spin text-[#C29B38]" />
                <span>Accessing vault records...</span>
              </div>
            ) : mediaList.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-[#E5DFD7] rounded-2xl bg-[#FAF8F3]/40 text-xs font-mono text-[#867E74]">
                No media found in vault. Upload an image above to begin.
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {mediaList.map((item) => {
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedItem(item)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-stone-100 group ${
                        isSelected ? 'border-[#C29B38] ring-2 ring-[#C29B38]/30 scale-[0.98]' : 'border-[#E5DFD7] hover:border-stone-400'
                      }`}
                    >
                      <Image src={item.secureUrl} alt={item.filename || 'Asset'} fill className="object-cover" />
                      
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#C29B38]/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                          <div className="w-7 h-7 rounded-full bg-[#C29B38] text-white flex items-center justify-center shadow-md">
                            <Check className="w-4 h-4" />
                          </div>
                        </div>
                      )}

                      {/* Hover Actions (Copy URL, View, Delete) */}
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 p-2">
                        <button
                          type="button"
                          onClick={(e) => handleCopyUrl(e, item)}
                          className="p-1.5 rounded-lg bg-white text-stone-900 hover:bg-[#C29B38] hover:text-white transition-colors cursor-pointer shadow-md"
                          title="Copy Image URL"
                        >
                          {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <a
                          href={item.secureUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg bg-white text-stone-900 hover:bg-[#C29B38] hover:text-white transition-colors cursor-pointer shadow-md"
                          title="View Full Image"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={(e) => handleTriggerDelete(e, item)}
                          className="p-1.5 rounded-lg bg-white text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer shadow-md"
                          title="Delete Asset"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {copiedId === item.id && (
                        <div className="absolute top-2 inset-x-2 bg-emerald-600 text-white text-[9px] font-mono py-0.5 rounded text-center shadow-md animate-in fade-in">
                          URL Copied!
                        </div>
                      )}

                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white font-mono truncate px-1.5 py-1">
                        {item.filename || 'Untitled'}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#E5DFD7] shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-[#E5DFD7] rounded-xl text-xs font-mono uppercase tracking-wider text-[#1A1A1A] hover:bg-[#FAF8F3] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmSelection}
              disabled={!selectedItem}
              className="px-5 py-2.5 bg-[#1A1A1A] text-white rounded-xl text-xs font-mono uppercase tracking-widest hover:bg-[#C29B38] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-bold shadow-xs"
            >
              Confirm & Select Asset
            </button>
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        itemIdentifier={deleteTarget ? `"${deleteTarget.filename || 'Asset'}" (${deleteTarget.id})` : ''}
        loading={isDeleting}
      />
    </>
  );
}