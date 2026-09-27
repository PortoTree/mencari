"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

export default function MyDashPage() {
  const t = useTranslations();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [currentUser] = useState({ id: "1", name: "User", username: "user" });

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
      {/* Custom Empty Header */}
      <header className="fixed top-0 left-0 right-0 h-[56px] bg-white dark:bg-[#242526] border-b border-gray-200 dark:border-[#3E4042] z-50 flex items-center px-4"></header>

      <div className="h-screen overflow-hidden bg-[#f3f4f6] dark:bg-[#18191A] pt-[56px]">
      <div className="w-full flex flex-col lg:flex-row h-full">
        
        {/* Icon Sidebar */}
        <div className="w-full lg:w-[72px] shrink-0 flex lg:flex-col items-center gap-4 px-4 lg:px-0 py-4 bg-white dark:bg-[#242526] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-[#3E4042]">
          {/* Produk */}
          <button className="flex flex-col items-center justify-center gap-1.5 w-14 h-14 bg-[#f3f4f6] dark:bg-[#3A3B3C] text-emerald-500 rounded-xl shadow-sm transition-colors hover:bg-emerald-50 dark:hover:bg-[#2A2B2C]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="text-[9px] font-bold">Produk</span>
          </button>

          {/* Tampilan */}
          <button className="flex flex-col items-center justify-center gap-1.5 w-14 h-14 bg-transparent text-gray-500 dark:text-[#B0B3B8] rounded-xl transition-colors hover:bg-gray-200 dark:hover:bg-[#3A3B3C] relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
            <span className="text-[9px] font-bold">Tampilan</span>
            <span className="absolute -top-1 -right-1 bg-[#FF5A5F] text-white text-[8px] font-bold px-1 py-0.5 rounded-full">NEW</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row justify-center max-w-[1440px] mx-auto w-full gap-6 lg:gap-8 pt-6">
          {/* Left Column (Dashboard Controls) */}
          <div className="w-full lg:w-[500px] xl:w-[560px] shrink-0 h-full overflow-y-auto sidebar-scrollbar px-4 pb-10">

          {/* URL Box */}
          <div className="bg-white dark:bg-[#242526] p-3 rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] flex flex-col sm:flex-row items-center gap-3 mb-8">
            <div className="flex-1 bg-gray-100 dark:bg-[#3A3B3C] rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#E4E6EB] w-full">
              <span className="text-gray-400">My Lynkid: </span>
              https://lynk.id/mencari_produk
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex items-center gap-1.5 px-4 py-2 border border-emerald-500 text-emerald-500 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.632l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Customize URL
              </button>
            </div>
          </div>

          {/* Your Pages */}
          <div className="flex flex-col mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-500 dark:text-[#B0B3B8]">Your Pages</h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 px-3 py-1.5 border border-emerald-500 text-emerald-500 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Page
                </button>
                <button className="text-gray-500 hover:text-gray-700 dark:hover:text-[#E4E6EB] transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
              </div>
            </div>
            <button className="self-start px-6 py-2 bg-emerald-500 text-white font-bold rounded-full text-sm hover:bg-emerald-600 transition-colors shadow-sm">
              Home
            </button>
          </div>

          {/* Add new block */}
          <div className="flex gap-2 mb-6">
            <button className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-lg text-[15px] hover:bg-emerald-600 transition-colors flex justify-center items-center gap-2 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              Add new block
            </button>
            <button className="px-4 py-3 border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
            </button>
          </div>

          {/* Block List */}
          <div className="mb-3">
            <h2 className="text-[15px] font-bold text-gray-400 dark:text-[#B0B3B8] mb-3">Block List</h2>
            <div className="space-y-3">
              {[
                { title: "TERMURAH! Panduan Belajar Excel dari Nol sampai Jago (FREE UPDATE RATUSAN LATIHAN SOAL + JOIN KOMUNITAS EXCEL)" },
                { title: "THE ULTIMATE BOOK FOR JOB SEEKER" },
                { title: "JOB SEEKER ULTIMATE KIT" },
                { title: "Starter Kit Karir — 4 Template Siap Pakai untuk Fresh Grad & Job Seeker" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-[#242526] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] flex items-center gap-4">
                  <div className="cursor-grab text-gray-300 dark:text-[#4E4F50] hover:text-gray-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
                  </div>
                  <div className="w-10 h-10 shrink-0 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img src="/produk-placeholder.png" alt="Icon" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                  <div className="flex-1 text-[14px] text-gray-700 dark:text-[#E4E6EB] font-medium leading-snug">
                    {item.title}
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-[#E4E6EB]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
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

                <div className="space-y-3">
                  {[
                    "TERMURAH! Panduan Belajar...",
                    "THE ULTIMATE BOOK FOR...",
                    "JOB SEEKER ULTIMATE KIT",
                    "Starter Kit Karir — 4..."
                  ].map((title, i) => (
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
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
    </>
  );
}
