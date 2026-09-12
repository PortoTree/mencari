"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Lottie } from "lottie-react";
import SplashAnimation from "../components/SplashAnimation";
import logoHeaderAnimation from "../../public/logo-header.json";
import globeHeroAnimation from "../../public/globe-hero.json";

export default function WelcomePage() {
  const words = ["Kebutuhan", "Komunitas", "Teman"];
  const [wordIndex, setWordIndex] = useState(0);
  const [lottieKey, setLottieKey] = useState(0);

  const handleLottieComplete = () => {
    setTimeout(() => {
      setLottieKey((prev) => prev + 1);
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDummySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Email berhasil didaftarkan! (Fitur Dummy berjalan baik)");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-x-hidden selection:bg-emerald-200">
      <SplashAnimation />
      
      {/* Background Modern Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] -z-20"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-400/15 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full pl-5 sm:pl-10 pr-0 py-3 sm:py-4 flex justify-between items-center bg-transparent z-50">
        <div className="w-40 sm:w-48 flex items-center justify-start -ml-2">
          <Lottie
            key={lottieKey}
            src={logoHeaderAnimation}
            loop={false}
            autoplay={true}
            subscriptions={{ complete: handleLottieComplete }}
          />
        </div>
        <Link href="/login" className="px-6 py-2 sm:px-8 sm:py-2.5 bg-[#00A300] hover:bg-[#009000] text-white font-bold text-base sm:text-lg rounded-l-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-b-4 border-black/10 transition-all hover:-translate-y-0.5">
          Masuk
        </Link>
      </header>

      {/* Hero Left Aligned (Fixed Parallax) */}
      <section className="fixed top-0 left-0 right-0 w-full h-[100dvh] pt-24 pb-10 sm:pt-24 lg:pt-20 sm:pb-12 flex flex-col items-start z-0 pointer-events-none">
        
        {/* Blurry Emerald Gradient Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#00A300]/15 sm:bg-[#00A300]/10 rounded-full blur-[100px] sm:blur-[140px]"></div>
          <div className="absolute top-20 right-[-10%] sm:right-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-400/20 sm:bg-emerald-400/15 rounded-full blur-[100px] sm:blur-[140px]"></div>
        </div>

        <div className="w-full px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between pointer-events-auto">
          
          <div className="flex-1 flex flex-col items-start w-full z-10 lg:mt-8">
            <style>{`
              @keyframes text-slide-up {
                0% { opacity: 0; transform: translateY(30px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .animate-text-slide-up {
                animation: text-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}</style>
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tighter text-black mb-4 sm:mb-6 leading-[1.05] sm:leading-[1.1]">
              Ubah cara Anda <br />
              mencari <br />
              <span key={words[wordIndex]} className="text-[#00A300] inline-block animate-text-slide-up mt-1 sm:mt-3">{words[wordIndex]}</span>
            </h1>
            
            <p className="text-base sm:text-xl text-slate-700 max-w-sm sm:max-w-xl leading-relaxed">
              Posting apa yang Anda butuhkan, dan biarkan koneksi yang tepat mendatangi Anda
            </p>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end -mt-8 sm:-mt-4 lg:mt-0 z-0">
            <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[550px] lg:h-[550px] max-w-full lg:-mr-10 xl:-mr-20 drop-shadow-2xl opacity-90">
              <Lottie
                src={globeHeroAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
          </div>
          
        </div>
      </section>

      {/* Spacer buat ngedorong layer hijau ke bawah, karena hero-nya fixed */}
      <div className="w-full h-[550px] sm:h-[550px] lg:h-[600px] xl:h-[650px]"></div>

      {/* Container Hijau Bawah */}
      <div className="relative z-10 bg-[#00A300] rounded-t-[2rem] sm:rounded-t-[3rem] pb-24 shadow-[0_-15px_40px_rgba(0,0,0,0.15)]">
        
        {/* Tombol Buat Akun (Overlap) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/register" className="inline-block px-8 py-3 sm:px-10 sm:py-4 bg-[#00A300] text-white font-bold text-lg sm:text-xl rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform whitespace-nowrap border-b-4 border-black/10">
            Buat akun
          </Link>
        </div>

        {/* Cara Kerja Section */}
        <section className="px-6 pt-28 pb-16 sm:pt-36">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">Cara Kerja Kami</h2>
              <p className="text-emerald-50 text-lg max-w-2xl mx-auto">Sistem terbalik yang menghemat waktu Anda. Anda yang butuh, mereka yang datang.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              
              {/* Step 1 */}
              <div className="relative flex flex-col items-start p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:-translate-y-2 hover:bg-white/15 transition-all duration-300 group overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
                <div className="absolute -bottom-4 right-4 text-8xl font-black text-white/5 select-none group-hover:scale-110 group-hover:-translate-x-2 transition-transform duration-500">1</div>
                
                <div className="w-16 h-16 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center mb-8 shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Buat Permintaan</h3>
                <p className="text-white/80 leading-relaxed">Tuliskan secara spesifik barang, jasa, atau informasi yang sedang Anda cari/jual.</p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-start p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:-translate-y-2 hover:bg-white/15 transition-all duration-300 group overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
                <div className="absolute -bottom-4 right-4 text-8xl font-black text-white/5 select-none group-hover:scale-110 group-hover:-translate-x-2 transition-transform duration-500">2</div>
                
                <div className="w-16 h-16 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center mb-8 shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Komunitas Merespons</h3>
                <p className="text-white/80 leading-relaxed">Algoritma kami menyebarkan permintaan Anda kepada penyedia yang relevan di komunitas.</p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-start p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:-translate-y-2 hover:bg-white/15 transition-all duration-300 group overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
                <div className="absolute -bottom-4 right-4 text-8xl font-black text-white/5 select-none group-hover:scale-110 group-hover:-translate-x-2 transition-transform duration-500">3</div>
                
                <div className="w-16 h-16 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center mb-8 shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Pilih & Transaksi</h3>
                <p className="text-white/80 leading-relaxed">Terima berbagai penawaran langsung, bandingkan, dan pilih yang paling cocok dengan kebutuhan Anda.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Eksplorasi Section */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">Eksplorasi</h2>
              <p className="text-emerald-50 text-lg max-w-xl">Dari hal kecil hingga kebutuhan besar, temukan semuanya disini.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
            {/* Jasa & Freelance */}
            <div className="group relative sm:col-span-1 lg:col-span-3 bg-white/10 backdrop-blur-lg border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl hover:-translate-y-2 hover:bg-white/15 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col items-start">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
              <div className="w-14 h-14 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center mb-6 shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Jasa & Freelance</h3>
              <p className="text-white/80 text-base leading-relaxed">Desain grafis, coding, pengerjaan tugas, hingga jasa lainnya.</p>

            </div>
            {/* Karir & Pekerjaan */}
            <div className="group relative sm:col-span-1 lg:col-span-3 bg-white/10 backdrop-blur-lg border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl hover:-translate-y-2 hover:bg-white/15 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col items-start">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
              <div className="w-14 h-14 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center mb-6 shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Karir & Pekerjaan</h3>
              <p className="text-white/80 text-base leading-relaxed">Cari lowongan pekerjaan, rekrut talent, atau tawarkan keahlian profesional.</p>

            </div>
            {/* Barang Spesifik */}
            <div className="group relative sm:col-span-1 lg:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl hover:-translate-y-2 hover:bg-white/15 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col items-start">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
              <div className="w-14 h-14 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center mb-6 shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Barang Spesifik</h3>
              <p className="text-white/80 text-sm leading-relaxed">Cari barang koleksi langka, sparepart bekas, atau elektronik spesifik.</p>

            </div>
            {/* Properti & Kos */}
            <div className="group relative sm:col-span-1 lg:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl hover:-translate-y-2 hover:bg-white/15 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col items-start">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
              <div className="w-14 h-14 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center mb-6 shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Properti & Hunian</h3>
              <p className="text-white/80 text-sm leading-relaxed">Kos-kosan daerah spesifik, overkredit hunian, hingga rental kendaraan.</p>

            </div>
            {/* Komunitas */}
            <div className="group relative sm:col-span-1 lg:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl hover:-translate-y-2 hover:bg-white/15 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col items-start">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
              <div className="w-14 h-14 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center mb-6 shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Teman & Komunitas</h3>
              <p className="text-white/80 text-sm leading-relaxed">Cari teman mabar, rekan olahraga, atau partner bisnis project baru.</p>

            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Footer Lengkap */}
      <footer className="relative z-10 px-6 py-12 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2">
            <img src="/logo-horizontal.png" alt="Mencari.online" className="h-10 object-contain mb-4 grayscale" />
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              Platform pencarian dan penawaran terintegrasi pertama di Indonesia yang mempertemukan kebutuhan dengan solusi secara real-time.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/login" className="hover:text-emerald-600">Masuk</Link></li>
              <li><Link href="/register" className="hover:text-emerald-600">Daftar</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Tentang Kami</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Bantuan</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-emerald-600">Pusat Bantuan</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Mencari.online. Hak Cipta Dilindungi.</p>
          <div className="flex gap-4">
            <span>Made with precision in Indonesia.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
