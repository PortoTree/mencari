"use client";

import React, { useState, useEffect } from "react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

export default function EditProfileModal({ isOpen, onClose, currentUser }: EditProfileModalProps) {
  const [activeTab, setActiveTab] = useState("dasar");

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

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white dark:bg-[#242526] w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profil</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300"
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
            <div className="flex-1 p-4 space-y-2 overflow-y-auto">
              {[
                { id: "dasar", label: "Informasi Dasar" },
                { id: "sosial", label: "Sosial & Minat" },
                { id: "privasi", label: "Pengaturan Privasi" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    activeTab === tab.id 
                      ? "bg-[#10B981]/15 text-[#10B981] dark:bg-[#10B981]/10" 
                      : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3 shrink-0">
              <button onClick={onClose} className="w-full px-6 py-3 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-bold transition-colors shadow-sm">
                Simpan Perubahan
              </button>
              <button onClick={onClose} className="w-full px-5 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Batal
              </button>
            </div>
          </div>

          {/* Form Content (Kanan) */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-white dark:bg-[#242526]">
            
            {/* TAB 1: INFORMASI DASAR */}
            {activeTab === "dasar" && (
              <div className="space-y-6 max-w-2xl">
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 relative group cursor-pointer shadow-sm">
                      <img src="/default-avatar.svg" alt="Avatar" className="w-full h-full object-cover bg-white dark:bg-gray-800" />
                      <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-[#10B981] font-semibold cursor-pointer hover:underline">Ubah Foto</span>
                  </div>
                  <div className="flex-1 w-full space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Tampilan</label>
                      <input type="text" defaultValue={currentUser?.username || "Nama Akun"} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Username (Unik)</label>
                      <input type="text" defaultValue={currentUser?.username || "pampam"} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Bio / Deskripsi</label>
                  <textarea rows={4} placeholder="Ceritakan tentang diri Anda..." className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all resize-none"></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Jenis Kelamin</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none cursor-pointer">
                      <option>Pilih...</option>
                      <option>Pria</option>
                      <option>Wanita</option>
                    </select>
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

            {/* TAB 2: SOSIAL & MINAT */}
            {activeTab === "sosial" && (
              <div className="space-y-8 max-w-2xl">
                <div>
                  <label className="block text-base font-bold text-gray-900 dark:text-white mb-4">Minat & Hobi</label>
                  <div className="flex flex-wrap gap-2.5 mb-4">
                    <span className="px-4 py-1.5 bg-[#10B981]/10 text-[#10B981] rounded-full text-sm font-semibold flex items-center gap-2 border border-[#10B981]/20">
                      Web Development
                      <button className="hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </span>
                    <span className="px-4 py-1.5 bg-[#10B981]/10 text-[#10B981] rounded-full text-sm font-semibold flex items-center gap-2 border border-[#10B981]/20">
                      Gaming
                      <button className="hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <input type="text" placeholder="Ketik minat baru..." className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none" />
                    <button className="bg-gray-800 dark:bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors">Tambah</button>
                  </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div>
                  <label className="block text-base font-bold text-gray-900 dark:text-white mb-4">Tautan Sosial Media</label>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select className="w-full sm:w-[140px] px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-900 dark:text-white outline-none cursor-pointer focus:border-[#10B981]">
                        <option>Website</option>
                        <option>Instagram</option>
                        <option>TikTok</option>
                        <option>YouTube</option>
                      </select>
                      <input type="text" placeholder="https://mencari.online" className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-gray-600 focus:border-[#10B981] text-gray-900 dark:text-white outline-none text-sm" />
                      <button className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/20">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                    <button className="text-sm font-bold text-[#10B981] hover:text-emerald-600 flex items-center gap-1.5 px-2 py-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                      Tambah Tautan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRIVASI */}
            {activeTab === "privasi" && (
              <div className="space-y-3.5 max-w-2xl">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pengaturan Privasi</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Atur siapa saja yang bisa melihat dan berinteraksi dengan profil Anda.</p>
                </div>
                {[
                  { label: "Tampilkan tanggal lahir", options: ["Publik", "Hanya Teman", "Privat"] },
                  { label: "Tampilkan lokasi", options: ["Publik", "Hanya Teman"] },
                  { label: "Siapa yang bisa melihat daftar teman Anda?", options: ["Publik", "Hanya Teman"] },
                  { label: "Siapa yang bisa mengomentari postingan Anda?", options: ["Publik", "Hanya Teman", "Matikan"] },
                  { label: "Izinkan public mengirim pesan langsung?", options: ["Izinkan", "Jangan izinkan"] },
                  { label: "Siapa yang bisa menandai (Tag/Mention) Anda?", options: ["Publik", "Hanya Teman"] },
                  { label: "Tampilkan status online", options: ["Tampilkan", "Sembunyikan"] },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-[#3A3B3C]/40 border border-gray-100 dark:border-gray-700/50 hover:border-[#10B981]/30 transition-colors">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">{item.label}</label>
                    <select className="px-3 py-2 rounded-xl bg-white dark:bg-[#242526] border border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-900 dark:text-white outline-none cursor-pointer focus:border-[#10B981] min-w-[140px]">
                      {item.options.map((opt, i) => <option key={i}>{opt}</option>)}
                    </select>
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
