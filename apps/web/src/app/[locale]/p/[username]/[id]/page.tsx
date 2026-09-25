
"use client";

import React, { useState, useEffect, use } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import EditProfileModal from "@/components/EditProfileModal";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string; username: string; id: string }>;
}) {
  const t = useTranslations("profile");

  const unwrappedParams = use(params);
  const username = unwrappedParams.username ? decodeURIComponent(unwrappedParams.username) : "pampam";
  const id = unwrappedParams.id || "123";

  const [activeTab, setActiveTab] = useState("posts");
  const [currentUser, setCurrentUser] = useState<any>({ username: "Guest", id: "1" });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
    const [activeAlbumIdx, setActiveAlbumIdx] = useState<number | null>(null);
    const [albumGridCols, setAlbumGridCols] = useState<number>(3);
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const albumCarouselRef = React.useRef<HTMLDivElement>(null);
    
    const scrollAlbumCarousel = (direction: 'left' | 'right') => {
      if (albumCarouselRef.current) {
        const scrollAmount = 300;
        albumCarouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    };
    
    const scrollCarousel = (direction: 'left' | 'right') => {
      if (carouselRef.current) {
        const scrollAmount = 300;
        carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    };

  const isOwnProfile = currentUser && currentUser.id === id;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode, themeLoaded]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username || payload.name) {
          setCurrentUser({
            id: payload.sub || payload.id || payload._id || payload.userId || "1",
            username: payload.username || payload.name || "User",
            displayName: payload.displayName || payload.username || payload.name || "User",
          });
        }
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
    setThemeLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#F3F2EF] dark:bg-[#18191A] text-black dark:text-[#E4E6EB] pb-20 pt-[56px] font-sans">
      <Navbar activeTab={null} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} themeLoaded={themeLoaded} currentUser={currentUser} />

      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        
        {/* Cover Photo */}
        <div className="w-full h-[280px] rounded-b-[40px] relative overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-sm">
          <img src="/sampul-placeholder.png" alt="Cover" className="w-full h-full object-cover" />
          {isOwnProfile && (
            <button onClick={() => setIsEditModalOpen(true)} className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-sm transition-colors cursor-pointer shadow-md z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col md:flex-row gap-6 -mt-[80px] px-2 md:px-6 relative z-10">
          
          {/* Left Sidebar */}
            <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-6 relative z-20">
              {/* Actual Profile Card */}
              <div className="w-full bg-gradient-to-b from-white to-[#D9D9D9] dark:from-[#3A3B3C] dark:to-[#18191A] rounded-[40px] px-8 pt-8 pb-5 shadow-xl flex flex-col justify-between border border-white/20 dark:border-white/5 transition-all duration-300 h-auto">
              <div className="flex flex-col items-center w-full">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="w-[120px] h-[120px] rounded-full border-[4px] border-white dark:border-[#3A3B3C] bg-white dark:bg-[#242526] flex items-center justify-center shadow-md overflow-hidden">
                <img src="/default-avatar.svg" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              {isOwnProfile && (
                <button onClick={() => setIsEditModalOpen(true)} className="absolute bottom-0 right-0 bg-gray-200 hover:bg-gray-300 dark:bg-[#4E4F50] dark:hover:bg-[#5E5F60] p-2 rounded-full border-[3px] border-white dark:border-[#3A3B3C] shadow-sm transition-colors text-black dark:text-white cursor-pointer z-10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-black dark:text-white">{username === "pampam" ? "nama akun" : username}</h1>
            <p className="text-[15px] text-gray-700 dark:text-gray-300 font-medium mb-3">@{username}</p>
            {/* Social Media Icons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 px-4">
              {[
                { name: 'Instagram', file: 'instagram.webp', handle: 'naufal.faiz' },
                { name: 'Facebook', file: 'facebook.webp', handle: 'Naufal Faiz' },
                { name: 'Github', file: 'github.webp', handle: 'naufal-faiz' },
                { name: 'Linkedin', file: 'linkedin.webp', handle: 'naufal-faiz' },
                { name: 'Telegram', file: 'telegram.webp', handle: 'naufal_faiz' },
                { name: 'Whatsapp', file: 'whatsapp.webp', handle: '+62 812 3456 7890' },
                { name: 'Tiktok', file: 'tiktok.webp', handle: '@naufal.faiz' },
                { name: 'Portotree', file: 'portotree.webp', handle: 'naufal-faiz' },
                { name: 'Youtube', file: 'youtube.webp', handle: '@NaufalFaiz' },
                { name: 'Twitter', file: 'twiter.webp', handle: '@naufal_faiz' }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href="#" 
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#3A3B3C] flex items-center justify-center hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors shadow-sm border border-gray-200 dark:border-[#4E4F50] shrink-0 group relative z-10"
                >
                  <img src={`/sosmed/${social.file}`} alt={social.name} className="w-5 h-5 object-contain drop-shadow-sm group-hover:scale-110 transition-transform" />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-[#1C1E21] dark:bg-white text-[#E4E6EB] dark:text-black px-2.5 py-1.5 rounded-lg text-[12px] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex items-center gap-1.5 shadow-xl z-50 pointer-events-none">
                    <img src={`/sosmed/${social.file}`} alt={social.name} className="w-3.5 h-3.5 object-contain shrink-0" />
                    <span>{social.name}</span>
                    <span className="font-bold">{social.handle}</span>
                    {/* Tooltip arrow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1C1E21] dark:bg-white rotate-45"></div>
                  </div>
                </a>
              ))}
            </div>

            
              {/* Profile Details List */}
              <div className="w-full">
                <div className="flex flex-col gap-4">
                  
                  {/* 1. Bio (Always visible) */}
                  <div className="flex items-start gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="leading-relaxed">Seorang web developer yang suka ngoding dan minum kopi. Belajar setiap hari untuk jadi lebih baik! 🚀</span>
                  </div>

                  {/* 2. Lokasi (Always visible) */}
                  <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Malang, Jawa Timur
                  </div>

                  {/* Expandable Section */}
                  <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out ${isProfileExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                    
                    {/* 3. Link web */}
                    <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                      <span className="underline cursor-pointer hover:text-blue-500 transition-colors">mencari.online</span>
                    </div>

                    {/* 4. Profesi/pekerjaan */}
                    <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      Web Development
                    </div>

                    {/* 5. Gender */}
                    <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      Laki-laki
                    </div>

                    {/* 6. Tanggal lahir */}
                    <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      1 Januari 2000
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expand / Collapse Button */}
              <button 
                onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                className="w-full mt-6 flex items-center justify-center gap-2 text-[15px] font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors group cursor-pointer"
              >
                {isProfileExpanded ? t("showLess") : t("showMore")}
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isProfileExpanded ? "rotate-180" : "group-hover:translate-y-1"}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              </div>
            </div>

              {/* Reputasi Card */}
              <div className="w-full shrink-0 bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-800/30 rounded-[30px] p-5 flex flex-col justify-between shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {/* Reputasi Logo */}
                    <div className="w-[70px] h-[70px] shrink-0">
                       <img src="/reputasi.png" alt={t("reputation")} className="w-full h-full object-contain drop-shadow-md" />
                    </div>
                  </div>
                  <div className="text-white flex flex-col justify-center">
                  <p className="font-bold text-[18px] leading-none mb-1.5 tracking-wide">{isOwnProfile ? t("yourPoints") : `@${username}`}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <p className="font-extrabold text-[22px] leading-none tracking-wide">1.238</p>
                    <img
                        src="/review.png"
                        alt="Star"
                        className="w-6 h-6 object-contain mb-0.5 shrink-0"
                      />
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-1.5 rounded-full text-[13px] transition-colors">
                    {isOwnProfile ? t("howItWorks") : t("check")}
                  </button>
                  {isOwnProfile ? (
                    <div className="flex-1 flex items-center justify-center border border-red-500/70 rounded-full py-1.5">
                      <span className="text-red-500 font-medium text-[13px]">{t("notActive")}</span>
                    </div>
                  ) : (
                    <button className="flex-1 bg-gradient-to-b from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 border-t border-red-500 text-white font-semibold py-1.5 rounded-full text-[13px] shadow-sm transition-colors">
                      {t("report")}
                    </button>
                  )}
                </div>
                <button 
                  className={`w-full text-white font-bold py-2 rounded-full text-[15px] transition-all ${
                    isOwnProfile 
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-900 hover:brightness-110 shadow-[0_6px_0_0_#064e3b,0_10px_20px_rgba(0,0,0,0.5)] active:shadow-[0_0px_0_0_#064e3b,0_0px_0px_rgba(0,0,0,0.5)] active:translate-y-[6px]" 
                      : "bg-gradient-to-r from-[#B066FE] to-[#10B981] hover:brightness-110 shadow-[0_6px_0_0_#0D9488,0_10px_20px_rgba(0,0,0,0.5)] active:shadow-[0_0px_0_0_#0D9488,0_0px_0px_rgba(0,0,0,0.5)] active:translate-y-[6px]"
                  }`}
                >
                  {isOwnProfile ? t("activate") : t("addReputation")}
                </button>
              </div>
              </div>

              
                </div>
            {/* Right Content Area */}
          <div className="flex-1 flex flex-col gap-4 md:mt-24 min-w-0">
            
            {/* Top Row: Friends & Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-4">
              <div className="flex items-center gap-6 sm:gap-10">
                  <div className="flex flex-col items-center cursor-pointer group">
                    <span className="text-[14px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">{t("friends")}</span>
                    <span className="text-[18px] font-bold text-black dark:text-white mt-0.5">1.210</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer group">
                    <span className="text-[14px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">{t("followers")}</span>
                    <span className="text-[18px] font-bold text-black dark:text-white mt-0.5">2.038</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer group">
                    <span className="text-[14px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">{t("following")}</span>
                    <span className="text-[18px] font-bold text-black dark:text-white mt-0.5">1.318</span>
                  </div>
                </div>
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                {isOwnProfile ? (
                  <button onClick={() => setIsEditModalOpen(true)} className="bg-gray-200 hover:bg-gray-300 dark:bg-[#4E4F50] dark:hover:bg-[#5E5F60] text-black dark:text-white font-bold py-2 px-5 rounded-full text-sm transition-colors shadow-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    {t("editProfile")}
                  </button>
                ) : (
                  <>
                    <button className="bg-[#10B981] hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full text-sm shadow-sm transition-colors">
                      {"+ " + t("addFriend")}
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full text-sm shadow-sm transition-colors">
                      {t("sendMessage")}
                    </button>
                    <button className="w-9 h-9 flex shrink-0 items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] text-gray-700 dark:text-[#E4E6EB] rounded-full transition-colors shadow-sm cursor-pointer">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 12a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

              
              {/* Suggestion Carousel */}
              <div className="w-full mt-2 mb-0">
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-[15px] font-bold text-black dark:text-white">{t("suggestedForYou")}</h3>
                  <button className="text-[13px] font-bold text-[#10B981] hover:text-emerald-700 transition-colors">{t("seeAll")}</button>
                </div>
                
                <div className="relative group">
                  {/* Left Arrow */}
                  <button 
                    onClick={() => scrollCarousel('left')} 
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                  </button>

                  {/* Carousel Container */}
                  <div ref={carouselRef} className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    
                    {/* Dummy Account 1 */}
                    <div className="w-[170px] shrink-0 bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3A3B3C] rounded-[24px] p-5 flex flex-col items-center shadow-sm snap-start">
                      <img src="/default-avatar.svg" alt="Avatar" className="w-[80px] h-[80px] rounded-full object-cover mb-3 border-[3px] border-gray-100 dark:border-[#3A3B3C]" />
                      <p className="text-[15px] font-bold text-black dark:text-white text-center leading-tight truncate w-full">Budi Santoso</p>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-1 truncate w-full text-center">@budis</p>
                      <p className="text-[12px] text-gray-400 dark:text-gray-500 mb-4 truncate w-full text-center">{t("dummyProf1")}</p>
                      <button className="w-full bg-[#10B981] hover:bg-emerald-600 text-white text-[13px] font-bold py-2 rounded-full transition-colors shadow-sm mt-auto">
                        + {t("addFriend")}
                      </button>
                    </div>

                    {/* Dummy Group 1 */}
                    <div className="w-[170px] shrink-0 bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3A3B3C] rounded-[24px] p-5 flex flex-col items-center shadow-sm snap-start">
                      <div className="w-[80px] h-[80px] rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mb-3 flex items-center justify-center text-white font-bold text-2xl shadow-inner">
                        NG
                      </div>
                      <p className="text-[15px] font-bold text-black dark:text-white text-center leading-tight truncate w-full">Next.js Indo</p>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-1 truncate w-full text-center">12K {t("members")}</p>
                      <p className="text-[12px] text-gray-400 dark:text-gray-500 mb-4 truncate w-full text-center">{t("dummyGroup1")}</p>
                      <button className="w-full border-2 border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white text-[13px] font-bold py-[7px] rounded-full transition-colors shadow-sm mt-auto">
                        {t("join")}
                      </button>
                    </div>

                    {/* Dummy Account 2 */}
                    <div className="w-[170px] shrink-0 bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3A3B3C] rounded-[24px] p-5 flex flex-col items-center shadow-sm snap-start">
                      <img src="/default-avatar.svg" alt="Avatar" className="w-[80px] h-[80px] rounded-full object-cover mb-3 border-[3px] border-gray-100 dark:border-[#3A3B3C]" />
                      <p className="text-[15px] font-bold text-black dark:text-white text-center leading-tight truncate w-full">Siti Aisyah</p>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-1 truncate w-full text-center">@siti_a</p>
                      <p className="text-[12px] text-gray-400 dark:text-gray-500 mb-4 truncate w-full text-center">{t("dummyProf2")}</p>
                      <button className="w-full bg-[#10B981] hover:bg-emerald-600 text-white text-[13px] font-bold py-2 rounded-full transition-colors shadow-sm mt-auto">
                        + {t("addFriend")}
                      </button>
                    </div>

                    {/* Dummy Group 2 */}
                    <div className="w-[170px] shrink-0 bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3A3B3C] rounded-[24px] p-5 flex flex-col items-center shadow-sm snap-start">
                      <div className="w-[80px] h-[80px] rounded-xl bg-gradient-to-br from-orange-400 to-red-500 mb-3 flex items-center justify-center text-white font-bold text-2xl shadow-inner">
                        UI
                      </div>
                      <p className="text-[15px] font-bold text-black dark:text-white text-center leading-tight truncate w-full">UI/UX Design</p>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-1 truncate w-full text-center">8.5K {t("members")}</p>
                      <p className="text-[12px] text-gray-400 dark:text-gray-500 mb-4 truncate w-full text-center">{t("dummyGroup2")}</p>
                      <button className="w-full border-2 border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white text-[13px] font-bold py-[7px] rounded-full transition-colors shadow-sm mt-auto">
                        {t("join")}
                      </button>
                    </div>

                    {/* Dummy Account 3 */}
                    <div className="w-[170px] shrink-0 bg-white dark:bg-[#242526] border border-gray-200 dark:border-[#3A3B3C] rounded-[24px] p-5 flex flex-col items-center shadow-sm snap-start">
                      <img src="/default-avatar.svg" alt="Avatar" className="w-[80px] h-[80px] rounded-full object-cover mb-3 border-[3px] border-gray-100 dark:border-[#3A3B3C]" />
                      <p className="text-[15px] font-bold text-black dark:text-white text-center leading-tight truncate w-full">Ahmad Reza</p>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-1 truncate w-full text-center">@areza</p>
                      <p className="text-[12px] text-gray-400 dark:text-gray-500 mb-4 truncate w-full text-center">{t("dummyProf3")}</p>
                      <button className="w-full bg-[#10B981] hover:bg-emerald-600 text-white text-[13px] font-bold py-2 rounded-full transition-colors shadow-sm mt-auto">
                        + {t("addFriend")}
                      </button>
                    </div>

                  </div>

                  {/* Right Arrow */}
                  <button 
                    onClick={() => scrollCarousel('right')} 
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>

                </div>
                
                {/* CSS to hide scrollbar but keep functionality */}
                <style dangerouslySetInnerHTML={{__html: `
                  .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                  }
                `}} />
              </div>


              {/* Tabs Navigation - Gradient Pill Style */}
              <div className="flex justify-center mt-6 w-full relative z-10">
                <ul className="flex gap-3 p-2">
                  {[
                    { id: 'posts', label: 'Post', gradientFrom: '#a955ff', gradientTo: '#ea51ff',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    },
                    { id: 'media', label: 'Media', gradientFrom: '#56CCF2', gradientTo: '#2F80ED',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    },
                    { id: 'project', label: 'Project', gradientFrom: '#FF9966', gradientTo: '#FF5E62',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                    }
                  ].map(({ id, label, icon, gradientFrom, gradientTo }) => (
                    <li
                      key={id}
                      onClick={() => setActiveTab(id)}
                      style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo } as React.CSSProperties}
                      className={`relative h-[52px] bg-white dark:bg-[#3A3B3C] shadow-lg dark:shadow-black/40 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer overflow-hidden ${activeTab === id ? 'w-[140px] shadow-none' : 'w-[52px] group hover:w-[140px]'}`}
                    >
                      {/* Gradient background */}
                      <span className={`absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-opacity duration-500 ${activeTab === id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                      {/* Blur glow */}
                      <span className={`absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] -z-10 transition-opacity duration-500 ${activeTab === id ? 'opacity-50' : 'opacity-0 group-hover:opacity-50'}`}></span>
                      {/* Icon */}
                      <span className={`relative z-10 text-gray-500 dark:text-gray-300 transition-all duration-300 ${activeTab === id ? 'scale-0 w-0 overflow-hidden' : 'scale-100 group-hover:scale-0 group-hover:w-0 group-hover:overflow-hidden'}`}>
                        {icon}
                      </span>
                      {/* Label */}
                      <span className={`absolute text-white uppercase tracking-wide text-sm font-bold transition-all duration-300 ${activeTab === id ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`} style={{ transitionDelay: activeTab === id ? '0ms' : '100ms' }}>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>


            


              {/* Tab Content Area */}
              <div className="mt-2 flex flex-col gap-4 max-w-[590px] w-full mx-auto">
                {activeTab === 'posts' ? (
                  <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] pt-4 px-0">
                    <div className="flex items-center justify-between pb-2 px-4 relative">
                      <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                          <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">
                            {username}
                          </h3>
                          <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">
                            2 jam lalu
                          </p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-[#B0B3B8] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                      </button>
                    </div>
                    <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-4 px-4 leading-relaxed">
                      Halo semuanya! Ini adalah contoh dummy postingan untuk tab <span className="capitalize font-semibold">{activeTab}</span>. Desain ini udah disesuaikan 100% dengan komponen postingan yang ada di halaman beranda. Jangan lupa ngopi hari ini ya! ☕🚀
                    </p>
                    <div className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] h-[300px] mb-2 flex items-center justify-center overflow-hidden">
                      <img src="/sampul-placeholder.png" alt="Post media" className="w-full h-full object-cover" />
                    </div>
                    <div className="px-4 pb-2">
                      <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-[#3E4042]">
                        <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                          Suka
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                          Komentar
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] text-[15px] font-semibold text-[#65676B] dark:text-[#B0B3B8] transition-colors bg-transparent">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                          Bagikan
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {activeTab === 'media' ? (
                  <>
                  <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-4">
                    {isOwnProfile && (
                      <div className="flex justify-end mb-4">
                        <button className="flex items-center gap-1.5 border-[2px] border-[#10B981] bg-transparent text-[#10B981] hover:bg-[#10B981] hover:text-white px-3 py-1 rounded-lg font-bold text-[13px] transition-colors shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                          Tambah Gallery
                        </button>
                      </div>
                    )}
                    <div className="relative group/album">
                        {/* Left Arrow */}
                        <button 
                          onClick={() => scrollAlbumCarousel('left')}
                          className="absolute -left-3 top-1/2 -translate-y-[80%] z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-[#3A3B3C] rounded-full shadow-md border border-gray-200 dark:border-[#4E4F50] text-gray-600 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        
                        {/* Carousel Container */}
                        <div ref={albumCarouselRef} className="flex overflow-x-auto gap-4 sidebar-scrollbar snap-x snap-mandatory py-2 px-1">

                      {[...Array(8)].map((_, i) => (
                        <div key={i} onClick={() => setActiveAlbumIdx(activeAlbumIdx === i ? null : i)} className={`shrink-0 w-[140px] snap-start flex flex-col gap-1.5 group cursor-pointer p-1 rounded-xl transition-colors ${activeAlbumIdx === i ? 'bg-gray-100 dark:bg-[#3A3B3C]' : 'hover:bg-gray-50 dark:hover:bg-[#3A3B3C]/50'}`}>
                          <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative border border-gray-100 dark:border-[#3E4042]">
                            <img src="/sampul-placeholder.png" alt={`Media ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                          </div>
                          <p className="text-[13px] font-semibold text-gray-700 dark:text-[#E4E6EB] truncate px-1">
                            Foto Liburan {i + 1}
                          </p>
                        </div>
                      ))}
                    
                        </div>
                        
                        {/* Right Arrow */}
                        <button 
                          onClick={() => scrollAlbumCarousel('right')}
                          className="absolute -right-3 top-1/2 -translate-y-[80%] z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-[#3A3B3C] rounded-full shadow-md border border-gray-200 dark:border-[#4E4F50] text-gray-600 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#4E4F50] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    </div>
                    
                    {activeAlbumIdx !== null && (
                    <div className="animate-in slide-in-from-top-2 fade-in duration-300 w-full mt-2">
                      <div className="flex items-center justify-between mb-4 px-1">
                         <h3 className="font-bold text-[17px] text-black dark:text-[#E4E6EB]">Isi Album: Foto Liburan {activeAlbumIdx + 1}</h3>
                         
                         <div className="flex items-center gap-4">
                           {/* Grid toggles */}
                           <div className="flex items-center bg-gray-200/60 dark:bg-[#242526] rounded-lg p-1 border border-gray-300/50 dark:border-[#3E4042]">
                              {[1, 3, 5].map((cols) => (
                                 <button 
                                    key={cols} 
                                    onClick={() => setAlbumGridCols(cols)} 
                                    className={`w-8 h-7 flex items-center justify-center rounded-md text-[13px] font-bold transition-all ${albumGridCols === cols ? 'bg-white dark:bg-[#4E4F50] text-black dark:text-white shadow-sm' : 'text-gray-500 dark:text-[#B0B3B8] hover:text-black dark:hover:text-white'}`}
                                 >
                                   {cols === 1 ? (
                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" /></svg>
                                   ) : cols === 3 ? (
                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 500 500"><g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
 stroke="none">
<path d="M270 4921 c-74 -23 -127 -69 -159 -141 -20 -44 -21 -62 -21 -772 l0
-728 745 0 745 0 0 825 0 825 -642 -1 c-354 0 -654 -4 -668 -8z"/>
<path d="M1680 4105 l0 -825 815 0 815 0 0 825 0 825 -815 0 -815 0 0 -825z"/>
<path d="M3420 4105 l0 -825 745 0 745 0 0 728 c0 710 -1 728 -21 772 -25 55
-62 95 -114 123 -40 22 -46 22 -697 25 l-658 3 0 -826z"/>
<path d="M90 2455 l0 -725 745 0 745 0 -2 723 -3 722 -742 3 -743 2 0 -725z"/>
<path d="M1680 2455 l0 -725 815 0 815 0 0 725 0 725 -815 0 -815 0 0 -725z"/>
<path d="M3420 2455 l0 -725 745 0 745 0 0 725 0 725 -745 0 -745 0 0 -725z"/>
<path d="M90 943 c0 -660 1 -679 21 -723 25 -55 62 -95 114 -123 40 -22 46
-22 698 -25 l657 -3 0 776 0 775 -745 0 -745 0 0 -677z"/>
<path d="M1680 845 l0 -775 815 0 815 0 0 775 0 775 -815 0 -815 0 0 -775z"/>
<path d="M3420 845 l0 -776 658 3 c651 3 657 3 697 25 52 28 89 68 114 123 20
44 21 63 21 723 l0 677 -745 0 -745 0 0 -775z"/>
</g></svg>
                                   ) : (
                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 500 500"><g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
 stroke="none">
<path d="M270 4921 c-77 -24 -148 -90 -168 -160 -9 -27 -12 -241 -12 -760 l0
-721 410 0 410 0 0 825 0 825 -307 -1 c-170 0 -319 -4 -333 -8z"/>
<path d="M1020 4105 l0 -825 475 0 475 0 0 825 0 825 -475 0 -475 0 0 -825z"/>
<path d="M2070 4105 l0 -825 475 0 475 0 0 825 0 825 -475 0 -475 0 0 -825z"/>
<path d="M3120 4105 l0 -825 455 0 455 0 0 825 0 825 -455 0 -455 0 0 -825z"/>
<path d="M4140 4106 l0 -826 385 0 385 0 0 721 c0 519 -3 733 -12 760 -15 51
-69 114 -122 142 -39 21 -54 22 -338 25 l-298 3 0 -825z"/>
<path d="M90 2455 l0 -725 410 0 410 0 0 725 0 725 -410 0 -410 0 0 -725z"/>
<path d="M1020 2455 l0 -725 475 0 475 0 -2 723 -3 722 -472 3 -473 2 0 -725z"/>
<path d="M2077 3173 c-4 -3 -7 -330 -7 -725 l0 -718 475 0 475 0 -2 723 -3
722 -466 3 c-256 1 -469 -1 -472 -5z"/>
<path d="M3127 3173 c-4 -3 -7 -330 -7 -725 l0 -718 455 0 455 0 0 725 0 725
-448 0 c-247 0 -452 -3 -455 -7z"/>
<path d="M4140 2455 l0 -725 385 0 385 0 0 725 0 725 -385 0 -385 0 0 -725z"/>
<path d="M90 943 c0 -660 1 -679 21 -723 25 -55 62 -95 114 -123 38 -21 54
-22 363 -25 l322 -3 0 775 0 776 -410 0 -410 0 0 -677z"/>
<path d="M1020 845 l0 -775 475 0 475 0 0 775 0 775 -475 0 -475 0 0 -775z"/>
<path d="M2070 845 l0 -775 475 0 475 0 0 775 0 775 -475 0 -475 0 0 -775z"/>
<path d="M3120 845 l0 -775 455 0 455 0 0 775 0 775 -455 0 -455 0 0 -775z"/>
<path d="M4140 844 l0 -775 298 3 c282 3 299 4 337 25 52 28 89 68 114 123 20
44 21 63 21 723 l0 677 -385 0 -385 0 0 -776z"/>
</g></svg>
                                   )}
                                 </button>
                              ))}
                           </div>
                           
                           {/* Close button */}
                           <button onClick={() => setActiveAlbumIdx(null)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#3A3B3C] flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors shadow-sm">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                           </button>
                         </div>
                      </div>
                      <div 
                         className={`grid gap-2 transition-all duration-300 ${albumGridCols === 1 ? 'grid-cols-1' : albumGridCols === 3 ? 'grid-cols-3' : 'grid-cols-5'}`}
                      >
                        {[...Array(10)].map((_, idx) => (
                           <div key={idx} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden group relative cursor-pointer">
                              <img src="/sampul-placeholder.png" alt={`Album item ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                           </div>
                        ))}
                      </div>
                    </div>
                  )}
                  </>
                ) : null}

                {activeTab === 'project' ? (
                  <div className="bg-white dark:bg-[#242526] rounded-[20px] shadow-sm border border-gray-100 dark:border-[#3A3B3C] p-8 text-center flex flex-col items-center justify-center min-h-[250px]">
                     <div className="w-16 h-16 bg-gray-100 dark:bg-[#3A3B3C] rounded-full flex items-center justify-center mb-4">
                       <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                     </div>
                     <p className="text-gray-800 dark:text-[#E4E6EB] font-bold text-[16px] mb-1">Belum ada project</p>
                     <p className="text-gray-500 dark:text-[#B0B3B8] text-[14px] max-w-[250px]">Saat ini {username} belum mempublikasikan project apapun.</p>
                  </div>
                ) : null}
              </div>


              
          </div>
      </div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        currentUser={currentUser} 
      />
    </main>
  );
}
