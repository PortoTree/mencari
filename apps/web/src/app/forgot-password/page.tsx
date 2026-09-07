"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const getPasswordStrength = (pass: string) => {
  if (!pass) return { level: 0, label: '', color: '' };
  
  if (pass.length < 8) {
    return { level: 1, label: 'Minimal 8 karakter', color: 'bg-red-500', textColor: 'text-red-500' };
  }
  
  const hasUpper = /[A-Z]/.test(pass);
  const hasNumber = /\d/.test(pass);
  const hasSpecial = /[^A-Za-z0-9]/.test(pass);

  if (hasUpper && hasNumber && hasSpecial) {
    return { level: 4, label: 'Sangat kuat', color: 'bg-emerald-600', textColor: 'text-emerald-600' };
  }
  if (hasNumber || hasSpecial) {
    return { level: 3, label: 'Kuat', color: 'bg-emerald-400', textColor: 'text-emerald-500' };
  }
  
  return { level: 2, label: 'Sedang', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
};

function ForgotPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const secureToken = searchParams.get("secure");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // State Toast
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
    turnstileToken: ""
  });

  useEffect(() => {
    if (!secureToken && !formData.turnstileToken) {
      router.replace("/secure?next=/forgot-password");
    } else if (secureToken && !formData.turnstileToken) {
      setFormData(prev => ({ ...prev, turnstileToken: secureToken }));
      router.replace("/forgot-password");
    }
  }, [secureToken, formData.turnstileToken, router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 2) {
      timer = setInterval(() => {
        const expiresAt = sessionStorage.getItem("forgotOtpExpiresAt");
        if (expiresAt) {
          const remaining = Math.max(0, Math.floor((parseInt(expiresAt) - Date.now()) / 1000));
          setCountdown(remaining);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step]);

  useEffect(() => {
    const pendingEmail = sessionStorage.getItem("forgotEmail");
    const currentStep = sessionStorage.getItem("forgotStep");
    
    if (pendingEmail && currentStep) {
      setFormData(prev => ({ ...prev, email: pendingEmail }));
      setStep(parseInt(currentStep));
      
      if (currentStep === "2") {
        const expiresAt = sessionStorage.getItem("forgotOtpExpiresAt");
        if (expiresAt) {
          const remaining = Math.max(0, Math.floor((parseInt(expiresAt) - Date.now()) / 1000));
          setCountdown(remaining);
        }
      } else if (currentStep === "3") {
        const savedOtp = sessionStorage.getItem("forgotOtp");
        if (savedOtp) {
          setFormData(prev => ({ ...prev, otp: savedOtp }));
        }
      }
    }
  }, []);

  const startCountdown = () => {
    const expiresAt = Date.now() + 60 * 1000;
    sessionStorage.setItem("forgotOtpExpiresAt", expiresAt.toString());
    setCountdown(60);
  };

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
        sessionStorage.setItem("forgotEmail", data.email);
        sessionStorage.setItem("forgotStep", "2");
        startCountdown();
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

  const handleResendCode = async () => {
    if (countdown > 0) return;
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:3001/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.email
        }),
      });
      
      const data = await res.json();
      if (res.ok) {
        startCountdown();
        showToast("Kode baru berhasil dikirim!", true);
      } else {
        showToast(data.message || 'Gagal mengirim ulang kode', false);
      }
    } catch (err) {
      showToast("Terjadi kesalahan server", false);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:3001/auth/verify-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      });
      
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem("forgotStep", "3");
        sessionStorage.setItem("forgotOtp", formData.otp);
        showToast("Kode OTP valid, silakan masukkan password baru", true);
        setStep(3);
      } else {
        showToast(data.message || 'Kode OTP salah atau kadaluarsa', false);
      }
    } catch (err) {
      showToast("Terjadi kesalahan server", false);
    }
    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      showToast("Password tidak cocok", false);
      return;
    }

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
        sessionStorage.removeItem("forgotEmail");
        sessionStorage.removeItem("forgotStep");
        sessionStorage.removeItem("forgotOtpExpiresAt");
        sessionStorage.removeItem("forgotOtp");
        showToast("Password berhasil diubah! Mengalihkan...", true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        showToast(data.message || 'Gagal mengubah password', false);
      }
    } catch (err) {
      showToast("Terjadi kesalahan server", false);
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-white sm:bg-gray-100 text-slate-800 font-sans pt-16 pb-12 sm:p-24">
      {/* Header Khusus Mobile (Murni fixed di root viewport) */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 flex justify-center py-4 border-b border-gray-100 sm:hidden">
        <div className="-ml-3 w-full flex justify-center">
          <img src="/logo-horizontal.png" alt="Mencari.online" className="h-14 object-contain" />
        </div>
      </div>

      <div className="w-full max-w-md px-8 sm:p-10 sm:bg-white sm:rounded-2xl sm:shadow-xl">
        
        <div className="hidden sm:flex justify-center mb-4 w-full -ml-4">
          <img src="/logo-horizontal.png" alt="Mencari.online" className="h-20 object-contain" />
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
              
              <button 
                type="submit" 
                disabled={loading || !formData.identifier.trim()} 
                className="w-full bg-emerald-600 text-white p-3.5 rounded-xl font-bold tracking-wide hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Kirim Kode'}
              </button>
            </form>
            
            <p className="mt-5 text-center text-sm text-gray-600">
              Ingat password? <Link href="/login" className="text-emerald-600 font-bold hover:underline">Masuk di sini</Link>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Verifikasi Kode</h2>
            <p className="text-center text-gray-500 mb-5 text-sm">Kami telah mengirim 6 digit kode ke email lu.</p>
            
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-800">Kode OTP 6 Digit</label>
                <input type="text" placeholder="------" maxLength={6} required
                  className="w-full border-2 border-gray-200 p-3.5 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors text-center font-bold tracking-widest text-lg"
                  value={formData.otp} onChange={e => setFormData({...formData, otp: e.target.value.replace(/[^0-9]/g, '')})} />
              </div>
              
              <button 
                type="submit" 
                disabled={loading || formData.otp.length < 6} 
                className="w-full bg-emerald-600 text-white p-3.5 rounded-xl font-bold tracking-wide hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Verifikasi Kode'}
              </button>
            </form>

            <div className="mt-5 text-center text-sm">
              <span className="text-gray-600">Belum dapat kode? </span>
              <button 
                type="button"
                onClick={handleResendCode}
                disabled={countdown > 0 || loading}
                className="font-bold text-emerald-600 hover:underline disabled:text-gray-400 disabled:no-underline"
              >
                {countdown > 0 ? `Kirim ulang (${countdown}s)` : 'Kirim ulang sekarang'}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Buat Password Baru</h2>
            <p className="text-center text-gray-500 mb-5 text-sm">Masukkan password baru yang gampang diingat.</p>
            
            <form onSubmit={handleResetPassword} className="space-y-4">
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
                {formData.newPassword.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1.5 w-full h-1.5">
                      {[1, 2, 3, 4].map((barLevel) => (
                        <div 
                          key={barLevel} 
                          className={`flex-1 rounded-full transition-colors duration-300 ${getPasswordStrength(formData.newPassword).level >= barLevel ? getPasswordStrength(formData.newPassword).color : 'bg-gray-200'}`} 
                        />
                      ))}
                    </div>
                    <p className={`text-xs mt-1.5 font-bold ${getPasswordStrength(formData.newPassword).textColor}`}>
                      {getPasswordStrength(formData.newPassword).label}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-800">Ulangi Password Baru</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" required
                    className={`w-full border-2 p-3.5 pr-14 rounded-xl focus:outline-none transition-colors ${
                      formData.confirmPassword && formData.newPassword !== formData.confirmPassword
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-gray-200 focus:border-emerald-500'
                    }`}
                    value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors">
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    )}
                  </button>
                </div>
                {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                  <p className="text-red-500 text-xs font-semibold mt-1">Password tidak cocok</p>
                )}
              </div>
              
              <button 
                type="submit" 
                disabled={loading || formData.newPassword.length < 8 || formData.newPassword !== formData.confirmPassword} 
                className="w-full bg-emerald-600 text-white p-3.5 rounded-xl font-bold tracking-wide hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Simpan Password'}
              </button>
            </form>
          </>
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

export default function ForgotPassword() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
