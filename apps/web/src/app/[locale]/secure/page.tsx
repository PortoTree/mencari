"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Turnstile } from '@marsidev/react-turnstile';

function SecureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/";
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSuccess = (token: string) => {
    setLoading(true);
    // Tambahkan token ke url callback
    const separator = nextPath.includes("?") ? "&" : "?";
    router.replace(`${nextPath}${separator}secure=${token}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-8 sm:p-10 sm:bg-white sm:rounded-2xl sm:shadow-xl relative overflow-hidden text-center z-10">
      
      <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Pengecekan Keamanan</h2>
      <p className="text-gray-500 mb-8 text-sm">Tunggu sebentar, kami sedang memastikan koneksi aman dari bot spam.</p>

      <div className="flex justify-center min-h-[100px]">
        {loading ? (
          <div className="flex flex-col items-center text-emerald-600 font-bold">
            <svg className="animate-spin h-8 w-8 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Mengalihkan...
          </div>
        ) : (
          <Turnstile
            siteKey="0x4AAAAAAErFLKlGZ8SiwX2L"
            options={{ theme: 'light' }}
            onSuccess={handleSuccess}
            onError={() => setError(true)}
          />
        )}
      </div>

      {error && (
        <p className="mt-4 text-red-500 text-sm font-semibold">
          Verifikasi gagal. Silakan muat ulang halaman.
        </p>
      )}
    </div>
  );
}

export default function SecurePage() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-white sm:bg-gray-100 text-slate-800 font-sans pt-24 pb-8 sm:p-24">
      {/* Dekorasi blur di background atas biar manis */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      {/* Header Khusus Mobile dihapus sesuai permintaan */}

      <Suspense fallback={<div className="font-bold text-gray-500">Memuat...</div>}>
        <SecureContent />
      </Suspense>
    </main>
  );
}
