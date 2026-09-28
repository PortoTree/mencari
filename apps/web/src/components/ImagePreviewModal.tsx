import React from "react";

interface ImagePreviewModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

export default function ImagePreviewModal({ isOpen, imageSrc, onClose }: ImagePreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200 cursor-zoom-out"
      onClick={onClose}
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <img 
          src={imageSrc} 
          alt="Full Preview" 
          className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        <button 
          onClick={onClose} 
          className="absolute -top-12 right-0 md:-right-12 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
