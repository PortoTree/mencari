"use client";

import React, { useState, useEffect, useRef } from "react";

function CustomSelect({ options, value, onChange, className, columns = 1, getIcon }: { options: string[], value: string, onChange: (val: string) => void, className?: string, columns?: number, getIcon?: (opt: string) => any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOpen = () => {
    if (!isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      
      if (spaceBelow < 250 && rect.top > spaceBelow) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={ref} className={`relative ${className || ""}`}>
      <div 
        onClick={toggleOpen}
        className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 hover:border-[#10B981] dark:hover:border-[#10B981] cursor-pointer text-gray-900 dark:text-white transition-all shadow-sm"
      >
        <div className="flex items-center gap-2 overflow-hidden">
           {getIcon && (
             getIcon(value) 
               ? (typeof getIcon(value) === "string" ? <img src={getIcon(value)} alt={value} className="w-5 h-5 object-contain shrink-0" /> : getIcon(value))
               : <div className="w-5 h-5 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full shrink-0"><svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></div>
           )}
           <span className="text-sm font-semibold truncate">{value}</span>
        </div>
        <svg className={`w-4 h-4 ml-2 shrink-0 text-gray-500 transition-transform duration-200 ${isOpen ? (dropUp ? "" : "rotate-180") : (dropUp ? "rotate-180" : "")}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
      </div>
      
      {isOpen && (
        <div className={`absolute z-50 ${columns > 1 ? (columns === 4 ? 'w-[340px]' : 'w-[320px]') : 'w-full'} bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl py-1.5 animate-in fade-in duration-150 ${dropUp ? "bottom-full mb-1.5 slide-in-from-bottom-2" : "top-full mt-1.5 slide-in-from-top-2"} ${columns > 1 ? "grid gap-1 px-1.5 py-2 max-h-[250px] overflow-y-auto custom-scrollbar" : "overflow-hidden"} ${columns === 2 ? "grid-cols-2" : columns === 3 ? "grid-cols-3" : columns === 4 ? "grid-cols-4" : ""}`}>
          {options.map((opt, idx) => {
            const icon = getIcon ? getIcon(opt) : null;
            return (
            <div 
              key={idx}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`${columns > 1 ? "px-2 py-2 rounded-lg justify-center text-center" : "px-4 py-2.5 justify-between"} text-sm font-semibold cursor-pointer transition-colors flex items-center ${columns === 2 ? "gap-2 justify-start text-left" : ""} ${value === opt ? "text-[#10B981] bg-[#10B981]/10" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"}`}
            >
              {icon && (typeof icon === "string" ? <img src={icon} alt={opt} className="w-5 h-5 object-contain shrink-0" /> : icon)}
              {!icon && getIcon && <div className="w-5 h-5 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full shrink-0"><svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></div>}
              <span className="flex-1 truncate">{opt}</span>
              {value === opt && columns === 1 && (
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
              )}
            </div>
          )})}
        </div>
      )}
    </div>
  );
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

