"use client";

import React, { useState, useEffect, useRef } from "react";

function CustomSelect({ options, value, onChange, className, columns = 1, getIcon }: { options: string[], value: string, onChange: (val: string) => void, className?: string, columns?: number, getIcon?: (opt: string) => string | null }) {
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
               ? <img src={getIcon(value) || ''} alt={value} className="w-5 h-5 object-contain shrink-0" />
               : <div className="w-5 h-5 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full shrink-0"><svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></div>
           )}
           <span className="text-sm font-semibold truncate">{value}</span>
        </div>
        <svg className={`w-4 h-4 ml-2 shrink-0 text-gray-500 transition-transform duration-200 ${isOpen ? (dropUp ? "" : "rotate-180") : (dropUp ? "rotate-180" : "")}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
      </div>
      
      {isOpen && (
        <div className={`absolute z-50 ${columns === 2 ? 'w-[280px]' : 'w-full'} bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl overflow-hidden py-1.5 animate-in fade-in duration-150 ${dropUp ? "bottom-full mb-1.5 slide-in-from-bottom-2" : "top-full mt-1.5 slide-in-from-top-2"} ${columns === 2 ? "grid grid-cols-2 gap-1 px-1.5 py-2" : ""}`}>
          {options.map((opt, idx) => {
            const icon = getIcon ? getIcon(opt) : null;
            return (
            <div 
              key={idx}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`${columns === 2 ? "px-3 py-2 rounded-lg" : "px-4 py-2.5"} text-sm font-semibold cursor-pointer transition-colors flex items-center ${columns === 2 ? "gap-2" : "justify-between"} ${value === opt ? "text-[#10B981] bg-[#10B981]/10" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"}`}
            >
              {icon && <img src={icon} alt={opt} className="w-5 h-5 object-contain shrink-0" />}
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

  // Form States (for custom selects)
  const [gender, setGender] = useState("Pilih...");
  const [socialPlatform, setSocialPlatform] = useState("Instagram");
  
  // Privacy States
  const [privacyBirth, setPrivacyBirth] = useState("Publik");
  const [privacyLoc, setPrivacyLoc] = useState("Publik");
  const [privacyFriendList, setPrivacyFriendList] = useState("Publik");
  const [privacyComment, setPrivacyComment] = useState("Publik");
  const [privacyDM, setPrivacyDM] = useState("Izinkan");
  const [privacyTag, setPrivacyTag] = useState("Publik");
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
      case "Lainnya": return "https://";
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
    { label: "Tampilkan tanggal lahir", options: ["Publik", "Hanya Teman", "Privat"], state: privacyBirth, setState: setPrivacyBirth },
    { label: "Tampilkan lokasi", options: ["Publik", "Hanya Teman"], state: privacyLoc, setState: setPrivacyLoc },
    { label: "Siapa yang bisa melihat daftar teman Anda?", options: ["Publik", "Hanya Teman"], state: privacyFriendList, setState: setPrivacyFriendList },
    { label: "Siapa yang bisa mengomentari postingan Anda?", options: ["Publik", "Hanya Teman", "Matikan"], state: privacyComment, setState: setPrivacyComment },
    { label: "Izinkan public mengirim pesan langsung?", options: ["Izinkan", "Jangan izinkan"], state: privacyDM, setState: setPrivacyDM },
    { label: "Siapa yang bisa menandai (Tag/Mention) Anda?", options: ["Publik", "Hanya Teman"], state: privacyTag, setState: setPrivacyTag },
    { label: "Tampilkan status online", options: ["Tampilkan", "Sembunyikan"], state: privacyOnline, setState: setPrivacyOnline },
  ];

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white dark:bg-[#242526] w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
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
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-white dark:bg-[#242526] min-h-[550px]">
            
            {/* 1. INTRO */}
            {activeTab === "intro" && (
              <div className="space-y-4 max-w-2xl animate-in fade-in duration-200">
                <label className="block text-base font-bold text-gray-900 dark:text-white mb-2">Bio / Deskripsi</label>
                <textarea rows={5} placeholder="Ceritakan tentang diri Anda..." className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all resize-none"></textarea>
                <p className="text-xs text-gray-500">Tuliskan deskripsi singkat mengenai Anda agar orang lain lebih mengenal Anda.</p>
              </div>
            )}

            {/* 2. INFORMASI DASAR */}
            {activeTab === "dasar" && (
              <div className="space-y-6 max-w-2xl animate-in fade-in duration-200">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Tampilan</label>
                  <input type="text" defaultValue={currentUser?.username || "Nama Akun"} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Username</label>
                  <input type="text" defaultValue={currentUser?.username || "pampam"} disabled className="w-full px-4 py-2.5 rounded-xl bg-gray-200 dark:bg-[#2A2B2C] border border-transparent text-gray-500 outline-none cursor-not-allowed" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jenis Kelamin</label>
                    <CustomSelect options={["Pria", "Wanita", "Lainnya"]} value={gender} onChange={setGender} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tanggal Lahir</label>
                    <input type="date" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none cursor-pointer" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Lokasi (Kota, Provinsi)</label>
                  <input type="text" placeholder="Misal: Malang, Jawa Timur" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                </div>
              </div>
            )}

            {/* 3. TAMPILAN */}
            {activeTab === "tampilan" && (
              <div className="space-y-8 max-w-2xl animate-in fade-in duration-200">
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

                <hr className="border-gray-200 dark:border-gray-700" />

                <div>
                  <label className="block text-base font-bold text-gray-900 dark:text-white mb-3">Pilihan Tema / Layout Profil</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="theme" className="w-4 h-4 text-[#10B981] bg-gray-100 border-gray-300 focus:ring-[#10B981]" defaultChecked />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Default (Classic)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="theme" className="w-4 h-4 text-[#10B981] bg-gray-100 border-gray-300 focus:ring-[#10B981]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Modern Grid</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 4. PROFESI/PEKERJAAN */}
            {activeTab === "profesi" && (
              <div className="space-y-4 max-w-2xl animate-in fade-in duration-200">
                <label className="block text-base font-bold text-gray-900 dark:text-white mb-2">Profesi / Pekerjaan</label>
                <input type="text" placeholder="Misal: Web Developer, UI/UX Designer..." className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
              </div>
            )}

            {/* 5. LINKS */}
            {activeTab === "links" && (
              <div className="space-y-4 max-w-2xl animate-in fade-in duration-200">
                <label className="block text-base font-bold text-gray-900 dark:text-white mb-2">Kolom Tautan Eksternal</label>
                <div className="flex gap-3">
                  <input type="text" placeholder="https://website-kamu.com" className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                  <button className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/20 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
                <button className="text-sm font-bold text-[#10B981] hover:text-emerald-600 flex items-center gap-1.5 px-2 py-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                  Tambah Tautan
                </button>
              </div>
            )}

            {/* 6. SOCIAL MEDIA */}
            {activeTab === "sosmed" && (
              <div className="space-y-4 max-w-2xl animate-in fade-in duration-200 pb-32">
                <label className="block text-base font-bold text-gray-900 dark:text-white mb-2">Tautan Sosial Media</label>
                <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                  <CustomSelect 
                    className="w-full sm:w-[160px] shrink-0" 
                    options={["Instagram", "Whatsapp", "Facebook", "Tiktok", "Github", "Portotree", "Linkedin", "Youtube", "Telegram", "Twitter", "Lainnya"]} 
                    value={socialPlatform} 
                    onChange={setSocialPlatform}
                    columns={2}
                    getIcon={getSocialIcon}
                  />
                  <div className="flex-1 flex rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus-within:border-[#10B981] transition-colors overflow-hidden">
                    {getPrefix(socialPlatform) && (
                      <span className="pl-3 pr-2 py-2.5 text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center bg-gray-100 dark:bg-[#2A2B2C] border-r border-gray-200 dark:border-gray-600">
                        {getPrefix(socialPlatform)}
                      </span>
                    )}
                    <input 
                      type="text" 
                      placeholder={socialPlatform === "Lainnya" ? "domain.com" : "username"} 
                      className="flex-1 px-3 py-2.5 bg-transparent text-gray-900 dark:text-white outline-none text-sm w-full" 
                    />
                  </div>
                  <button className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/20 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
                <button className="text-sm font-bold text-[#10B981] hover:text-emerald-600 flex items-center gap-1.5 px-2 py-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                  Tambah Tautan
                </button>
              </div>
            )}

            {/* 7. SKILL */}
            {activeTab === "skill" && (
              <div className="space-y-4 max-w-2xl animate-in fade-in duration-200">
                <label className="block text-base font-bold text-gray-900 dark:text-white mb-2">Skill / Keahlian</label>
                <div className="flex gap-3">
                  <input type="text" placeholder="Misal: React, Node.js, Public Speaking..." className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none" />
                  <button className="bg-gray-800 dark:bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors">Tambah</button>
                </div>
              </div>
            )}

            {/* 8. HOBBY */}
            {activeTab === "hobby" && (
              <div className="space-y-4 max-w-2xl animate-in fade-in duration-200">
                <label className="block text-base font-bold text-gray-900 dark:text-white mb-2">Hobby</label>
                <div className="flex gap-3">
                  <input type="text" placeholder="Misal: Berenang, Membaca, dll..." className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none" />
                  <button className="bg-gray-800 dark:bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors">Tambah</button>
                </div>
              </div>
            )}

            {/* 9. MINAT */}
            {activeTab === "minat" && (
              <div className="space-y-6 max-w-2xl animate-in fade-in duration-200 pb-20">
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
              <div className="space-y-4 max-w-2xl animate-in fade-in duration-200 pb-24">
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
