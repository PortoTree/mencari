
"use client";

import React, { useState, useEffect, use } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string; username: string; id: string }>;
}) {
  const t = useTranslations();

  const unwrappedParams = use(params);
  const username = unwrappedParams.username ? decodeURIComponent(unwrappedParams.username) : "pampam";
  const id = unwrappedParams.id || "123";

  const [activeTab, setActiveTab] = useState("semua");
  const [currentUser, setCurrentUser] = useState<any>({ username: "Guest", id: "1" });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);

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
    <main className="min-h-screen bg-[#EBEBEB] dark:bg-[#1E1E1E] text-black dark:text-[#E4E6EB] pb-20 pt-[56px] font-sans">
      <Navbar activeTab={null} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} themeLoaded={themeLoaded} currentUser={currentUser} />

      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        
        {/* Cover Photo */}
        <div className="w-full h-[280px] rounded-b-[40px] relative overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-sm">
          <img src="/sampul-placeholder.png" alt="Cover" className="w-full h-full object-cover" />
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col md:flex-row gap-6 -mt-[80px] px-2 md:px-6 relative z-10">
          
          {/* Left Sidebar - Profile Card */}
          <div className="w-full md:w-[320px] shrink-0 bg-gradient-to-b from-white to-[#D9D9D9] dark:from-[#3A3B3C] dark:to-[#18191A] rounded-[40px] p-8 shadow-xl flex flex-col items-center border border-white/20 dark:border-white/5">
            {/* Avatar */}
            <div className="w-[120px] h-[120px] rounded-full border-[4px] border-white dark:border-[#3A3B3C] bg-white dark:bg-[#242526] flex items-center justify-center shadow-md mb-4 overflow-hidden">
              <img src="/default-avatar.svg" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            
            <h1 className="text-2xl font-bold text-black dark:text-white">{username === "pampam" ? "nama akun" : username}</h1>
            <p className="text-[15px] text-gray-700 dark:text-gray-300 font-medium mb-8">@{username}</p>

            <div className="w-full space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Malang, Jawa timur
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                <span className="underline">mencari.online</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200 font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Web Development
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 flex flex-col gap-4 md:mt-24">
            
            {/* Top Row: Friends & Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-4">
              <div>
                <p className="font-bold text-[15px] mb-2 text-black dark:text-white">1.200 Teman</p>
                <div className="flex -space-x-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#10B981] border-2 border-[#EBEBEB] dark:border-[#1E1E1E] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 110-4 2 2 0 010 4zm7 10a1 1 0 01-2 0v-2a3 3 0 00-3-3H10a3 3 0 00-3 3v2a1 1 0 01-2 0v-2a5 5 0 015-5h6a5 5 0 015 5v2z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <button className="bg-[#10B981] hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full text-sm shadow-sm transition-colors">
                  + Tambah teman
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full text-sm shadow-sm transition-colors">
                  Kirim pesan
                </button>
              </div>
            </div>

            {/* Middle Row: Bio & Reputasi */}
            <div className="flex flex-col lg:flex-row gap-4 mt-2">
              
              {/* Bio Card */}
              <div className="flex-1 bg-white dark:bg-[#4E4F50] rounded-[30px] min-h-[200px] flex items-center justify-center shadow-sm">
                <p className="text-gray-400 font-semibold text-lg">Tidak ada bio</p>
              </div>

              {/* Reputasi Card */}
              <div className="w-full lg:w-[280px] shrink-0 bg-black rounded-[30px] p-5 flex flex-col justify-between shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {/* Reputasi Logo */}
                    <div className="w-[70px] h-[70px] shrink-0">
                       <img src="/reputasi.png" alt="Reputasi" className="w-full h-full object-contain drop-shadow-md" />
                    </div>
                  </div>
                  <div className="text-white">
                    <p className="font-semibold text-[17px] leading-tight">Belum ada</p>
                    <p className="font-semibold text-[17px] leading-tight">Reputasi</p>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-1.5 rounded-full text-[13px] transition-colors">Check</button>
                    <button className="flex-1 bg-orange-500 hover:bg-orange-400 text-white font-semibold py-1.5 rounded-full text-[13px] transition-colors">Laporkan!</button>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-emerald-400 hover:opacity-90 text-white font-bold py-2 rounded-full text-[15px] transition-all">
                    + Reputasi
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Tabs Navigation */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white dark:bg-black rounded-full shadow-lg px-2 py-1.5 flex items-center text-sm md:text-base font-bold text-gray-500 dark:text-gray-300">
            {['semua', 'postingan', 'media', 'komunitas'].map((tab, idx) => (
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
    </main>
  );
}
