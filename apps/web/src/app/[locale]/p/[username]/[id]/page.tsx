
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

  const [activeTab, setActiveTab] = useState("all");
  const [currentUser, setCurrentUser] = useState<any>({ username: "Guest", id: "1" });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

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
          
          {/* Left Sidebar - Profile Card Wrapper */}
            <div className="w-full md:w-[320px] shrink-0 relative flex flex-col">
              {/* Actual Profile Card */}
              <div className={`w-full bg-gradient-to-b from-white to-[#D9D9D9] dark:from-[#3A3B3C] dark:to-[#18191A] rounded-[40px] px-8 pt-8 pb-5 shadow-xl flex flex-col justify-between border border-white/20 dark:border-white/5 transition-all duration-300 ${isProfileExpanded ? "md:absolute md:top-0 md:left-0 md:right-0 md:h-auto md:min-h-full md:z-50" : "md:absolute md:top-0 md:left-0 md:right-0 md:h-auto md:min-h-full md:z-10"}`}>
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
            <p className="text-[15px] text-gray-700 dark:text-gray-300 font-medium mb-8">@{username}</p>

            
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

              </div>
            {/* Right Content Area */}
          <div className="flex-1 flex flex-col gap-4 md:mt-24">
            
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

            {/* Middle Row: Bio & Reputasi */}
            <div className="flex flex-col lg:flex-row gap-4 mt-2">
              
              {/* Bio Card */}
              <div className="flex-1 bg-[#F3F2EF] dark:bg-[#18191A] rounded-[18px] min-h-[200px] flex items-center justify-center shadow-sm relative group overflow-hidden border border-[#D9D9D9] dark:border-[#3A3B3C]">
                  <div className="w-full h-full grid grid-cols-3 gap-[2px] bg-gray-300 dark:bg-[#18191A]">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="bg-gradient-to-b from-white to-[#F3F2EF] dark:from-[#3A3B3C] dark:to-[#242526] w-full aspect-square flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-300 dark:text-gray-500 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      ))}
                    </div>
                  
              </div>

              {/* Reputasi Card */}
              <div className="w-full lg:w-[280px] shrink-0 bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-800/30 rounded-[30px] p-5 flex flex-col justify-between shadow-lg">
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

          </div>

        </div>

          {/* Tabs Container */}
          <div className="flex flex-col md:flex-row gap-6 px-2 md:px-6 mt-6">
            <div className="hidden md:block w-full md:w-[320px] shrink-0"></div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white dark:bg-black rounded-full shadow-lg px-2 py-1.5 flex items-center text-sm md:text-base font-bold text-gray-500 dark:text-gray-300">
                {['all', 'posts', 'media', 'project'].map((tab, idx) => (
                  <React.Fragment key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 md:px-8 py-2 rounded-full capitalize transition-colors ${activeTab === tab ? "text-[#10B981]" : "hover:text-black dark:hover:text-white"}`}
                    >
                      {tab}
                    </button>
                    {idx < 3 && <div className="w-[2px] h-[20px] bg-gray-300 dark:bg-gray-700 mx-1"></div>}
                  </React.Fragment>
                ))}
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
