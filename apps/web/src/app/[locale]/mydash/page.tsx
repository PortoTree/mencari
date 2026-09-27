"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

export default function MyDashPage() {
  const t = useTranslations();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [currentUser] = useState({ id: "1", name: "User", username: "user" });
  const [activeTab, setActiveTab] = useState<"store" | "produk" | "tampilan" | "settings">("store");

  useEffect(() => {
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
              onClick={() => setActiveTab("store")}
              className={`flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-xl transition-colors ${activeTab === 'store' ? 'bg-[#f3f4f6] dark:bg-[#3A3B3C] text-emerald-500 shadow-sm' : 'bg-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C]'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="text-[9px] font-bold">{t("mydash.toko")}</span>
            </button>

            {/* Produk */}
            <button 
              onClick={() => setActiveTab("produk")}
              className={`flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-xl transition-colors ${activeTab === 'produk' ? 'bg-[#f3f4f6] dark:bg-[#3A3B3C] text-emerald-500 shadow-sm' : 'bg-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C]'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <span className="text-[9px] font-bold">{t("mydash.produk")}</span>
            </button>

            {/* Tampilan */}
            <button 
              onClick={() => setActiveTab("tampilan")}
              className={`flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-xl transition-colors relative ${activeTab === 'tampilan' ? 'bg-[#f3f4f6] dark:bg-[#3A3B3C] text-emerald-500 shadow-sm' : 'bg-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C]'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              <span className="text-[9px] font-bold">{t("mydash.tampilan")}</span>
              <span className="absolute -top-1 -right-1 bg-[#FF5A5F] text-white text-[8px] font-bold px-1 py-0.5 rounded-full">NEW</span>
            </button>

            {/* Settings Icon */}
            <button 
              onClick={() => setActiveTab("settings")}
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
                  <div className="bg-[#f0f9f6] dark:bg-[#1a2e26] rounded-2xl p-3 flex items-center justify-between">
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
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] text-gray-700 dark:text-[#E4E6EB] font-bold rounded-xl py-3 flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors text-[14px]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    Add Link
                  </button>
                  <button className="flex-1 bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3E4042] text-gray-700 dark:text-[#E4E6EB] font-bold rounded-xl py-3 flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors text-[14px]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    Add produk
                  </button>
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
                <div className="flex flex-col mb-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[17px] font-bold text-gray-800 dark:text-[#E4E6EB]">{t("mydash.your_pages")}</h2>
                  </div>
                </div>

                {/* Add new block */}
                <div className="flex gap-2 mb-6">
                  <button className="flex-1 py-2.5 bg-emerald-500 text-white font-bold rounded-xl text-[14px] hover:bg-emerald-600 transition-colors flex justify-center items-center gap-2 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    {t("mydash.add_new_block")}
                  </button>
                  <button className="w-11 shrink-0 flex items-center justify-center bg-transparent border border-gray-400 dark:border-[#4E4F50] text-gray-400 dark:text-[#B0B3B8] rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors shadow-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                  </button>
                </div>

                <div className="w-full h-px bg-gray-200 dark:bg-[#3E4042] mb-6"></div>

                {/* Block List */}
                <div className="mb-3">
                  <div className="space-y-6">
                    {[
                      { 
                        category: "Ebook & Buku Digital",
                        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
                        items: [
                          { title: "THE ULTIMATE BOOK FOR JOB SEEKER" },
                          { title: "JOB SEEKER ULTIMATE KIT" }
                        ]

                },
                {
                  category: "Software & Tools",
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                  items: [
                    { title: "Starter Kit Karir — 4 Template Siap Pakai" },
                    { title: "Template PPT Pitch Deck Pro" }
                  ]
                }
              ].map((cat, catIdx) => (
                <div key={catIdx}>
                  <div className="flex items-center justify-between mb-2 px-1">
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-[#B0B3B8]">
                      {cat.icon}
                      <h3 className="text-[12px] font-bold uppercase tracking-wider">{cat.category}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative group/tooltip flex items-center">
                        <button className="text-gray-400 hover:text-gray-600 dark:text-[#8B8D90] dark:hover:text-[#E4E6EB] transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-[10px] whitespace-nowrap rounded opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-100 z-10 pointer-events-none">
                          Edit kategori
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[4px] border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
                        </div>
                      </div>
                      <button className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 px-2 py-1 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors">
                        + Produk
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="bg-transparent p-4 rounded-xl shadow-sm border border-gray-200 dark:border-[#3E4042] flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] transition-colors cursor-pointer group">
                        <div className="cursor-grab text-gray-300 dark:text-[#4E4F50] hover:text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
                        </div>
                        <div className="w-10 h-10 shrink-0 bg-gray-100 dark:bg-[#E4E6EB] rounded-lg flex items-center justify-center overflow-hidden">
                          <img src="/produk-placeholder.png" alt="Icon" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        </div>
                        <div className="flex-1 text-[13px] text-gray-700 dark:text-[#E4E6EB] font-medium leading-snug pr-4">
                          {item.title}
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB]">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
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
            <div className="w-[320px] h-[640px] mx-auto bg-white dark:bg-[#18191A] rounded-[40px] border-[8px] border-gray-800 dark:border-gray-900 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 dark:bg-gray-900 rounded-b-3xl z-10"></div>
              
              <div className="w-full h-full bg-[#f3f4f6] dark:bg-[#242526] p-4 pt-10 overflow-y-auto sidebar-scrollbar">
                {/* Preview Content */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-[#3A3B3C] rounded-full mb-3 flex items-center justify-center overflow-hidden border-2 border-white dark:border-[#18191A]">
                    <img src="/produk-placeholder.png" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-black dark:text-white">Toko Digital Kreatif</h3>
                  <p className="text-sm text-gray-500 mt-1">Mencari Produk</p>
                </div>

                <div className="space-y-5">
                  {[
                    { 
                      category: "Ebook & Buku Digital",
                      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
                      items: [
                        "THE ULTIMATE BOOK FOR...",
                        "JOB SEEKER ULTIMATE KIT"
                      ]
                    },
                    {
                      category: "Software & Tools",
                      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                      items: [
                        "Starter Kit Karir — 4...",
                        "Template PPT Pitch Deck Pro"
                      ]
                    }
                  ].map((cat, catIdx) => (
                    <div key={catIdx}>
                      <div className="flex items-center gap-1 mb-2 px-1 text-gray-500 dark:text-[#B0B3B8]">
                        {cat.icon}
                        <h3 className="text-[11px] font-bold uppercase tracking-wider">{cat.category}</h3>
                      </div>
                      <div className="space-y-3">
                        {cat.items.map((title, i) => (
                          <div key={i} className="w-full bg-white dark:bg-[#3A3B3C] p-3 rounded-xl shadow-sm flex items-center gap-3">
                            <div className="w-10 h-10 shrink-0 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden">
                              <img src="/produk-placeholder.png" alt="Icon" className="w-full h-full object-cover opacity-80" />
                            </div>
                            <span className="text-[12px] font-semibold text-gray-800 dark:text-[#E4E6EB] leading-tight flex-1">
                              {title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
    </>
  );
}
