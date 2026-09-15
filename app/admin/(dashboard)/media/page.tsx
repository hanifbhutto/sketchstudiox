'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  X, 
  FolderOpen, 
  UploadCloud, 
  Loader2,
  Trash2,
  RefreshCw,
  Copy,
  ExternalLink,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import DeleteConfirmModal from '../../../../components/admin/DeleteConfirmModal';

interface MediaItem {
  id: string;
  secureUrl: string;
  filename: string;
  createdAt: string;
}

interface PreviewFile {
  file: File;
  previewUrl: string;
}

const ITEMS_PER_PAGE = 10;

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Multiple files with preview state
  const [selectedPreviews, setSelectedPreviews] = useState<PreviewFile[]>([]);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Copied URL Feedback State
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Database se media fetch karna
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data.success) {
        setMediaList(data.data);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Handle File Selection & Generate Square Previews
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPreviews: PreviewFile[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setSelectedPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove single image from preview list
  const handleRemovePreview = (index: number) => {
    setSelectedPreviews((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].previewUrl);
      updated.splice(index, 1);
      return updated;
    });
  };

  // Multiple files upload handling
  const handleUploadAll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPreviews.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < selectedPreviews.length; i++) {
        const { file } = selectedPreviews[i];
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
          await fetch('/api/media', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              publicId: cloudinaryData.public_id,
              secureUrl: cloudinaryData.secure_url,
              filename: file.name,
            }),
          });
        }
      }

      // Cleanup
      selectedPreviews.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      setSelectedPreviews([]);
      setShowModal(false);
      fetchMedia();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Error uploading files to cloud or database.');
    } finally {
      setUploading(false);
    }
  };

  // Copy Image URL to Clipboard
  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.secureUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Confirm delete handler
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/media/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');

      setMediaList((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      alert('Could not delete media from database.');
      fetchMedia();
    } finally {
      setIsDeleting(false);
    }
  };

  // Pagination Calculations
  const totalPages = Math.ceil(mediaList.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = mediaList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-8 text-[#FAF8F5]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#e4c577] font-semibold flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5 text-[#e4c577]" />
            Atelier Asset Vault
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]" style={{ fontFamily: 'Georgia, serif' }}>Media Manager Library</h1>
          <p className="text-xs text-[#A8A196] font-light">
            Central repository for Cloudinary image assets and direct database references.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={fetchMedia}
            className="p-2.5 rounded-full border border-white/10 text-[#A8A196] hover:text-[#FAF8F5] hover:bg-white/5 transition-colors cursor-pointer"
            title="Reload library"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#e4c577]' : ''}`} />
          </button>

          <button 
            onClick={() => { setSelectedPreviews([]); setShowModal(true); }} 
            className="px-5 py-3 rounded-full bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] text-xs font-mono uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer font-bold shadow-md"
          >
            <Plus className="w-4 h-4 text-[#0A0908]" />
            <span>Add Media</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid with Hover Actions & Pagination */}
      <div className="rounded-[32px] bg-[#171513] border border-white/10 shadow-xl p-6 sm:p-8 space-y-6">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 text-xs font-mono text-[#A8A196]">
            <Loader2 className="w-6 h-6 animate-spin text-[#e4c577]" />
            <span>Accessing asset vault...</span>
          </div>
        ) : mediaList.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-white/20 rounded-3xl bg-black/40">
            <FolderOpen className="w-8 h-8 text-[#e4c577] mx-auto mb-3 opacity-60" />
            <p className="text-xs font-mono text-[#FAF8F5] font-semibold">No media assets found.</p>
            <p className="text-xs font-mono text-[#A8A196] mt-1">Click "Add Media" to upload your first image asset.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentItems.map((item) => (
                <div key={item.id} className="border border-white/10 rounded-2xl overflow-hidden bg-[#171513] shadow-md hover:border-[#e4c577]/50 transition group flex flex-col justify-between">
                  <div className="aspect-square relative bg-stone-900 overflow-hidden">
                    <Image
                      src={item.secureUrl}
                      alt={item.filename || 'Media asset'}
                      fill
                      sizes="200px"
                      className="object-cover group-hover:scale-105 transition duration-300 contrast-110"
                    />
                    
                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-2">
                      <button
                        onClick={() => handleCopyUrl(item)}
                        className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-[#e4c577] hover:text-[#0A0908] transition-colors cursor-pointer shadow-md"
                        title="Copy Image URL"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <a
                        href={item.secureUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-[#e4c577] hover:text-[#0A0908] transition-colors cursor-pointer shadow-md"
                        title="View Full Image"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer shadow-md"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {copiedId === item.id && (
                      <div className="absolute top-2 inset-x-2 bg-emerald-500 text-white text-[9px] font-mono py-0.5 rounded text-center shadow-md animate-in fade-in">
                        URL Copied!
                      </div>
                    )}
                  </div>

                  <div className="p-3 border-t border-white/10 bg-black/40">
                    <span className="text-[10px] font-mono truncate text-[#FAF8F5] font-medium block" title={item.filename}>
                      {item.filename || 'Untitled'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-[#A8A196]">
                <span>
                  Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, mediaList.length)} of {mediaList.length} assets
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-white/10 bg-black/40 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1 text-[#FAF8F5]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  <span className="px-3 py-1 bg-black/40 border border-white/10 rounded-xl text-[#FAF8F5] font-bold">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-white/10 bg-black/40 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1 text-[#FAF8F5]"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Smooth Animated Upload Modal with Square Previews */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#171513] text-[#FAF8F5] rounded-[32px] p-6 sm:p-10 max-w-lg w-full border border-white/15 shadow-2xl space-y-6 my-8"
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#e4c577] font-bold">
                    Cloudinary Batch Stream
                  </span>
                  <h3 className="font-serif text-2xl text-[#FAF8F5] mt-1" style={{ fontFamily: 'Georgia, serif' }}>Upload Multiple Media Assets</h3>
                </div>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="p-2 rounded-xl hover:bg-white/10 cursor-pointer text-stone-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadAll} className="space-y-6 text-xs font-mono">
                <div className="space-y-4">
                  {/* Dropzone */}
                  <label className="border-2 border-dashed border-white/20 hover:border-[#e4c577]/60 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/40 group relative">
                    <UploadCloud className="w-6 h-6 text-[#e4c577] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs uppercase tracking-wider text-[#FAF8F5] font-semibold text-center">
                      Click to browse or drag & drop images
                    </span>
                    <span className="text-[10px] text-[#A8A196] mt-0.5">Select single or multiple files</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </label>

                  {/* Square Previews Grid Below */}
                  {selectedPreviews.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#A8A196]">
                        <span>Selected Queue ({selectedPreviews.length} files)</span>
                        <button
                          type="button"
                          onClick={() => setSelectedPreviews([])}
                          className="text-rose-400 hover:underline cursor-pointer"
                        >
                          Clear All
                        </button>
                      </div>

                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-48 overflow-y-auto p-2 bg-black/50 rounded-2xl border border-white/10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {selectedPreviews.map((item, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-stone-900 group shadow-xs">
                            <img src={item.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemovePreview(idx)}
                              className="absolute top-1 right-1 bg-black/80 hover:bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              title="Remove"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-[#FAF8F5] truncate px-1 py-0.5">
                              {item.file.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedPreviews([]);
                    }}
                    disabled={uploading}
                    className="px-4 py-2.5 border border-white/15 bg-white/5 rounded-xl text-xs font-mono uppercase tracking-wider text-[#FAF8F5] hover:bg-white/10 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={selectedPreviews.length === 0 || uploading}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#e4c577] to-[#cfae59] text-[#0A0908] rounded-xl text-xs font-mono uppercase tracking-widest hover:brightness-110 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 font-bold shadow-md"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0A0908]" />
                        <span>Uploading Files...</span>
                      </>
                    ) : (
                      <span>Upload {selectedPreviews.length > 0 ? `(${selectedPreviews.length})` : ''} Files</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Standalone Reusable Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        itemIdentifier={deleteTarget ? `"${deleteTarget.filename || 'Asset'}" (${deleteTarget.id})` : ''}
        loading={isDeleting}
      />

    </div>
  );
}