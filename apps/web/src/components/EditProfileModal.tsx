"use client";

import React, { useState } from "react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

export default function EditProfileModal({ isOpen, onClose, currentUser }: EditProfileModalProps) {
  const [activeTab, setActiveTab] = useState("dasar");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#242526] w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
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

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6 pt-2">
          {[
            { id: "dasar", label: "Informasi Dasar" },
            { id: "sosial", label: "Sosial & Minat" },
            { id: "privasi", label: "Privasi" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === tab.id 
                  ? "border-[#10B981] text-[#10B981]" 
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          
          {/* TAB 1: INFORMASI DASAR */}
          {activeTab === "dasar" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Tampilan</label>
                    <input type="text" defaultValue={currentUser?.username || "Nama Akun"} className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#3A3B3C] border-transparent focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username (Unik)</label>
                    <input type="text" defaultValue={currentUser?.username || "pampam"} className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#3A3B3C] border-transparent focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 relative group cursor-pointer">
                    <img src="/default-avatar.svg" alt="Avatar" className="w-full h-full object-cover bg-white dark:bg-gray-800" />
                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Ubah Foto</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio / Deskripsi</label>
                <textarea rows={3} placeholder="Ceritakan tentang diri Anda..." className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#3A3B3C] border-transparent focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-gray-900 dark:text-white outline-none transition-all resize-none"></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis Kelamin</label>
                  <select className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#3A3B3C] border-transparent focus:border-[#10B981] text-gray-900 dark:text-white outline-none">
                    <option>Pilih...</option>
                    <option>Pria</option>
                    <option>Wanita</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Lahir</label>
                  <input type="date" className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#3A3B3C] border-transparent focus:border-[#10B981] text-gray-900 dark:text-white outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lokasi (Kota, Provinsi)</label>
                <input type="text" placeholder="Misal: Malang, Jawa Timur" className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#3A3B3C] border-transparent focus:border-[#10B981] text-gray-900 dark:text-white outline-none" />
              </div>
            </div>
          )}

          {/* TAB 2: SOSIAL & MINAT */}
          {activeTab === "sosial" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Minat & Hobi</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1.5 bg-[#10B981]/10 text-[#10B981] rounded-full text-sm font-semibold flex items-center gap-2">
                    Web Development
                    <button className="hover:text-red-500"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </span>
                  <span className="px-3 py-1.5 bg-[#10B981]/10 text-[#10B981] rounded-full text-sm font-semibold flex items-center gap-2">
                    Gaming
                    <button className="hover:text-red-500"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </span>
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="Ketik minat baru..." className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#3A3B3C] border-transparent focus:border-[#10B981] text-gray-900 dark:text-white outline-none" />
                  <button className="bg-gray-800 dark:bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors">Tambah</button>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Tautan Sosial Media</label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <select className="w-[120px] px-3 py-2 rounded-xl bg-gray-100 dark:bg-[#3A3B3C] border-transparent text-sm text-gray-900 dark:text-white outline-none">
                      <option>Website</option>
                      <option>Instagram</option>
                      <option>TikTok</option>
                      <option>YouTube</option>
                    </select>
                    <input type="text" placeholder="https://mencari.online" className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#3A3B3C] border-transparent focus:border-[#10B981] text-gray-900 dark:text-white outline-none text-sm" />
                    <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                  <button className="text-sm font-semibold text-[#10B981] hover:text-emerald-600 flex items-center gap-1">+ Tambah Tautan</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRIVASI */}
          {activeTab === "privasi" && (
            <div className="space-y-4">
              {[
                { label: "Tampilkan tanggal lahir", options: ["Publik", "Hanya Teman", "Privat"] },
                { label: "Tampilkan lokasi", options: ["Publik", "Hanya Teman"] },
                { label: "Siapa yang bisa melihat daftar teman Anda?", options: ["Publik", "Hanya Teman"] },
                { label: "Siapa yang bisa mengomentari postingan Anda?", options: ["Publik", "Hanya Teman", "Matikan"] },
                { label: "Izinkan public mengirim pesan langsung?", options: ["Izinkan", "Jangan izinkan"] },
                { label: "Siapa yang bisa menandai (Tag/Mention) Anda?", options: ["Publik", "Hanya Teman"] },
                { label: "Tampilkan status online", options: ["Tampilkan", "Sembunyikan"] },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-gray-50 dark:bg-[#3A3B3C]/50 border border-gray-100 dark:border-gray-700/50">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.label}</label>
                  <select className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#242526] border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-800 dark:text-white outline-none cursor-pointer focus:border-[#10B981]">
                    {item.options.map((opt, i) => <option key={i}>{opt}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-[#1E1E1E]">
          <button onClick={onClose} className="px-5 py-2 rounded-xl text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Batal
          </button>
          <button onClick={onClose} className="px-6 py-2 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-bold transition-colors shadow-sm">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
