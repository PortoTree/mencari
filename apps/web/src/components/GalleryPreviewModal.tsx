"use client";

import React, { useState, useEffect } from "react";

interface GalleryPreviewModalProps {
  isOpen: boolean;
  mediaItems: string[];
  initialIdx: number;
  onClose: () => void;
}

export default function GalleryPreviewModal({ isOpen, mediaItems, initialIdx, onClose }: GalleryPreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIdx);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIdx);
    }
  }, [isOpen, initialIdx]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, mediaItems.length, onClose]);

  if (!isOpen || !mediaItems || mediaItems.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200 cursor-zoom-out"
      onClick={onClose}
    >
      <div className="relative flex items-center justify-center w-full h-full max-w-[1200px]">
        {mediaItems.length > 1 && (
          <button 
            onClick={handlePrev} 
            className="absolute left-2 md:left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer z-10 backdrop-blur-sm"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        <img 
          src={mediaItems[currentIndex]} 
          alt={`Full Preview ${currentIndex + 1}`} 
          className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl transition-transform select-none"
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />

        {mediaItems.length > 1 && (
          <button 
            onClick={handleNext} 
            className="absolute right-2 md:right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer z-10 backdrop-blur-sm"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 md:top-8 md:right-8 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer z-10 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {mediaItems.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium z-10 tracking-wide border border-white/10">
            {currentIndex + 1} / {mediaItems.length}
          </div>
        )}
      </div>
    </div>
  );
}
