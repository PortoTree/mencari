"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

const initialCollections = [
  {
    type: "collection",
    title: "Koleksi Ebook & Buku Digital",
    items: [
      { type: "product", title: "THE ULTIMATE BOOK FOR JOB SEEKER" },
      { type: "product", title: "JOB SEEKER ULTIMATE KIT" }
    ]
  },
  {
    type: "collection",
    title: "Koleksi Software & Tools",
    items: [
      {
        type: "category",
        title: "Template & Resource",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        items: [
          { type: "product", title: "Starter Kit Karir — 4 Template Siap Pakai" },
          { type: "product", title: "Template PPT Pitch Deck Pro" }
        ]
      }
    ]
  },
  {
    type: "collection",
    title: "Webinar & Kursus",
    items: [
      { type: "product", title: "Masterclass CV & Interview" },
      { type: "product", title: "Panduan Lengkap LinkedIn" }
    ]
  },
  {
    type: "collection",
    title: "Jasa Konsultasi",
    items: [
      { type: "product", title: "Review CV & Portofolio 1on1" }
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

function BuilderCategoryItem({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="ml-2 mb-3 mt-4">
      <div className="flex items-center justify-between mb-3 px-1 cursor-pointer select-none group/cat" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2 text-gray-500 dark:text-[#B0B3B8]">
          {item.icon}
          <h4 className="text-[12px] font-bold uppercase tracking-wider">{item.title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group/tooltip flex items-center" onClick={(e) => e.stopPropagation()}>
            <button className="text-gray-400 hover:text-gray-600 dark:text-[#8B8D90] dark:hover:text-[#E4E6EB] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" strokeWidth={2} /></svg>
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-[10px] whitespace-nowrap rounded opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-100 z-10 pointer-events-none">
              Setting
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[4px] border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
            </div>
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
            <div key={subIdx} className="bg-transparent p-3.5 rounded-xl shadow-sm border border-gray-200 dark:border-[#3E4042] flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors cursor-pointer group">
              <div className="cursor-grab text-gray-300 dark:text-[#4E4F50] hover:text-gray-500 shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
              </div>
              <div className="w-9 h-9 shrink-0 bg-gray-100 dark:bg-[#E4E6EB] rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/produk-placeholder.png" alt="Icon" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <div className="flex-1 text-[13px] text-gray-700 dark:text-[#E4E6EB] font-medium leading-snug pr-2 truncate">
                {subItem.title}
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

function BuilderCollectionItem({ collection, index, updateTitle, deleteCollection }: { collection: any, index: number, updateTitle: (idx: number, title: string) => void, deleteCollection: (idx: number) => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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

  return (
    <div className="mb-6" ref={containerRef}>
      {/* Collection Header */}
      <div className="flex items-center justify-between mb-3 px-1 cursor-pointer select-none group/col" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2 flex-1 min-w-0 pr-3">
          <div className="relative group/tooltip flex items-center shrink-0" onClick={(e) => e.stopPropagation()}>
            <button className="text-gray-400 hover:text-gray-600 dark:text-[#8B8D90] dark:hover:text-[#E4E6EB] transition-colors cursor-grab">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-[10px] whitespace-nowrap rounded opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-100 z-10 pointer-events-none">
              Pindah urutan
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[4px] border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
            </div>
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
                  <div key={itemIdx} className="bg-transparent p-3.5 rounded-xl shadow-sm border border-gray-200 dark:border-[#3E4042] flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors cursor-pointer group ml-2">
                    <div className="cursor-grab text-gray-300 dark:text-[#4E4F50] hover:text-gray-500 shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
                    </div>
                    <div className="w-9 h-9 shrink-0 bg-gray-100 dark:bg-[#E4E6EB] rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/produk-placeholder.png" alt="Icon" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </div>
                    <div className="flex-1 text-[13px] text-gray-700 dark:text-[#E4E6EB] font-medium leading-snug pr-2 truncate">
                      {item.title}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB] shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                    </button>
                  </div>
                );
              } else if (item.type === "category") {
                return <BuilderCategoryItem key={itemIdx} item={item} />;
              }
              return null;
            })}
          </div>
          
          {/* CTA buttons inside Collection */}
          {collection.items.length === 0 && (
            <div className="flex items-center gap-2 mt-2 ml-6">
              <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-emerald-600 dark:text-[#B0B3B8] dark:hover:text-emerald-400 bg-white hover:bg-emerald-50 dark:bg-[#2A2B2C] dark:hover:bg-emerald-900/30 px-3 py-1.5 rounded-lg transition-colors border border-gray-200 dark:border-[#4E4F50] shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                Add display
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
                    {t("mydash.add_display")}
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
