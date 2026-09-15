"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Beranda() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<any>({ username: "User", displayName: "" });
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isChatSettingsOpen, setIsChatSettingsOpen] = useState(false);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isChatFilterOpen, setIsChatFilterOpen] = useState(false);
  const chatSettingsRef = useRef<HTMLDivElement>(null);
  const chatFilterRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (chatSettingsRef.current && !chatSettingsRef.current.contains(event.target as Node)) {
        setIsChatSettingsOpen(false);
      }
      if (chatFilterRef.current && !chatFilterRef.current.contains(event.target as Node)) {
        setIsChatFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username || payload.name) {
          setCurrentUser({
            username: payload.username || payload.name || "User",
            displayName: payload.displayName || payload.username || payload.name || "User"
          });
        }
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#F3F2EF] text-black pb-10">
      {/* Navbar Fixed Top */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 h-[56px] px-4 flex items-center justify-between border-b border-gray-200">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-[36px] h-[36px] object-cover rounded-full" />
          <div className="hidden md:flex items-center bg-[#F0F2F5] rounded-full px-3 py-2 w-64 ml-1">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Cari..." 
              className="bg-transparent border-none focus:outline-none ml-2 w-full text-[15px] placeholder-gray-500" 
            />
          </div>
        </div>

        {/* Center: Tabs */}
        <div className="hidden md:flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2 h-full">
          <div className="flex flex-col items-center justify-center w-[110px] h-full border-b-[3px] border-[#0866FF] text-[#0866FF] cursor-pointer">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-[11px] font-semibold mt-0.5">Beranda</span>
          </div>
          <div className="flex flex-col items-center justify-center w-[110px] h-full text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors my-1 border-b-[3px] border-transparent">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span className="text-[11px] font-semibold mt-0.5">Teman</span>
          </div>
          <div className="flex flex-col items-center justify-center w-[110px] h-full text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors my-1 border-b-[3px] border-transparent">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span className="text-[11px] font-semibold mt-0.5">Grub</span>
          </div>
        </div>

        {/* Right: Icons & Avatar */}
        <div className="flex items-center gap-2 relative">
          <div className="relative group flex items-center justify-center">
            <button className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95 mr-1">
              <img src="/logo-chat.png" alt="Chat" className="w-[32px] h-[32px] object-contain" />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Chat
            </div>
          </div>

          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-[#E4E6EB] flex items-center justify-center text-black hover:bg-gray-300 transition-colors">
              <img src="/pemberitahuan.svg" alt="Pemberitahuan" className="w-[22px] h-[22px] object-contain" />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Pemberitahuan
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="w-[1px] h-6 bg-gray-300 mx-1"></div>

          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-[#E4E6EB] flex items-center justify-center text-black hover:bg-gray-300 transition-colors">
              <img src="/menu.svg" alt="Menu" className="w-[22px] h-[22px] object-contain" />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Menu
            </div>
          </div>
          
          <div className="relative ml-1" ref={dropdownRef}>
            <div className="relative cursor-pointer group" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <button className="w-10 h-10 rounded-full bg-[#E4E6EB] flex items-center justify-center overflow-hidden border border-gray-300">
                <svg className="w-6 h-6 text-gray-500 mt-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              </button>
              {/* Arrow Down Badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-[16px] h-[16px] bg-[#E4E6EB] rounded-full flex items-center justify-center border-2 border-white">
                <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </div>
              <div className="absolute top-12 right-0 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
                Informasi
              </div>
            </div>

            {/* Dropdown Profile Panel */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-[340px] bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-200 p-4 z-50">
                <div className="bg-[#F2F2F2] rounded-xl p-3 flex items-center gap-3 mb-2 hover:bg-[#E4E6EB] cursor-pointer transition-colors shadow-sm border border-gray-100">
                  <div className="w-[40px] h-[40px] bg-[#E4E6EB] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300">
                    <svg className="w-6 h-6 text-gray-500 mt-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-black leading-tight">{currentUser.username}</h3>
                    <p className="text-[14px] text-gray-500">Lihat semua profil</p>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gray-200 my-3"></div>

                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#F2F2F2] transition-colors group/item">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#E4E6EB] flex items-center justify-center shrink-0">
                        <svg className="w-[20px] h-[20px] text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                      </div>
                      <span className="font-semibold text-[15px] text-black">Pengaturan & privasi</span>
                    </div>
                    <svg className="w-6 h-6 text-gray-500 group-hover/item:text-black transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  </button>

                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#F2F2F2] transition-colors group/item">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#E4E6EB] flex items-center justify-center shrink-0">
                        <svg className="w-[20px] h-[20px] text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                      </div>
                      <span className="font-semibold text-[15px] text-black">Bantuan & dukungan</span>
                    </div>
                    <svg className="w-6 h-6 text-gray-500 group-hover/item:text-black transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  </button>

                  <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] transition-colors">
                    <div className="w-9 h-9 rounded-full bg-[#E4E6EB] flex items-center justify-center shrink-0">
                      <svg className="w-[20px] h-[20px] text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="font-semibold text-[15px] text-black">Laporkan masalah</span>
                  </button>

                  <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] transition-colors">
                    <div className="w-9 h-9 rounded-full bg-[#E4E6EB] flex items-center justify-center shrink-0">
                      <svg className="w-[20px] h-[20px] text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                    </div>
                    <span className="font-semibold text-[15px] text-black">Tema gelap</span>
                  </button>

                  <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#F2F2F2] transition-colors">
                    <div className="w-9 h-9 rounded-full bg-[#E4E6EB] flex items-center justify-center shrink-0">
                      <svg className="w-[20px] h-[20px] text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="font-semibold text-[15px] text-black">Keluar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex w-full pt-6">
        
        {/* Left Sidebar */}
        <div className="hidden lg:block fixed left-0 top-[56px] w-[280px] xl:w-[320px] h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-20 bg-gray-200 w-full relative">
              {/* Profile image overlapping */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[72px] h-[72px] bg-white rounded-full p-1 shadow-sm">
                <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                  <svg className="w-10 h-10 text-blue-500 mt-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </div>
            <div className="pt-10 pb-5 text-center">
              <h3 className="font-bold text-[17px] text-black">{currentUser.username}</h3>
              <p className="text-[15px] text-gray-500 mt-1 hover:underline cursor-pointer">Lihat profil</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 space-y-1">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#F2F2F2] transition-colors">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span className="font-semibold text-[15px] text-black">Teman</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#F2F2F2] transition-colors">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              <span className="font-semibold text-[15px] text-black">Tersimpan</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#F2F2F2] transition-colors">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="font-semibold text-[15px] text-black">Grub</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#F2F2F2] transition-colors">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="font-semibold text-[15px] text-black">Acara</span>
            </button>
          </div>
        </div>
      </div>

        {/* Center Main Feed */}
        <div className="flex-1 flex justify-center lg:ml-[280px] xl:ml-[320px] lg:mr-[280px] xl:mr-[320px]">
          <div className="space-y-4 max-w-[590px] w-full px-4">
            {/* Create Post Input */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-gray-500 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="Posting dan buat orang mencarimu" 
                className="w-full bg-[#F0F2F5] hover:bg-[#E4E6EB] transition-colors rounded-full px-4 py-2.5 focus:outline-none cursor-pointer text-gray-600 text-[17px]"
                readOnly
              />
            </div>
            <div className="flex justify-between items-center pt-3 px-1">
              <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] hover:bg-[#F2F2F2] p-2 rounded-lg flex-1 justify-center transition-colors">
                <svg className="w-[24px] h-[24px] text-[#45BD62]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                Foto
              </button>
              <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] hover:bg-[#F2F2F2] p-2 rounded-lg flex-1 justify-center transition-colors">
                <svg className="w-[24px] h-[24px] text-[#1877F2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>
                Link
              </button>
              <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] hover:bg-[#F2F2F2] p-2 rounded-lg flex-1 justify-center transition-colors">
                <svg className="w-[24px] h-[24px] text-[#F5C33B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                Acara
              </button>
              <button className="flex items-center gap-2 text-[15px] font-semibold text-[#65676B] hover:bg-[#F2F2F2] p-2 rounded-lg flex-1 justify-center transition-colors">
                <svg className="w-[24px] h-[24px] text-[#F35369]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" /></svg>
                Lainnya
              </button>
            </div>
          </div>

          {/* Dummy Post 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3 pb-2">
              <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-gray-500 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-black text-[15px] leading-tight">Pengguna</h3>
              </div>
            </div>
            <p className="text-black text-[15px] mb-4">saya mencari web development</p>
            <div className="flex items-center gap-1 pt-2 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-[#F2F2F2] text-[15px] font-semibold text-[#65676B] transition-colors bg-[#F2F2F2]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
                Like
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-[#F2F2F2] text-[15px] font-semibold text-[#65676B] transition-colors bg-[#F2F2F2]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                Coment
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-[#F2F2F2] text-[15px] font-semibold text-[#65676B] transition-colors bg-[#F2F2F2]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
                Share
              </button>
            </div>
          </div>

          {/* Dummy Post 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 pt-4 px-0">
            <div className="flex items-center gap-3 pb-2 px-4">
              <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-gray-500 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-black text-[15px] leading-tight">Naufal faiz</h3>
                <p className="text-[13px] text-gray-500">Web Development</p>
              </div>
            </div>
            <p className="text-black text-[15px] mb-3 px-4">Saya web development mencari client🥰</p>
            <div className="w-full bg-[#F0F2F5] h-[300px] mb-2 flex items-center justify-center overflow-hidden">
               {/* Placeholder for Image */}
               <div className="w-full h-full bg-[#E4E6EB] relative">
                 <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 </div>
               </div>
            </div>
            <div className="px-4 pb-4">
              <div className="flex items-center gap-1 pt-2 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-[#F2F2F2] text-[15px] font-semibold text-[#65676B] transition-colors bg-[#F2F2F2]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
                  Like
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-[#F2F2F2] text-[15px] font-semibold text-[#65676B] transition-colors bg-[#F2F2F2]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                  Coment
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg hover:bg-[#F2F2F2] text-[15px] font-semibold text-[#65676B] transition-colors bg-[#F2F2F2]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
                  Share
                </button>
              </div>
            </div>
          </div>

          </div>
        </div>
        </div>

        {/* Right Sidebar (Chat Panel) */}
        <div className="hidden lg:block relative z-50">
           {/* Chat Bubble Fixed bottom right */}
           <div className={`fixed bottom-0 right-[80px] w-[300px] bg-white rounded-t-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] border border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${isChatExpanded ? 'h-[500px]' : 'h-[48px]'}`}>
             
             {/* Header */}
             <div 
               onClick={() => setIsChatExpanded(!isChatExpanded)}
               className="px-3 py-2 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 cursor-pointer rounded-t-xl transition-colors shrink-0 h-[48px]"
             >
               <div className="flex items-center gap-2">
                 <div className="relative">
                   <div className="w-8 h-8 rounded-full bg-[#0866FF] flex items-center justify-center text-white shrink-0">
                     <svg className="w-5 h-5 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                   </div>
                   <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#31A24C] rounded-full border-2 border-white"></div>
                 </div>
                 <span className="font-semibold text-black text-[15px]">Obrolan</span>
               </div>
               <div className="flex items-center gap-2 text-gray-500">
                   <div className={`relative ${isChatExpanded ? 'block' : 'hidden'}`} ref={chatSettingsRef}>
                   <button 
                     onClick={(e) => { e.stopPropagation(); setIsChatSettingsOpen(!isChatSettingsOpen); }}
                     className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                   >
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                   </button>
                   
                   {/* Chat Settings Dropdown */}
                   {isChatSettingsOpen && (
                     <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 py-1.5 z-50">
                       <button 
                         onClick={(e) => e.stopPropagation()}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[14px] font-semibold text-gray-700 transition-colors"
                       >
                         <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                         Kelola obrolan
                       </button>
                       <button 
                         onClick={(e) => e.stopPropagation()}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[14px] font-semibold text-gray-700 transition-colors"
                       >
                         <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                         Pengaturan
                       </button>
                     </div>
                   )}
                 </div>
                 <button 
                   onClick={(e) => { e.stopPropagation(); setIsNewMessageOpen(!isNewMessageOpen); }}
                   className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                 </button>
                 <button onClick={(e) => e.stopPropagation()} className="p-1.5 hover:bg-gray-200 rounded-full transition-colors pointer-events-none">
                   {isChatExpanded ? (
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                   ) : (
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                   )}
                 </button>
               </div>
             </div>

             {/* Expanded Content */}
             <div className={`flex-1 flex flex-col overflow-hidden transition-opacity duration-300 ${isChatExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
               
               {/* Tabs */}
               <div className="flex items-center gap-1 px-3 pt-1 border-b border-gray-200 shrink-0">
                 <button className="px-3 py-1.5 font-semibold text-[14px] text-blue-600 border-b-2 border-blue-600">Semua</button>
                 <button className="px-3 py-1.5 font-semibold text-[14px] text-gray-500 hover:text-gray-800 transition-colors">Belum dibaca</button>
                 
                 <div className="ml-auto relative" ref={chatFilterRef}>
                   <div 
                     onClick={(e) => { e.stopPropagation(); setIsChatFilterOpen(!isChatFilterOpen); }}
                     className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
                   >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M10 18h4" /></svg>
                   </div>

                   {/* Filter Dropdown */}
                   {isChatFilterOpen && (
                     <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 py-1.5 z-50">
                       <button onClick={(e) => e.stopPropagation()} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[14px] font-semibold text-gray-700 transition-colors">
                         Favorit
                       </button>
                       <button onClick={(e) => e.stopPropagation()} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[14px] font-semibold text-gray-700 transition-colors">
                         Grub Chat
                       </button>
                       <button onClick={(e) => e.stopPropagation()} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[14px] font-semibold text-gray-700 transition-colors">
                         Daftar Obrolan
                       </button>
                       <button onClick={(e) => e.stopPropagation()} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-[14px] font-semibold text-gray-700 transition-colors">
                         Diarsipkan
                       </button>
                     </div>
                   )}
                 </div>
               </div>

               {/* Chat List */}
               <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                 {/* Chat Item */}
                 <div className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="w-12 h-12 bg-[#0866FF] rounded-full flex items-center justify-center text-white font-bold text-[18px] shrink-0">
                      in
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-baseline">
                          <h4 className="font-semibold text-[14px] text-black truncate">Budi Santoso</h4>
                          <span className="text-[12px] text-gray-500 shrink-0">1 Jun</span>
                       </div>
                       <p className="text-[13px] text-gray-500 truncate mt-0.5">Halo bro, apa kabar? Udah la...</p>
                    </div>
                 </div>
                 
                 {/* Chat Item 2 */}
                 <div className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-[18px] shrink-0 relative">
                      S
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#31A24C] rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-baseline">
                          <h4 className="font-semibold text-[14px] text-black truncate">Siti Aminah</h4>
                          <span className="text-[12px] text-gray-500 shrink-0">Rab</span>
                       </div>
                       <p className="text-[13px] text-gray-500 truncate mt-0.5">Project kemarin gimana kelanjutannya?</p>
                    </div>
                 </div>
               </div>

             </div>
           </div>
        </div>

        {/* New Message Panel */}
        <div className={`hidden lg:flex fixed bottom-0 right-[396px] w-[300px] bg-white rounded-t-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] border border-gray-200 flex-col z-50 transition-all duration-300 ease-in-out transform origin-bottom ${isNewMessageOpen ? 'scale-y-100 opacity-100 h-[420px]' : 'scale-y-0 opacity-0 h-0 pointer-events-none'}`}>
          {/* Header */}
          <div className="px-3 py-2 flex items-center justify-between border-b border-gray-100 shrink-0 h-[48px]">
             <span className="font-semibold text-black text-[15px] pl-1">Pesan baru</span>
             <button 
               onClick={() => setIsNewMessageOpen(false)}
               className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
          
          {/* To: Input */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
             <span className="text-gray-500 text-[15px]">Ke:</span>
             <input type="text" className="flex-1 outline-none text-[15px] bg-transparent text-black placeholder-gray-400" />
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
             {/* Pam Faiz */}
             <div className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                   <svg className="w-7 h-7 text-gray-500 mt-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                   <span className="font-semibold text-[15px] text-black truncate">Pam Faiz</span>
                </div>
             </div>
          </div>
        </div>

    </main>
  );
}
