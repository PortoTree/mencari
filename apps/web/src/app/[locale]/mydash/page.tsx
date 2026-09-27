"use client";
import React, { useState, useEffect, useRef } from "react";
import { flushSync, createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

const initialCollections = [
  {
    id: "c1",
    type: "collection",
    title: "Koleksi Ebook & Buku Digital",
    items: [
      { id: "i1", type: "product", title: "THE ULTIMATE BOOK FOR JOB SEEKER" },
      { id: "i2", type: "product", title: "JOB SEEKER ULTIMATE KIT" }
    ]
  },
  {
    id: "c2",
    type: "collection",
    title: "Koleksi Software & Tools",
    items: [
      {
        id: "cat1",
        type: "category",
        title: "Template & Resource",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        items: [
          { id: "i3", type: "product", title: "Starter Kit Karir — 4 Template Siap Pakai" },
          { id: "i4", type: "product", title: "Template PPT Pitch Deck Pro" }
        ]
      }
    ]
  },
  {
    id: "c3",
    type: "collection",
    title: "Webinar & Kursus",
    items: [
      { id: "i5", type: "product", title: "Masterclass CV & Interview" },
      { id: "i6", type: "product", title: "Panduan Lengkap LinkedIn" }
    ]
  },
  {
    id: "c4",
    type: "collection",
    title: "Jasa Konsultasi",
    items: [
      { id: "i7", type: "product", title: "Review CV & Portofolio 1on1" }
    ]
  }
];

function PhonePreviewMockup({ collections }: { collections: any[] }) {
  const [activeCollection, setActiveCollection] = useState<any>(null);

  return (
    <div className="w-[320px] h-[640px] mx-auto bg-white dark:bg-[#18191A] rounded-[40px] border-[8px] border-gray-800 dark:border-gray-900 shadow-xl overflow-hidden relative flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 dark:bg-gray-900 rounded-b-3xl z-20"></div>
      
      {/* Container for sliding views */}
      <div className="relative w-full h-full flex overflow-hidden hide-scrollbar bg-[#f3f4f6] dark:bg-[#242526]">
        {/* Main View */}
        <div 
          className={`absolute top-0 left-0 w-full h-full p-4 pt-10 overflow-y-auto hide-scrollbar transition-transform duration-300 ease-in-out ${activeCollection ? '-translate-x-full' : 'translate-x-0'}`}
        >
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-200 dark:bg-[#3A3B3C] rounded-full mb-3 flex items-center justify-center overflow-hidden border-2 border-white dark:border-[#18191A]">
              <img src="/produk-placeholder.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-black dark:text-white">Toko Digital Kreatif</h3>
            <p className="text-sm text-gray-500 mt-1">Mencari Produk</p>
          </div>

          <div className="space-y-3">
            {collections.map((col, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveCollection(col)}
                className="w-full flex items-center justify-between bg-white dark:bg-[#3A3B3C] p-3.5 rounded-2xl shadow-sm border border-gray-100 dark:border-[#4E4F50] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-[#242526] text-emerald-600 dark:text-gray-300 rounded-lg flex items-center justify-center shrink-0">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <span className="font-bold text-[13px] text-gray-800 dark:text-[#E4E6EB] text-left leading-tight">{col.title}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-50 dark:bg-[#242526] flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-[#4E4F50] transition-colors">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Collection Detail View */}
        <div 
          className={`absolute top-0 left-0 w-full h-full bg-[#f3f4f6] dark:bg-[#242526] flex flex-col transition-transform duration-300 ease-in-out z-10 ${activeCollection ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-4 pt-10 pb-4 bg-white dark:bg-[#18191A] border-b border-gray-200 dark:border-[#3E4042] flex items-center gap-3 shrink-0 shadow-sm z-10">
            <button onClick={() => setActiveCollection(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#3A3B3C] text-gray-600 dark:text-[#E4E6EB] hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h3 className="font-bold text-[14px] text-gray-800 dark:text-[#E4E6EB] truncate flex-1 leading-tight">{activeCollection?.title}</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
            <div className="space-y-3">
              {activeCollection?.items.map((item: any, idx: number) => {
                if (item.type === "product") {
                  return (
                    <div key={idx} className="bg-white dark:bg-[#3A3B3C] p-3 rounded-xl flex items-center gap-3 shadow-sm border border-gray-100 dark:border-[#4E4F50]">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-[#242526] rounded-lg overflow-hidden shrink-0">
                        <img src="/produk-placeholder.png" alt="icon" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      </div>
                      <div className="text-[13px] font-bold text-gray-800 dark:text-[#E4E6EB] leading-snug">
                        {item.title}
                      </div>
                    </div>
                  );
                } else if (item.type === "category") {
                  return (
                    <div key={idx} className="mb-2 mt-5">
                      <div className="flex items-center gap-1.5 text-gray-500 dark:text-[#B0B3B8] mb-3 px-1">
                        {item.icon}
                        <h4 className="text-[11px] font-bold uppercase tracking-wider">{item.title}</h4>
                      </div>
                      <div className="space-y-3">
                        {item.items.map((sub: any, sIdx: number) => (
                          <div key={sIdx} className="bg-white dark:bg-[#3A3B3C] p-3 rounded-xl flex items-center gap-3 shadow-sm border border-gray-100 dark:border-[#4E4F50]">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-[#242526] rounded-lg overflow-hidden shrink-0">
                              <img src="/produk-placeholder.png" alt="icon" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            </div>
                            <div className="text-[13px] font-bold text-gray-800 dark:text-[#E4E6EB] leading-snug">
                              {sub.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuilderCategoryItem({ item, onMoveUp, onMoveDown, isFirst, isLast, onMoveSubItemUp, onMoveSubItemDown, onChangeCategory, onDeleteCategory }: { item: any, onMoveUp?: () => void, onMoveDown?: () => void, isFirst?: boolean, isLast?: boolean, onMoveSubItemUp?: (idx: number) => void, onMoveSubItemDown?: (idx: number) => void, onChangeCategory?: (newCategory: string) => void, onDeleteCategory?: () => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMovePopupOpen, setIsMovePopupOpen] = useState(false);
  const [openMovePopupSubIdx, setOpenMovePopupSubIdx] = useState<number | null>(null);
  const [isSettingPopupOpen, setIsSettingPopupOpen] = useState(false);
  const [isChangeCategoryOpen, setIsChangeCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [popupPos, setPopupPos] = useState<{top: number, right: number} | null>(null);
  const settingRef = useRef<HTMLDivElement>(null);
  const settingBtnRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const openSettingPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSettingPopupOpen) {
      setIsSettingPopupOpen(false);
      setPopupPos(null);
      return;
    }
    if (settingBtnRef.current) {
      const rect = settingBtnRef.current.getBoundingClientRect();
      setPopupPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
    }
    setIsSettingPopupOpen(true);
    setIsChangeCategoryOpen(false);
    setCategorySearch('');
  };

  const PRODUCT_CATEGORIES = [
    "AI & Prompt", "Design & Graphics", "Documents & Templates", "Ebook & Digital Books",
    "Courses & Education", "Software & Tools", "Business & Finance", "Social Media",
    "Photo & Video", "Audio & Music", "Gaming", "Website & Development",
    "Career & Professional", "Printables", "3D & Assets", "Font & Typography",
    "Marketing", "Lifestyle", "Membership & Subscription", "Bundle & Resource Pack"
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.move-popup-container')) {
        setIsMovePopupOpen(false);
        setOpenMovePopupSubIdx(null);
      }
      if (settingBtnRef.current && !settingBtnRef.current.closest('[data-setting-popup]') && !target.closest('[data-setting-popup]') && !settingBtnRef.current.contains(target)) {
        setIsSettingPopupOpen(false);
        setIsChangeCategoryOpen(false);
        setPopupPos(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="ml-2 mb-3 mt-4" style={{ viewTransitionName: item.id ? `item-${item.id}` : undefined }}>
      <div className="flex items-center justify-between mb-3 px-1 cursor-pointer select-none group/cat" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2 text-gray-500 dark:text-[#B0B3B8]">
          <div className="relative flex items-center shrink-0 move-popup-container" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsMovePopupOpen(!isMovePopupOpen)} className="text-gray-400 hover:text-gray-600 dark:text-[#8B8D90] dark:hover:text-[#E4E6EB] transition-colors cursor-pointer">
              <img src="/move.svg" alt="Move" className="w-4 h-4 opacity-40 hover:opacity-60 dark:invert transition-opacity" />
            </button>
            {isMovePopupOpen && (
              <div onClick={(e) => e.stopPropagation()} className="absolute top-full left-0 mt-1 bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-[#4E4F50] shadow-lg rounded-md p-1 z-20 flex gap-1">
                <button disabled={isFirst} onClick={() => { onMoveUp?.(); setIsMovePopupOpen(false); }} className="p-1 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-[#E4E6EB]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                </button>
                <button disabled={isLast} onClick={() => { onMoveDown?.(); setIsMovePopupOpen(false); }} className="p-1 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-[#E4E6EB]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            )}
          </div>
          {item.icon}
          <h4 className="text-[12px] font-bold uppercase tracking-wider">{item.title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex items-center" ref={settingRef} onClick={(e) => e.stopPropagation()}>
            <button
              ref={settingBtnRef}
              onClick={openSettingPopup}
              className="text-gray-400 hover:text-gray-600 dark:text-[#8B8D90] dark:hover:text-[#E4E6EB] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" strokeWidth={2} /></svg>
            </button>
            {isSettingPopupOpen && popupPos && createPortal(
              <div
                data-setting-popup
                className="fixed bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-[#4E4F50] rounded-xl min-w-[220px]"
                style={{ top: popupPos.top, right: popupPos.right, zIndex: 99999, boxShadow: '0 8px 32px rgba(0,0,0,0.22)' }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {/* Ubah Kategori */}
                <button
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-[13px] text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors rounded-t-xl"
                  onClick={(e) => { e.stopPropagation(); setIsChangeCategoryOpen(v => !v); if (!isChangeCategoryOpen) { setTimeout(() => searchInputRef.current?.focus(), 50); setCategorySearch(''); } }}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                    Ubah Kategori
                  </span>
                  <svg className={`w-3 h-3 text-gray-400 transition-transform duration-150 ${isChangeCategoryOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
                {isChangeCategoryOpen && (
                  <div className="border-t border-gray-100 dark:border-[#3E4042]">
                    <div className="px-2 py-1.5">
                      <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-[#3A3B3C] rounded-lg px-2 py-1.5">
                        <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" /></svg>
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Cari kategori..."
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="flex-1 bg-transparent text-[12px] text-gray-700 dark:text-[#E4E6EB] placeholder-gray-400 dark:placeholder-[#8B8D90] outline-none min-w-0"
                        />
                        {categorySearch && (
                          <button onClick={(e) => { e.stopPropagation(); setCategorySearch(''); searchInputRef.current?.focus(); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB]">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="overflow-y-auto" style={{maxHeight: '180px'}}>
                      {PRODUCT_CATEGORIES.filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase())).length === 0 ? (
                        <div className="px-4 py-3 text-[12px] text-gray-400 dark:text-[#8B8D90] text-center">Tidak ada hasil</div>
                      ) : (
                        PRODUCT_CATEGORIES.filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase())).map((cat) => (
                          <button
                            key={cat}
                            className={`w-full text-left px-4 py-2 text-[12.5px] transition-colors hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-2 ${
                              item.title === cat
                                ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-900/20'
                                : 'text-gray-600 dark:text-[#B0B3B8]'
                            }`}
                            onClick={(e) => { e.stopPropagation(); onChangeCategory?.(cat); setIsSettingPopupOpen(false); setIsChangeCategoryOpen(false); setCategorySearch(''); setPopupPos(null); }}
                          >
                            {item.title === cat && <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            <span className={item.title === cat ? '' : 'pl-5'}>{cat}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
                <div className="border-t border-gray-100 dark:border-[#3E4042]" />
                <button
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-b-xl"
                  onClick={(e) => { e.stopPropagation(); onDeleteCategory?.(); setIsSettingPopupOpen(false); setPopupPos(null); }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Hapus Kategori
                </button>
              </div>,
              document.body
            )}
          </div>
          <button className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 px-1.5 py-1 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors" onClick={(e) => e.stopPropagation()}>
            + Produk
          </button>
          <div className="text-gray-400 dark:text-[#8B8D90] transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="space-y-3">
          {item.items.map((subItem: any, subIdx: number) => (
            <div key={subIdx} className="bg-transparent p-3.5 rounded-xl shadow-sm border border-gray-200 dark:border-[#3E4042] flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors group" style={{ viewTransitionName: subItem.id ? `item-${subItem.id}` : undefined }}>
              <div className="relative flex items-center shrink-0 move-popup-container" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setOpenMovePopupSubIdx(openMovePopupSubIdx === subIdx ? null : subIdx)} className="cursor-pointer text-gray-300 dark:text-[#4E4F50] hover:text-gray-500">
                  <img src="/move.svg" alt="Move" className="w-4 h-4 opacity-40 hover:opacity-60 dark:invert transition-opacity" />
                </button>
                {openMovePopupSubIdx === subIdx && (
                  <div onClick={(e) => e.stopPropagation()} className="absolute top-full left-0 mt-1 bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-[#4E4F50] shadow-lg rounded-md p-1 z-20 flex gap-1">
                    <button disabled={subIdx === 0} onClick={() => { onMoveSubItemUp?.(subIdx); setOpenMovePopupSubIdx(null); }} className="p-1 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-[#E4E6EB]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button disabled={subIdx === item.items.length - 1} onClick={() => { onMoveSubItemDown?.(subIdx); setOpenMovePopupSubIdx(null); }} className="p-1 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-[#E4E6EB]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex-1 flex items-center gap-3 cursor-pointer group/itemclick min-w-0">
                <div className="w-9 h-9 shrink-0 bg-gray-100 dark:bg-[#E4E6EB] rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/produk-placeholder.png" alt="Icon" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <div className="flex-1 text-[13px] text-gray-700 dark:text-[#E4E6EB] font-medium leading-snug pr-2 truncate group-hover/itemclick:underline">
                  {subItem.title}
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB] shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BuilderCollectionItem({ collection, index, updateTitle, deleteCollection, moveCollection, moveItem, moveSubItem, changeCategoryTitle, deleteCategoryItem, isFirst, isLast }: { collection: any, index: number, updateTitle: (idx: number, title: string) => void, deleteCollection: (idx: number) => void, moveCollection: (idx: number, dir: 'up'|'down') => void, moveItem: (colIdx: number, itemIdx: number, dir: 'up'|'down') => void, moveSubItem: (colIdx: number, itemIdx: number, subIdx: number, dir: 'up'|'down') => void, changeCategoryTitle: (colIdx: number, itemIdx: number, newTitle: string) => void, deleteCategoryItem: (colIdx: number, itemIdx: number) => void, isFirst: boolean, isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isMovePopupOpen, setIsMovePopupOpen] = useState(false);
  const [openMovePopupItemIdx, setOpenMovePopupItemIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (collection.isNew) {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setIsEditing(true);
    }
  }, [collection.isNew]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (collection.isNew) {
        inputRef.current.select();
      }
    }
  }, [isEditing, collection.isNew]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.move-popup-container')) {
        setIsMovePopupOpen(false);
        setOpenMovePopupItemIdx(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-6" ref={containerRef} style={{ viewTransitionName: collection.id ? `col-${collection.id}` : undefined }}>
      {/* Collection Header */}
      <div className="flex items-center justify-between mb-3 px-1 cursor-pointer select-none group/col" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2 flex-1 min-w-0 pr-3">
          <div className="relative flex items-center shrink-0 move-popup-container" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsMovePopupOpen(!isMovePopupOpen)} className="text-gray-400 hover:text-gray-600 dark:text-[#8B8D90] dark:hover:text-[#E4E6EB] transition-colors cursor-pointer">
              <img src="/move.svg" alt="Move" className="w-4 h-4 opacity-40 hover:opacity-60 dark:invert transition-opacity" />
            </button>
            {isMovePopupOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-[#4E4F50] shadow-lg rounded-md p-1 z-20 flex gap-1">
                <button disabled={isFirst} onClick={() => { moveCollection(index, 'up'); setIsMovePopupOpen(false); }} className="p-1 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-[#E4E6EB]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                </button>
                <button disabled={isLast} onClick={() => { moveCollection(index, 'down'); setIsMovePopupOpen(false); }} className="p-1 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-[#E4E6EB]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            )}
          </div>
          <div className="w-7 h-7 shrink-0 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          {isEditing ? (
            <input 
              ref={inputRef}
              type="text" 
              value={collection.title} 
              onChange={(e) => updateTitle(index, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditing(false);
              }}
              className="text-[14px] font-bold text-gray-800 dark:text-[#E4E6EB] bg-white dark:bg-[#2A2B2C] outline-none p-1 -ml-1 border border-emerald-500/50 rounded-md shadow-sm w-full" 
            />
          ) : (
            <div 
              className="flex items-center gap-1.5 group/title cursor-text min-w-0" 
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
            >
              <h3 
                className="text-[14px] font-bold text-gray-800 dark:text-[#E4E6EB] truncate group-hover/title:text-gray-500 dark:group-hover/title:text-[#B0B3B8] transition-colors"
              >
                {collection.title}
              </h3>
              <div className="text-gray-400 opacity-0 group-hover/title:opacity-100 transition-opacity shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={(e) => { e.stopPropagation(); deleteCollection(index); }}
            className="text-gray-400 hover:text-red-500 dark:text-[#8B8D90] dark:hover:text-red-400 transition-colors p-1"
            title="Hapus Koleksi"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
          {collection.items.length > 0 && (
            <button className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 px-2 py-1 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors" onClick={(e) => e.stopPropagation()}>
              + Tambah
            </button>
          )}
          <div className="text-gray-400 dark:text-[#8B8D90] transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          {/* Collection Items */}
          <div className="space-y-3 pl-3 border-l-[3px] border-gray-100 dark:border-[#3E4042] ml-3">
            {collection.items.map((item: any, itemIdx: number) => {
              if (item.type === "product") {
                return (
                  <div key={itemIdx} className="bg-transparent p-3.5 rounded-xl shadow-sm border border-gray-200 dark:border-[#3E4042] flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors group ml-2" style={{ viewTransitionName: item.id ? `item-${item.id}` : undefined }}>
                    <div className="relative flex items-center shrink-0 move-popup-container" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => setOpenMovePopupItemIdx(openMovePopupItemIdx === itemIdx ? null : itemIdx)} className="cursor-pointer text-gray-300 dark:text-[#4E4F50] hover:text-gray-500">
                        <img src="/move.svg" alt="Move" className="w-4 h-4 opacity-40 hover:opacity-60 dark:invert transition-opacity" />
                      </button>
                      {openMovePopupItemIdx === itemIdx && (
                        <div onClick={(e) => e.stopPropagation()} className="absolute top-full left-0 mt-1 bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-[#4E4F50] shadow-lg rounded-md p-1 z-20 flex gap-1">
                          <button disabled={itemIdx === 0} onClick={() => { moveItem(index, itemIdx, 'up'); setOpenMovePopupItemIdx(null); }} className="p-1 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-[#E4E6EB]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                          </button>
                          <button disabled={itemIdx === collection.items.length - 1} onClick={() => { moveItem(index, itemIdx, 'down'); setOpenMovePopupItemIdx(null); }} className="p-1 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-[#E4E6EB]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex items-center gap-3 cursor-pointer group/itemclick min-w-0">
                      <div className="w-9 h-9 shrink-0 bg-gray-100 dark:bg-[#E4E6EB] rounded-lg flex items-center justify-center overflow-hidden">
                        <img src="/produk-placeholder.png" alt="Icon" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      </div>
                      <div className="flex-1 text-[13px] text-gray-700 dark:text-[#E4E6EB] font-medium leading-snug pr-2 truncate group-hover/itemclick:underline">
                        {item.title}
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB] shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                    </button>
                  </div>
                );
              } else if (item.type === "category") {
                return <BuilderCategoryItem key={itemIdx} item={item} onMoveUp={() => moveItem(index, itemIdx, 'up')} onMoveDown={() => moveItem(index, itemIdx, 'down')} onMoveSubItemUp={(subIdx) => moveSubItem(index, itemIdx, subIdx, 'up')} onMoveSubItemDown={(subIdx) => moveSubItem(index, itemIdx, subIdx, 'down')} onChangeCategory={(newCat) => changeCategoryTitle(index, itemIdx, newCat)} onDeleteCategory={() => deleteCategoryItem(index, itemIdx)} isFirst={itemIdx === 0} isLast={itemIdx === collection.items.length - 1} />;
              }
              return null;
            })}
          </div>
          
          {/* CTA buttons inside Collection */}
          {collection.items.length === 0 && (
            <div className="flex items-center gap-2 mt-2 ml-6">
              <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-emerald-600 dark:text-[#B0B3B8] dark:hover:text-emerald-400 bg-white hover:bg-emerald-50 dark:bg-[#2A2B2C] dark:hover:bg-emerald-900/30 px-3 py-1.5 rounded-lg transition-colors border border-gray-200 dark:border-[#4E4F50] shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                Add kategori
              </button>
              <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-emerald-600 dark:text-[#B0B3B8] dark:hover:text-emerald-400 bg-white hover:bg-emerald-50 dark:bg-[#2A2B2C] dark:hover:bg-emerald-900/30 px-3 py-1.5 rounded-lg transition-colors border border-gray-200 dark:border-[#4E4F50] shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                Add produk
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function MyDashPage() {
  const t = useTranslations();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [currentUser] = useState({ id: "1", name: "User", username: "user" });
  const [activeTab, setActiveTab] = useState<"store" | "produk" | "tampilan" | "settings">("store");
  const [collections, setCollections] = useState(initialCollections);

  const handleTabChange = (tab: "store" | "produk" | "tampilan" | "settings") => {
    setActiveTab(tab);
    localStorage.setItem("mydash_tab", tab);
  };

  const handleAddCollection = () => {
    setCollections([
      ...collections,
      {
        id: `c-${Date.now()}`,
        type: "collection",
        title: "Nama Koleksi",
        items: [],
        isNew: true
      }
    ]);
  };

  const updateCollectionTitle = (index: number, newTitle: string) => {
    setCollections(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], title: newTitle };
      if (updated[index].isNew) {
        updated[index].isNew = false;
      }
      return updated;
    });
  };

  const deleteCollection = (index: number) => {
    setCollections(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const moveCollection = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === collections.length - 1)) return;
    
    const update = () => {
      setCollections(prev => {
        const updated = [...prev];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
        return updated;
      });
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => { update(); });
      });
    } else {
      update();
    }
  };

  const changeCategoryTitle = (colIdx: number, itemIdx: number, newTitle: string) => {
    setCollections(prev => {
      const updated = [...prev];
      const items = [...updated[colIdx].items];
      items[itemIdx] = { ...items[itemIdx], title: newTitle };
      updated[colIdx] = { ...updated[colIdx], items };
      return updated;
    });
  };

  const deleteCategoryItem = (colIdx: number, itemIdx: number) => {
    setCollections(prev => {
      const updated = [...prev];
      const items = [...updated[colIdx].items];
      items.splice(itemIdx, 1);
      updated[colIdx] = { ...updated[colIdx], items };
      return updated;
    });
  };

  const moveSubItem = (colIdx: number, itemIdx: number, subItemIdx: number, direction: 'up' | 'down') => {
    const update = () => {
      setCollections(prev => {
        const updated = [...prev];
        const items = [...updated[colIdx].items];
        const subItems = [...items[itemIdx].items];
        if ((direction === 'up' && subItemIdx === 0) || (direction === 'down' && subItemIdx === subItems.length - 1)) return prev;
        
        const targetIdx = direction === 'up' ? subItemIdx - 1 : subItemIdx + 1;
        [subItems[subItemIdx], subItems[targetIdx]] = [subItems[targetIdx], subItems[subItemIdx]];
        items[itemIdx] = { ...items[itemIdx], items: subItems };
        updated[colIdx] = { ...updated[colIdx], items };
        return updated;
      });
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => { update(); });
      });
    } else {
      update();
    }
  };

  const moveItem = (colIdx: number, itemIdx: number, direction: 'up' | 'down') => {
    const update = () => {
      setCollections(prev => {
        const updated = [...prev];
        const items = [...updated[colIdx].items];
        if ((direction === 'up' && itemIdx === 0) || (direction === 'down' && itemIdx === items.length - 1)) return prev;
        
        const targetIdx = direction === 'up' ? itemIdx - 1 : itemIdx + 1;
        [items[itemIdx], items[targetIdx]] = [items[targetIdx], items[itemIdx]];
        updated[colIdx] = { ...updated[colIdx], items };
        return updated;
      });
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => { update(); });
      });
    } else {
      update();
    }
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("mydash_tab") as any;
    if (savedTab && ["store", "produk", "tampilan", "settings"].includes(savedTab)) {
      setActiveTab(savedTab);
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    setThemeLoaded(true);
  }, []);

  return (
    <>
      <div className="h-screen overflow-hidden bg-[#f3f4f6] dark:bg-[#18191A]">
      <div className="w-full flex flex-col lg:flex-row h-full">
        
        {/* Icon Sidebar */}
        <div className="w-full lg:w-[72px] shrink-0 h-full flex lg:flex-col items-center justify-start px-4 lg:px-0 pt-3 pb-6 bg-white dark:bg-[#242526] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-[#3E4042] z-10 relative">
          
          {/* Top Nav Items */}
          <div className="flex lg:flex-col items-center gap-2 w-full">
            
            {/* Back to Products */}
            <a href="/product" className="flex items-center justify-center w-10 h-10 bg-transparent text-gray-400 dark:text-[#B0B3B8] rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-[#3A3B3C] mb-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </a>

            {/* Divider */}
            <div className="hidden lg:block w-8 h-px bg-gray-200 dark:bg-[#3E4042] mb-1"></div>

            {/* Toko (Home Icon) */}
            <button 
              onClick={() => handleTabChange("store")}
              className={`flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-xl transition-colors ${activeTab === 'store' ? 'bg-[#f3f4f6] dark:bg-[#3A3B3C] text-emerald-500 shadow-sm' : 'bg-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C]'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="text-[9px] font-bold">{t("mydash.toko")}</span>
            </button>

            {/* Layout */}
            <button 
              onClick={() => handleTabChange("produk")}
              className={`flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-xl transition-colors ${activeTab === 'produk' ? 'bg-[#f3f4f6] dark:bg-[#3A3B3C] text-emerald-500 shadow-sm' : 'bg-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C]'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v14a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" /></svg>
              <span className="text-[9px] font-bold">{t("mydash.layout")}</span>
            </button>

            {/* Tampilan */}
            <button 
              onClick={() => handleTabChange("tampilan")}
              className={`flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-xl transition-colors ${activeTab === 'tampilan' ? 'bg-[#f3f4f6] dark:bg-[#3A3B3C] text-emerald-500 shadow-sm' : 'bg-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C]'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
              <span className="text-[9px] font-bold">{t("mydash.tampilan")}</span>
            </button>

            {/* Settings Icon */}
            <button 
              onClick={() => handleTabChange("settings")}
              className={`flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-[#f3f4f6] dark:bg-[#3A3B3C] text-emerald-500 shadow-sm' : 'bg-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C]'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-[9px] font-bold">{t("mydash.settings")}</span>
            </button>
            
          </div>

          <div className="flex-1"></div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row w-full h-full bg-[#f3f4f6] dark:bg-[#111213]">
          
          {/* Left Column (Dashboard Controls) */}
          <div className="w-full lg:w-[500px] xl:w-[560px] shrink-0 h-full overflow-y-auto sidebar-scrollbar px-6 pt-8 pb-10 bg-white dark:bg-[#1C1D1F] border-r border-gray-200 dark:border-[#3E4042]">

            {activeTab === "store" && (
              <div className="flex flex-col gap-6">
                <div className="bg-white dark:bg-[#242526] rounded-2xl border border-gray-200 dark:border-[#3E4042] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-gray-600 dark:text-[#E4E6EB]">{t("mydash.link_toko")}</span>
                  </div>
                  <div className="bg-[#f0f9f6] dark:bg-[#1a2e26] rounded-2xl p-3 flex items-center justify-between mb-6 shadow-md dark:shadow-black/40 border border-emerald-100 dark:border-emerald-900/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center p-2 shrink-0">
                         {/* Logo Mencari Online */}
                         <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                           <path d="M25 75V40C25 31.7 31.7 25 40 25C48.3 25 55 31.7 55 40V75M55 75V55C55 46.7 61.7 40 70 40C78.3 40 85 46.7 85 55V75" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-[#E4E6EB] text-[15px] leading-tight">Mencari Online</h3>
                        <a href="https://mencari.online/{namatoko}" className="text-emerald-500 text-[13px] hover:underline">https://mencari.online/{"{namatoko}"}</a>
                      </div>
                    </div>
                    <button className="bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-[#3E4042] text-emerald-500 px-4 py-1.5 rounded-full font-bold text-[13px] flex items-center gap-1.5 shadow-sm hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                      Share
                    </button>
                  </div>

                  {/* Start creating now */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-gray-700 dark:text-[#E4E6EB] text-[14px]">{t("mydash.start_creating_now")}</h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <button onClick={handleAddCollection} className="bg-white dark:bg-[#242526] border border-gray-300 dark:border-[#4E4F50] text-gray-600 dark:text-[#B0B3B8] rounded-md px-3 py-1.5 flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors text-[13px] font-medium shadow-sm shrink-0">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                          {t("mydash.add_collection")}
                        </button>
                        <button className="bg-white dark:bg-[#242526] border border-gray-300 dark:border-[#4E4F50] text-gray-600 dark:text-[#B0B3B8] rounded-md px-3 py-1.5 flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors text-[13px] font-medium shadow-sm shrink-0">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          {t("mydash.add_category")}
                        </button>
                        <button className="bg-white dark:bg-[#242526] border border-gray-300 dark:border-[#4E4F50] text-gray-600 dark:text-[#B0B3B8] rounded-md px-3 py-1.5 flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors text-[13px] font-medium shadow-sm shrink-0">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          {t("mydash.add_product")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics Chart Mockup */}
                <div className="bg-white dark:bg-[#242526] rounded-2xl border border-gray-200 dark:border-[#3E4042] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-800 dark:text-[#E4E6EB] text-[15px]">Analytics</h3>
                    <select className="bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-[#4E4F50] text-gray-600 dark:text-[#B0B3B8] rounded-lg px-3 py-1.5 text-[12px] font-semibold outline-none focus:border-emerald-500">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>All Time</option>
                    </select>
                  </div>
                  
                  <div className="h-48 w-full flex items-end justify-between gap-2">
                    {/* Mockup bars */}
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div key={i} className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-t-sm relative group cursor-pointer hover:bg-emerald-200 dark:hover:bg-emerald-800/40 transition-colors" style={{ height: `${h}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          {h * 12} Views
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3 text-[11px] font-semibold text-gray-400 dark:text-[#8B8D90] px-1">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "produk" && (
              <div className="flex flex-col">
                {/* Your Pages */}
                <div className="flex flex-col mb-6">
                  <div className="flex items-center">
                    <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t("mydash.your_pages")}</h2>
                  </div>
                </div>

                {/* Add new block */}
                <div className="flex gap-2 mb-6 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <button onClick={handleAddCollection} className="flex-1 py-2.5 px-3 bg-emerald-500 text-white font-bold rounded-xl text-[13px] hover:bg-emerald-600 transition-colors flex justify-center items-center gap-1.5 shadow-sm whitespace-nowrap">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    {t("mydash.add_collection")}
                  </button>
                  <button className="flex-1 py-2.5 px-3 bg-emerald-500 text-white font-bold rounded-xl text-[13px] hover:bg-emerald-600 transition-colors flex justify-center items-center gap-1.5 shadow-sm whitespace-nowrap">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    {t("mydash.add_category")}
                  </button>
                  <button className="flex-1 py-2.5 px-3 bg-emerald-500 text-white font-bold rounded-xl text-[13px] hover:bg-emerald-600 transition-colors flex justify-center items-center gap-1.5 shadow-sm whitespace-nowrap">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    {t("mydash.add_product")}
                  </button>
                </div>

                <div className="w-full h-px bg-gray-200 dark:bg-[#3E4042] mb-6"></div>

                {/* Block List */}
                <div className="mb-3">
                  <div className="space-y-6">
                    {collections.map((collection, colIdx) => (
                      <BuilderCollectionItem 
                        key={colIdx} 
                        index={colIdx}
                        collection={collection} 
                        updateTitle={updateCollectionTitle}
                        deleteCollection={deleteCollection}
                        moveCollection={moveCollection}
                        moveItem={moveItem}
                        moveSubItem={moveSubItem}
                        changeCategoryTitle={changeCategoryTitle}
                        deleteCategoryItem={deleteCategoryItem}
                        isFirst={colIdx === 0}
                        isLast={colIdx === collections.length - 1}
                      />
                    ))}
                  </div>
                </div>
        </div>
        )}
      </div>

        {/* Right Column (Preview) */}
        <div className="flex-1 h-full overflow-hidden flex justify-center pt-4 lg:pt-0">
          <div className="w-full h-full flex justify-center items-start lg:items-center">
            {/* Phone Preview Mockup */}
            {/* Phone Preview Mockup */}
            <PhonePreviewMockup collections={collections} />
          </div>
        </div>

        </div>
      </div>
    </div>
    </>
  );
}
