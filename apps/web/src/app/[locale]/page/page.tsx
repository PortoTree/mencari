"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const t = useTranslations();
  const router = useRouter();
  const [type, setType] = useState<"website" | "profile">("website");
  const [slug, setSlug] = useState("");
  
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, "").slice(0, 30);
    setSlug(val);
  };

  const handleNav = (tab: string) => {
    if (tab === "home") router.push("/beranda");
    else if (tab === "product") router.push("/product");
    else if (tab === "friend") router.push("/friend");
    else if (tab === "group") router.push("/group");
  };

  return (
    <>
      <nav className="bg-white dark:bg-[#242526] shadow-sm sticky top-0 z-[100] h-[56px] px-4 flex items-center justify-between border-b border-gray-200 dark:border-[#3E4042]">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/beranda")}>
          <img src="/logo-horizontal.png" alt="Mencari" className="h-[40px] w-auto object-contain dark:hidden" />
          <img src="/logo-horizontal2.png" alt="Mencari" className="h-[40px] w-auto object-contain hidden dark:block" />
        </div>

        {/* Center: Tabs */}
        <div className="hidden md:flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2 h-full">
          <div onClick={() => handleNav("product")} className="flex flex-col items-center justify-center w-[110px] h-full cursor-pointer border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg my-1 transition-colors">
            <div className="w-7 h-7 bg-current" style={{ WebkitMask: 'url(/navigasi/produk.svg) center/contain no-repeat', mask: 'url(/navigasi/produk.svg) center/contain no-repeat' }} />
            <span className="text-[11px] font-semibold mt-0.5">{t("tabs.product") || "Produk"}</span>
          </div>
          <div onClick={() => handleNav("home")} className="flex flex-col items-center justify-center w-[110px] h-full cursor-pointer border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg my-1 transition-colors">
            <div className="w-7 h-7 bg-current" style={{ WebkitMask: 'url(/navigasi/home.svg) center/contain no-repeat', mask: 'url(/navigasi/home.svg) center/contain no-repeat' }} />
            <span className="text-[11px] font-semibold mt-0.5">{t("tabs.home")}</span>
          </div>
          <div onClick={() => handleNav("group")} className="flex flex-col items-center justify-center w-[110px] h-full cursor-pointer border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg my-1 transition-colors">
            <div className="w-7 h-7 bg-current" style={{ WebkitMask: 'url(/navigasi/grub.svg) center/contain no-repeat', mask: 'url(/navigasi/grub.svg) center/contain no-repeat' }} />
            <span className="text-[11px] font-semibold mt-0.5">{t("tabs.groups")}</span>
          </div>
          <div onClick={() => handleNav("friend")} className="flex flex-col items-center justify-center w-[110px] h-full cursor-pointer border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg my-1 transition-colors">
            <div className="w-7 h-7 bg-current" style={{ WebkitMask: 'url(/navigasi/teman.svg) center/contain no-repeat', mask: 'url(/navigasi/teman.svg) center/contain no-repeat' }} />
            <span className="text-[11px] font-semibold mt-0.5">{t("tabs.friends")}</span>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-2 relative">
          <button onClick={() => router.push("/beranda")} className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors border border-gray-200 dark:border-[#4E4F50]">
            <img src="/visit.png" alt="Search" className="w-6 h-6 object-contain" />
          </button>
          <button onClick={() => router.push("/beranda")} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors overflow-hidden bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A]">
            <img src="/pemberitahuan.svg" alt="Notifications" className="w-[26px] h-[26px] object-contain" />
          </button>
          <div className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border border-gray-200 dark:border-[#3E4042]">
            <Image src="/profil.jpg" alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] flex justify-center py-10 px-4">
        <div className="w-full max-w-2xl">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-[#B0B3B8] dark:hover:text-[#E4E6EB] mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="font-semibold text-[15px]">Kembali</span>
          </button>

          <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] overflow-hidden">
            <div className="bg-emerald-500 p-6 sm:p-8 text-white">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Daftarkan Bisnis Anda</h1>
              <p className="text-emerald-50 text-[15px] opacity-90">
                Jangkau ribuan pengguna dengan memasukkan website atau profil bisnis Anda ke dalam mesin pencarian mencari.online secara gratis.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 dark:text-[#E4E6EB] mb-3">
                  Tipe Pendaftaran
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div 
                    onClick={() => setType("website")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${type === "website" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-gray-200 dark:border-[#3E4042] hover:border-emerald-300"}`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`font-bold ${type === "website" ? "text-emerald-700 dark:text-emerald-400" : "text-gray-700 dark:text-[#E4E6EB]"}`}>Sudah Punya Website</span>
                    </div>
                    <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] ml-2">Saya ingin menautkan domain website saya sendiri (misal: .com, .id).</p>
                  </div>
                  
                  <div 
                    onClick={() => setType("profile")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${type === "profile" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-gray-200 dark:border-[#3E4042] hover:border-emerald-300"}`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`font-bold ${type === "profile" ? "text-emerald-700 dark:text-emerald-400" : "text-gray-700 dark:text-[#E4E6EB]"}`}>Belum Punya Website</span>
                    </div>
                    <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] ml-2">Buat profil landing page profesional langsung dari platform mencari.online.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                {type === "website" && (
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 dark:text-[#E4E6EB] mb-1.5">
                      URL Website Asli
                    </label>
                    <input 
                      type="url" 
                      placeholder="https://toko-anda.com" 
                      className="w-full bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-[#4E4F50] rounded-lg px-4 py-2.5 text-[15px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[14px] font-bold text-gray-700 dark:text-[#E4E6EB] mb-1.5">
                    Nama Bisnis / Judul Halaman
                  </label>
                  <input 
                    type="text" 
                    placeholder="Misal: Toko Kopi Budi" 
                    className="w-full bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-[#4E4F50] rounded-lg px-4 py-2.5 text-[15px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-bold text-gray-700 dark:text-[#E4E6EB] mb-1.5">
                    Link Kustom (Slug) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-200 dark:border-[#4E4F50] bg-gray-100 dark:bg-[#242526] text-gray-500 dark:text-[#B0B3B8] text-[15px] font-medium">
                      mencari.online/
                    </span>
                    <input 
                      type="text" 
                      value={slug}
                      onChange={handleSlugChange}
                      placeholder="tokobudi" 
                      className="flex-1 min-w-0 bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-[#4E4F50] rounded-r-lg px-4 py-2.5 text-[15px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                  <p className="mt-1.5 text-[12px] text-gray-500 dark:text-[#B0B3B8]">
                    Hanya gunakan huruf kecil (a-z), angka (0-9), dan tanda strip (-). Tanpa spasi.
                  </p>
                </div>

                <div>
                  <label className="block text-[14px] font-bold text-gray-700 dark:text-[#E4E6EB] mb-1.5">
                    Deskripsi Singkat
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Tuliskan deskripsi singkat mengenai bisnis atau layanan Anda..." 
                    className="w-full bg-gray-50 dark:bg-[#3A3B3C] border border-gray-200 dark:border-[#4E4F50] rounded-lg px-4 py-2.5 text-[15px] text-black dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[16px] py-3 px-6 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2">
                    <span>Daftar Sekarang</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
