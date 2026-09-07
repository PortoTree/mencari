"use client";
import { useState } from "react";
import Link from "next/link";
import { Turnstile } from '@marsidev/react-turnstile';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // State Toast
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    email: "",
    otp: "",
    newPassword: "",
    turnstileToken: ""
  });

  const showToast = (msg: string, isSuccess: boolean) => {
    setMessage(msg);
    setIsSuccessMessage(isSuccess);
    setIsVisible(false);
    
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setMessage(""), 500);
    }, 3000);
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.turnstileToken) {
      showToast("Tolong centang verifikasi keamanan", false);
      return;
    }
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:3001/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.identifier,
          turnstileToken: formData.turnstileToken
        }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, email: data.email }));
        showToast(data.message, true);
        setStep(2);
      } else {
        showToast(data.message || 'Gagal mengirim kode', false);
      }
    } catch (err) {
      showToast("Terjadi kesalahan server", false);
    }
    setLoading(false);
  };

  const handleVerifyReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:3001/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          password: formData.newPassword
        }),
      });
      
      const data = await res.json();
      if (res.ok) {
        showToast("Password berhasil diubah! Mengalihkan ke halaman login...", true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        showToast(data.message || 'OTP salah atau kadaluarsa', false);
      }
    } catch (err) {
      showToast("Terjadi kesalahan server", false);
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-white sm:bg-gray-100 text-slate-800 font-sans pt-24 pb-8 sm:p-24">
      <div className="w-full max-w-md px-8 sm:p-10 sm:bg-white sm:rounded-2xl sm:shadow-xl">
        
        {/* Header Logo */}
        <div className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-50 flex justify-center py-4 border-b border-gray-100 sm:static sm:bg-transparent sm:backdrop-blur-none sm:py-0 sm:border-none sm:mb-4">
          <img src="/logo-horizontal.png" alt="Mencari.online" className="h-14 sm:h-20 object-contain" />
        </div>
        
        {step === 1 && (
          <>
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Lupa Password?</h2>
            <p className="text-center text-gray-500 mb-5 text-sm">Masukkan Email atau Username akun lu</p>
            
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-800">Email atau Username</label>
                <input type="text" placeholder="john@example.com atau johndoe" required
                  className="w-full border-2 border-gray-200 p-3.5 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                  value={formData.identifier} onChange={e => setFormData({...formData, identifier: e.target.value})} />
              </div>
              
              <div className="flex justify-center pt-2">
                <Turnstile
                  siteKey="0x4AAAAAAErFLKlGZ8SiwX2L"
                  options={{ theme: 'light' }}
                  onSuccess={(token) => setFormData({ ...formData, turnstileToken: token })}
                  onError={() => showToast("Verifikasi gagal, silakan coba lagi.", false)}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading || !formData.identifier.trim() || !formData.turnstileToken} 
                className="w-full bg-emerald-600 text-white p-3.5 rounded-xl font-bold tracking-wide hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Kirim Kode'}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Kode & Password Baru</h2>
            <p className="text-center text-gray-500 mb-5 text-sm">Kami telah mengirim 6 digit kode ke email lu.</p>
            
            <form onSubmit={handleVerifyReset} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-800">Kode OTP 6 Digit</label>
                <input type="text" placeholder="123456" maxLength={6} required
                  className="w-full border-2 border-gray-200 p-3.5 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors text-center font-bold tracking-widest text-lg"
                  value={formData.otp} onChange={e => setFormData({...formData, otp: e.target.value.replace(/[^0-9]/g, '')})} />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-800">Password Baru</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" required
                    className="w-full border-2 border-gray-200 p-3.5 pr-14 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                    value={formData.newPassword} onChange={e => setFormData({...formData, newPassword: e.target.value})} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors">
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    )}
                  </button>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={loading || formData.otp.length < 6 || !formData.newPassword.trim()} 
                className="w-full bg-emerald-600 text-white p-3.5 rounded-xl font-bold tracking-wide hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Ubah Password & Login'}
              </button>
            </form>
          </>
        )}
        
        {step === 1 && (
          <p className="mt-5 text-center text-sm text-gray-600">
            Ingat password? <Link href="/login" className="text-emerald-600 font-bold hover:underline">Masuk di sini</Link>
          </p>
        )}

        {/* Toast Notification */}
        {message && (
          <div className={`fixed bottom-10 sm:bottom-auto sm:top-10 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 min-w-[320px] rounded-xl shadow-2xl border text-sm font-semibold text-center transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 sm:-translate-y-6'} ${isSuccessMessage ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
            {message}
          </div>
        )}
      </div>
    </main>
  );
}