export default function EditProfileModal({ isOpen, onClose, currentUser }: EditProfileModalProps) {
  const [activeTab, setActiveTab] = useState("intro");

  // Intro States
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingGender, setIsEditingGender] = useState(false);
  const [isEditingDOB, setIsEditingDOB] = useState(false);
  const [dobDay, setDobDay] = useState("1");
  const [dobMonth, setDobMonth] = useState("Januari");
  const [dobYear, setDobYear] = useState("2000");
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingProfession, setIsEditingProfession] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [isEditingSosmed, setIsEditingSosmed] = useState(false);
  const [expCurrent, setExpCurrent] = useState(false);
  const [bioText, setBioText] = useState("");

  // Form States (for custom selects)
  const [gender, setGender] = useState("Pilih...");
  const [socialPlatform, setSocialPlatform] = useState("Instagram");
  
  // Privacy States
  const [privacyGender, setPrivacyGender] = useState("Public");
  const [privacyBirth, setPrivacyBirth] = useState("Public");
  const [privacyLoc, setPrivacyLoc] = useState("Public");
  const [privacyFriendList, setPrivacyFriendList] = useState("Public");
  const [privacyComment, setPrivacyComment] = useState("Public");
  const [privacyDM, setPrivacyDM] = useState("Izinkan");
  const [privacyTag, setPrivacyTag] = useState("Public");
  const [privacyOnline, setPrivacyOnline] = useState("Tampilkan");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getPrivacyIcon = (val: string) => {
    if (val === "Public") return <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
    if (val === "Hanya teman") return <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>;
    if (val === "Private") return <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>;
    return null;
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "Instagram": return "/sosmed/instagram.webp";
      case "Whatsapp": return "/sosmed/whatsapp.webp";
      case "Facebook": return "/sosmed/facebook.webp";
      case "Tiktok": return "/sosmed/tiktok.webp";
      case "Github": return "/sosmed/github.webp";
      case "Portotree": return "/sosmed/portotree.webp";
      case "Linkedin": return "/sosmed/linkedin.webp";
      case "Youtube": return "/sosmed/youtube.webp";
      case "Telegram": return "/sosmed/telegram.webp";
      case "Twitter": return "/sosmed/twiter.webp";
      default: return null;
    }
  };

  const getPrefix = (platform: string) => {
    switch (platform) {
      case "Instagram": return "instagram.com/";
      case "Whatsapp": return "wa.me/";
      case "Facebook": return "facebook.com/";
      case "Tiktok": return "tiktok.com/@";
      case "Github": return "github.com/";
      case "Portotree": return "portotree.com/p/";
      case "Linkedin": return "linkedin.com/in/";
      case "Youtube": return "youtube.com/@";
      case "Telegram": return "t.me/";
      case "Twitter": return "twitter.com/";
      default: return "";
    }
  };

  const TABS = [
    { id: "intro", label: "Intro" },
    { id: "dasar", label: "Informasi Dasar" },
    { id: "tampilan", label: "Tampilan" },
    { id: "profesi", label: "Profesi / Pekerjaan" },
    { id: "links", label: "Links" },
    { id: "sosmed", label: "Social Media" },
    { id: "skill", label: "Skill" },
    { id: "hobby", label: "Hobby" },
    { id: "minat", label: "Minat" },
    { id: "privasi", label: "Pengaturan Privasi" }
  ];

  const privacySettings = [
    { label: "Tampilkan tanggal lahir", options: ["Public", "Hanya teman", "Private"], state: privacyBirth, setState: setPrivacyBirth },
    { label: "Tampilkan lokasi", options: ["Public", "Hanya teman"], state: privacyLoc, setState: setPrivacyLoc },
    { label: "Siapa yang bisa melihat daftar teman Anda?", options: ["Public", "Hanya teman"], state: privacyFriendList, setState: setPrivacyFriendList },
    { label: "Siapa yang bisa mengomentari postingan Anda?", options: ["Public", "Hanya teman", "Matikan"], state: privacyComment, setState: setPrivacyComment },
    { label: "Izinkan public mengirim pesan langsung?", options: ["Izinkan", "Jangan izinkan"], state: privacyDM, setState: setPrivacyDM },
    { label: "Siapa yang bisa menandai (Tag/Mention) Anda?", options: ["Public", "Hanya teman"], state: privacyTag, setState: setPrivacyTag },
    { label: "Tampilkan status online", options: ["Tampilkan", "Sembunyikan"], state: privacyOnline, setState: setPrivacyOnline },
  ];

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white dark:bg-[#242526] w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header - Reduced padding */}
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edit Profil</h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          
          {/* Sidebar (Kiri) */}
          <div className="w-full md:w-[260px] shrink-0 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E1E1E] flex flex-col">
            {/* Tabs */}
            <div className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-[13px] transition-all ${
                    activeTab === tab.id 
                      ? "bg-[#10B981]/15 text-[#10B981] dark:bg-[#10B981]/10" 
                      : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-[#3A3B3C]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2.5 shrink-0">
              <button onClick={onClose} className="w-[40%] px-2 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">
                Batal
              </button>
              <button onClick={onClose} className="w-[60%] px-2 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors shadow-sm text-sm">
                Simpan
              </button>
            </div>
          </div>

          {/* Form Content (Kanan) */}
          <div className="flex-1 overflow-y-auto px-8 py-6 md:px-12 md:py-8 custom-scrollbar bg-white dark:bg-[#242526]">
            
            {/* 1. INTRO */}
            {activeTab === "intro" && (
              <div className="space-y-6 max-w-xl animate-in fade-in duration-200">
                {!isEditingBio ? (
                  <>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Bio</h3>
                      <button onClick={() => setIsEditingBio(true)} className="flex items-center gap-4 w-full px-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors text-left group">
                        <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"/></svg>
                        <span className="text-[15px] font-bold text-gray-700 dark:text-gray-300">About you</span>
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Pinned details</h3>
                      <button className="flex items-center gap-4 w-full px-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors text-left group">
                        <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
                        <span className="text-[15px] font-bold text-gray-700 dark:text-gray-300">Pinned details</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Bio</h3>
                    
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Edit Bio</label>
                      <textarea 
                        value={bioText}
                        onChange={(e) => { if(e.target.value.length <= 121) setBioText(e.target.value) }}
                        rows={4} 
                        placeholder="Introduce yourself" 
                        className="w-full px-4 py-3 rounded-xl bg-transparent border border-gray-300 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all resize-none"
                      ></textarea>
                      <div className="flex items-center justify-between mt-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                        <span className="text-xs font-medium text-gray-500">{bioText.length}/121</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <button onClick={() => setIsEditingBio(false)} className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">
                        Cancel
                      </button>
                      <button onClick={() => setIsEditingBio(false)} className="px-5 py-2 rounded-xl bg-gray-800 dark:bg-gray-600 text-white font-bold hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors text-sm">
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. INFORMASI DASAR */}
            {activeTab === "dasar" && (
              <div className="space-y-6 max-w-xl animate-in fade-in duration-200">
                {!isEditingName ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Identitas</h3>
                    <button onClick={() => setIsEditingName(true)} className="flex items-center gap-4 w-full px-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors text-left group">
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-transparent text-gray-500 dark:text-gray-400 font-bold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors text-[18px]">Aa</div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-bold text-gray-700 dark:text-gray-300">{currentUser?.username || "Nama Akun"}</span>
                        <span className="text-[13px] font-medium text-gray-500">@{currentUser?.username || "pampam"}</span>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Identitas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Tampilan</label>
                        <input type="text" defaultValue={currentUser?.username || "Nama Akun"} className="w-full px-4 py-2.5 rounded-xl bg-transparent border border-gray-300 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Username</label>
                        <input type="text" defaultValue={currentUser?.username || "pampam"} disabled className="w-full px-4 py-2.5 rounded-xl bg-gray-200 dark:bg-[#2A2B2C] border border-transparent text-gray-500 outline-none cursor-not-allowed" />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                      <button onClick={() => setIsEditingName(false)} className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">
                        Cancel
                      </button>
                      <button onClick={() => setIsEditingName(false)} className="px-5 py-2 rounded-xl bg-gray-800 dark:bg-gray-600 text-white font-bold hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors text-sm">
                        Save
                      </button>
                    </div>
                  </div>
                )}
                {!isEditingGender ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Jenis Kelamin</h3>
                    <button onClick={() => setIsEditingGender(true)} className="flex items-center gap-4 w-full px-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors text-left group">
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-transparent text-gray-500 dark:text-gray-400 font-bold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-bold text-gray-700 dark:text-gray-300">{gender !== "Pilih..." ? gender : "Tambahkan jenis kelamin"}</span>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Jenis Kelamin</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <CustomSelect options={["Pria", "Wanita", "Lainnya"]} value={gender} onChange={setGender} />
                      </div>
                      <CustomSelect className="w-full sm:w-[170px] shrink-0" options={["Public", "Hanya teman", "Private"]} value={privacyGender} onChange={setPrivacyGender} getIcon={getPrivacyIcon} />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                      <button onClick={() => setIsEditingGender(false)} className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">Cancel</button>
                      <button onClick={() => setIsEditingGender(false)} className="px-5 py-2 rounded-xl bg-gray-800 dark:bg-gray-600 text-white font-bold hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors text-sm">Save</button>
                    </div>
                  </div>
                )}

                {!isEditingDOB ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Tanggal Lahir</h3>
                    <button onClick={() => setIsEditingDOB(true)} className="flex items-center gap-4 w-full px-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors text-left group">
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-transparent text-gray-500 dark:text-gray-400 font-bold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-bold text-gray-700 dark:text-gray-300">{dobDay} {dobMonth} {dobYear}</span>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tanggal Lahir</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <div className="flex gap-2 w-full">
                          <CustomSelect 
                            className="flex-1" 
                            columns={4}
                            options={Array.from({length: 31}, (_, i) => String(i+1))} 
                            value={dobDay} 
                            onChange={setDobDay} 
                          />
                          <CustomSelect 
                            className="flex-1" 
                            columns={3}
                            options={["Jan.", "Feb.", "Mar.", "Apr.", "Mei", "Jun.", "Jul.", "Agu.", "Sep.", "Okt.", "Nov.", "Des."]} 
                            value={dobMonth} 
                            onChange={setDobMonth} 
                          />
                          <CustomSelect 
                            className="flex-1" 
                            columns={4}
                            options={Array.from({length: 100}, (_, i) => String(new Date().getFullYear() - i))} 
                            value={dobYear} 
                            onChange={setDobYear} 
                          />
                        </div>
                      </div>
                      <CustomSelect className="w-full sm:w-[170px] shrink-0" options={["Public", "Hanya teman", "Private"]} value={privacyBirth} onChange={setPrivacyBirth} getIcon={getPrivacyIcon} />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                      <button onClick={() => setIsEditingDOB(false)} className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">Cancel</button>
                      <button onClick={() => setIsEditingDOB(false)} className="px-5 py-2 rounded-xl bg-gray-800 dark:bg-gray-600 text-white font-bold hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors text-sm">Save</button>
                    </div>
                  </div>
                )}

                {!isEditingLocation ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Lokasi</h3>
                    <button onClick={() => setIsEditingLocation(true)} className="flex items-center gap-4 w-full px-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors text-left group">
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-transparent text-gray-500 dark:text-gray-400 font-bold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-bold text-gray-700 dark:text-gray-300">Tambahkan lokasi</span>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Lokasi</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <input type="text" placeholder="Misal: Malang, Jawa Timur" className="w-full px-4 py-2.5 rounded-xl bg-transparent border border-gray-300 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                      </div>
                      <CustomSelect className="w-full sm:w-[170px] shrink-0" options={["Public", "Hanya teman", "Private"]} value={privacyLoc} onChange={setPrivacyLoc} getIcon={getPrivacyIcon} />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 pb-4">
                      <button onClick={() => setIsEditingLocation(false)} className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">Cancel</button>
                      <button onClick={() => setIsEditingLocation(false)} className="px-5 py-2 rounded-xl bg-gray-800 dark:bg-gray-600 text-white font-bold hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors text-sm">Save</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. TAMPILAN */}
            {activeTab === "tampilan" && (
              <div className="space-y-8 max-w-xl animate-in fade-in duration-200">
                <div>
                  <label className="block text-base font-bold text-gray-900 dark:text-white mb-4">Avatar Profil</label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 relative group cursor-pointer shadow-sm shrink-0">
                      <img src="/default-avatar.svg" alt="Avatar" className="w-full h-full object-cover bg-white dark:bg-gray-800" />
                      <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                    </div>
                    <div>
                      <button className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-semibold transition-colors">Ubah Foto</button>
                      <p className="text-xs text-gray-500 mt-2">Format .JPG, .PNG atau .WEBP, max 2MB.</p>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div>
                  <label className="block text-base font-bold text-gray-900 dark:text-white mb-4">Gambar Sampul</label>
                  <div className="w-full h-[150px] rounded-2xl overflow-hidden relative group cursor-pointer border border-gray-200 dark:border-gray-700">
                    <img src="/sampul-placeholder.png" alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
                      <span className="text-white font-semibold flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                        Ubah Sampul
                      </span>
                    </div>
                  </div>
                </div>

                
              </div>
            )}

            {/* 4. PROFESI/PEKERJAAN */}
            {activeTab === "profesi" && (
              <div className="space-y-6 max-w-xl animate-in fade-in duration-200">
                
                {/* Profesi Saat Ini */}
                {!isEditingProfession ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Profesi saat ini</h3>
                    <button onClick={() => setIsEditingProfession(true)} className="flex items-center gap-4 w-full px-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors text-left group">
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-transparent text-gray-500 dark:text-gray-400 font-bold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <span className="text-[15px] font-bold text-gray-700 dark:text-gray-300">Tambahkan profesi</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Profesi saat ini</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <input type="text" placeholder="Misal: Web Developer, UI/UX Designer..." className="w-full px-4 py-2.5 rounded-xl bg-transparent border border-gray-300 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                      </div>
                      <div className="w-full sm:w-[150px] shrink-0 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-[#2A2B2C] border border-transparent flex items-center justify-start gap-2 text-gray-700 dark:text-gray-300 text-sm font-semibold cursor-not-allowed">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        Public
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                      <button onClick={() => setIsEditingProfession(false)} className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">Cancel</button>
                      <button onClick={() => setIsEditingProfession(false)} className="px-5 py-2 rounded-xl bg-gray-800 dark:bg-gray-600 text-white font-bold hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors text-sm">Save</button>
                    </div>
                  </div>
                )}

                {/* Pengalaman Kerja */}
                {!isEditingExperience ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Pengalaman kerja</h3>
                    <button onClick={() => setIsEditingExperience(true)} className="flex items-center gap-4 w-full px-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors text-left group">
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-transparent text-gray-500 dark:text-gray-400 font-bold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      </div>
                      <span className="text-[15px] font-bold text-gray-700 dark:text-gray-300">Tambahkan pengalaman kerja</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-200 pb-20">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pengalaman kerja</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jabatan</label>
                        <input type="text" placeholder="Misal: Senior Frontend Engineer" className="w-full px-4 py-2.5 rounded-xl bg-transparent border border-gray-300 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Perusahaan</label>
                        <input type="text" placeholder="Misal: PT Teknologi Cerdas" className="w-full px-4 py-2.5 rounded-xl bg-transparent border border-gray-300 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tahun Mulai</label>
                          <input type="number" placeholder="2020" className="w-full px-4 py-2.5 rounded-xl bg-transparent border border-gray-300 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tahun Akhir</label>
                          <input type="number" placeholder="2024" disabled={expCurrent} className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all ${expCurrent ? 'bg-gray-100 dark:bg-[#2A2B2C] border-transparent text-gray-400 cursor-not-allowed' : 'bg-transparent border-gray-300 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white'}`} />
                        </div>
                      </div>
                      
                      <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                        <input type="checkbox" checked={expCurrent} onChange={(e) => setExpCurrent(e.target.checked)} className="w-4 h-4 rounded text-[#10B981] border-gray-300 focus:ring-[#10B981]" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Saya masih bekerja di sini</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <button onClick={() => setIsEditingExperience(false)} className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">Cancel</button>
                      <button onClick={() => setIsEditingExperience(false)} className="px-5 py-2 rounded-xl bg-gray-800 dark:bg-gray-600 text-white font-bold hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors text-sm">Save</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. LINKS */}
            {activeTab === "links" && (
              <div className="space-y-6 max-w-xl animate-in fade-in duration-200">
                {!isEditingLinks ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Kolom Tautan Eksternal</h3>
                    <button onClick={() => setIsEditingLinks(true)} className="flex items-center gap-4 w-full px-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors text-left group">
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-transparent text-gray-500 dark:text-gray-400 font-bold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      </div>
                      <span className="text-[15px] font-bold text-gray-700 dark:text-gray-300">Tambahkan tautan</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Kolom Tautan Eksternal</h3>
                    
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <input type="text" placeholder="https://website-kamu.com" className="flex-1 px-4 py-2.5 rounded-xl bg-transparent border border-gray-300 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                        <button className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/20 shrink-0 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                      
                      <button className="text-sm font-bold text-[#10B981] hover:text-emerald-600 flex items-center gap-1.5 px-1 py-1 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                        Tambah Tautan
                      </button>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button onClick={() => setIsEditingLinks(false)} className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">Cancel</button>
                      <button onClick={() => setIsEditingLinks(false)} className="px-5 py-2 rounded-xl bg-gray-800 dark:bg-gray-600 text-white font-bold hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors text-sm">Save</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 6. SOCIAL MEDIA */}
            {activeTab === "sosmed" && (
              <div className="space-y-6 max-w-xl animate-in fade-in duration-200 pb-32">
                {!isEditingSosmed ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Tautan Sosial Media</h3>
                    <button onClick={() => setIsEditingSosmed(true)} className="flex items-center gap-4 w-full px-2 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors text-left group">
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-transparent text-gray-500 dark:text-gray-400 font-bold group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      </div>
                      <span className="text-[15px] font-bold text-gray-700 dark:text-gray-300">Tambahkan sosial media</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-200 relative z-10">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tautan Sosial Media</h3>
                    
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <CustomSelect 
                          className="w-full sm:w-[160px] shrink-0" 
                          options={["Instagram", "Whatsapp", "Facebook", "Tiktok", "Github", "Portotree", "Linkedin", "Youtube", "Telegram", "Twitter"]} 
                          value={socialPlatform === "Lainnya" ? "Instagram" : socialPlatform} 
                          onChange={setSocialPlatform}
                          columns={2}
                          getIcon={getSocialIcon}
                        />
                        <div className="flex-1 flex rounded-xl bg-transparent border border-gray-300 dark:border-gray-600 focus-within:border-[#10B981] focus-within:ring-1 focus-within:ring-[#10B981] transition-all overflow-hidden">
                          {getPrefix(socialPlatform) && (
                            <span className="pl-3 pr-2 py-2.5 text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center bg-gray-100 dark:bg-[#2A2B2C] border-r border-gray-300 dark:border-gray-600 shrink-0 max-w-[120px] overflow-hidden truncate">
                              {getPrefix(socialPlatform)}
                            </span>
                          )}
                          <input 
                            type="text" 
                            placeholder="username" 
                            className="flex-1 px-3 py-2.5 bg-transparent text-gray-900 dark:text-white outline-none text-sm w-full min-w-0" 
                          />
                        </div>
                        <button className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/20 shrink-0 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>

                      <button className="text-sm font-bold text-[#10B981] hover:text-emerald-600 flex items-center gap-1.5 px-1 py-1 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                        Tambah Sosial Media
                      </button>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button onClick={() => setIsEditingSosmed(false)} className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">Cancel</button>
                      <button onClick={() => setIsEditingSosmed(false)} className="px-5 py-2 rounded-xl bg-gray-800 dark:bg-gray-600 text-white font-bold hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors text-sm">Save</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 7. SKILL */}
            {activeTab === "skill" && (
              <div className="space-y-4 max-w-xl animate-in fade-in duration-200">
                <label className="block text-base font-bold text-gray-900 dark:text-white mb-2">Skill / Keahlian</label>
                <div className="flex gap-3">
                  <input type="text" placeholder="Misal: React, Node.js, Public Speaking..." className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none" />
                  <button className="bg-gray-800 dark:bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors">Tambah</button>
                </div>
              </div>
            )}

            {/* 8. HOBBY */}
            {activeTab === "hobby" && (
              <div className="space-y-4 max-w-xl animate-in fade-in duration-200">
                <label className="block text-base font-bold text-gray-900 dark:text-white mb-2">Hobby</label>
                <div className="flex gap-3">
                  <input type="text" placeholder="Misal: Berenang, Membaca, dll..." className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none" />
                  <button className="bg-gray-800 dark:bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors">Tambah</button>
                </div>
              </div>
            )}

            {/* 9. MINAT */}
            {activeTab === "minat" && (
              <div className="space-y-6 max-w-xl animate-in fade-in duration-200 pb-20">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Kategori Minat</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pilih kategori yang Anda minati untuk ditampilkan di profil.</p>
                </div>
                
                {[
                  { title: "Music", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" },
                  { title: "TV programmes", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                  { title: "Films", icon: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" },
                  { title: "Games", icon: "M11 11V9a2 2 0 00-2-2m2 4v2a2 2 0 01-2 2m2-4h2a2 2 0 012 2m-2-4h.01M15 13h.01M7 21h10a4 4 0 004-4v-6a4 4 0 00-4-4H7a4 4 0 00-4 4v6a4 4 0 004 4z" },
                  { title: "Sports teams and athletes", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
                ].map((item, i) => (
                  <div key={i} className="group flex flex-col gap-3">
                    <div className="flex items-center gap-4 px-2">
                      <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-[#10B981] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon}/></svg>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200">{item.title}</h4>
                    </div>
                    <div className="ml-12">
                      <button className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-[#10B981] dark:hover:text-[#10B981] flex items-center gap-1.5 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                        Tambahkan {item.title}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 10. PRIVASI */}
            {activeTab === "privasi" && (
              <div className="space-y-4 max-w-xl animate-in fade-in duration-200 pb-24">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pengaturan Privasi</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Atur siapa saja yang bisa melihat dan berinteraksi dengan profil Anda.</p>
                </div>
                {privacySettings.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-[#3A3B3C]/40 border border-gray-100 dark:border-gray-700/50 hover:border-[#10B981]/30 transition-colors">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">{item.label}</label>
                    <CustomSelect className="w-full sm:w-[160px]" options={item.options} value={item.state} onChange={item.setState} />
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
