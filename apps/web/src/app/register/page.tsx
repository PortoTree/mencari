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

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const secureToken = searchParams.get("secure");
  
  // State manajemen alur
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(0);
  
  // State data
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    password: "",
    turnstileToken: "" 
  });

  useEffect(() => {
    if (!secureToken && !formData.turnstileToken) {
      router.replace("/secure?next=/register");
    } else if (secureToken && !formData.turnstileToken) {
      setFormData(prev => ({ ...prev, turnstileToken: secureToken }));
      // Optional: clean up URL
      router.replace("/register");
    }
  }, [secureToken, formData.turnstileToken, router]);

  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State UI Toggle
  const [showPassword, setShowPassword] = useState(false);
  
  // State Toast
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  // Fungsi Toast biar gampang dipakai
  const showToast = (msg: string, isSuccess: boolean) => {
    // 1. Render elemen ke DOM dulu dalam posisi transparan (isVisible: false)
    setIsSuccessMessage(isSuccess);
    setMessage(msg);
    setIsVisible(false);
    
    // 2. Kasih jeda super singkat biar browser nyadar elemennya ada, baru tembak kelas opacity-100
    setTimeout(() => {
      setIsVisible(true);
    }, 50);

    // 3. Timer 5 detik sebelum fade out
    setTimeout(() => {
      setIsVisible(false);
      // 4. Tunggu animasi fade out (500ms) selesai baru hapus elemennya dari layar
      setTimeout(() => setMessage(""), 500); 
    }, 5000);
  };

  // Timer yang Anti-Refresh
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 2) {
      timer = setInterval(() => {
        const expiresAt = sessionStorage.getItem("otpExpiresAt");
        if (expiresAt) {
          const remaining = Math.max(0, Math.floor((parseInt(expiresAt) - Date.now()) / 1000));
          setCountdown(remaining);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step]);

  // Ngambil data dari Session kalau di-refresh
  useEffect(() => {
    const pendingEmail = sessionStorage.getItem("pendingVerificationEmail");
    if (pendingEmail) {
      setStep(2);
      setFormData((prev) => ({ ...prev, email: pendingEmail }));
      
      const expiresAt = sessionStorage.getItem("otpExpiresAt");
      if (expiresAt) {
        const remaining = Math.max(0, Math.floor((parseInt(expiresAt) - Date.now()) / 1000));
        setCountdown(remaining);
      }
    }
  }, []);

    // Efek buat ngecek username tiap berhenti ngetik 3 detik
    useEffect(() => {
      const username = formData.username;
      if (!username) {
        setUsernameStatus('idle');
        return;
      }
      
      setUsernameStatus('checking');
      
      const delayDebounce = setTimeout(async () => {
        try {
          const res = await fetch(`http://localhost:3001/auth/check-username?username=${username}`);
          if (res.ok) {
            const data = await res.json();
            setUsernameStatus(data.available ? 'available' : 'taken');
          } else {
            setUsernameStatus('idle');
          }
        } catch (error) {
          setUsernameStatus('idle');
        }
      }, 3000); // 3 detik
      
      return () => clearTimeout(delayDebounce);
    }, [formData.username]);

  const startCountdown = () => {
    const expiresAt = Date.now() + 60 * 1000;
    sessionStorage.setItem("otpExpiresAt", expiresAt.toString());
    setCountdown(60);
  };

  const handleRegister = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.turnstileToken) {
      showToast("Tolong centang verifikasi keamanan", false);
      return;
    }
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (res.ok || res.status === 201) {
        sessionStorage.setItem("pendingVerificationEmail", formData.email);
        startCountdown();
        showToast(`Kode 6 digit telah dikirim ke ${formData.email}`, true);
        setStep(2);
      } else {
        showToast(data.message || 'Email atau Username sudah dipakai', false);
      }
    } catch (err) {
      showToast("Gagal terhubung ke API (Pastikan server nyala)", false);
    }
    setLoading(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: otpCode }),
      });

      const data = await res.json();
      if (res.ok || res.status === 201) {
        sessionStorage.removeItem("pendingVerificationEmail");
        sessionStorage.removeItem("otpExpiresAt");
        showToast("Verifikasi sukses! Mengalihkan ke halaman Login...", true);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        showToast(data.message || 'Kode OTP salah', false);
      }
    } catch (err) {
      showToast("Gagal verifikasi.", false);
    }
    setLoading(false);
  };

  const cancelVerification = () => {
    sessionStorage.removeItem("pendingVerificationEmail");
    sessionStorage.removeItem("otpExpiresAt");
    setStep(1);
    setIsVisible(false);
    setMessage("");
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
        
        {step === 1 ? (
          <>
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Buat Akun Baru</h2>
            <p className="text-center text-gray-500 mb-5 text-sm">Lengkapi data di bawah untuk bergabung</p>
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-800">Username</label>
                  <div className="relative">
                    <input type="text" placeholder="username" required
                      className={`w-full border-2 p-3.5 pr-12 rounded-xl focus:outline-none transition-colors ${
                        usernameStatus === 'taken' ? 'border-red-400 focus:border-red-500' : 
                        usernameStatus === 'available' ? 'border-emerald-400 focus:border-emerald-500' :
                        'border-gray-200 focus:border-emerald-500'
                      }`}
                      value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                    
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {usernameStatus === 'checking' && (
                        <svg className="animate-spin h-5 w-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      {usernameStatus === 'available' && (
                        <svg className="h-6 w-6 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                      {usernameStatus === 'taken' && (
                        <button 
                          type="button"
                          onClick={() => {
                            setFormData({...formData, username: ""});
                            setUsernameStatus('idle');
                          }}
                          className="flex items-center justify-center text-red-500 hover:text-red-700 hover:scale-110 transition-all focus:outline-none mt-[2px]"
                          title="Hapus username"
                        >
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  {usernameStatus === 'taken' && (
                    <p className="text-red-500 text-xs font-semibold mt-1">Username sudah dipakai, coba yang lain.</p>
                  )}
                  {usernameStatus === 'available' && (
                    <p className="text-emerald-500 text-xs font-semibold mt-1">Username tersedia!</p>
                  )}
                </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-800">Email</label>
                <input type="email" placeholder="name@example.com" required
                  className="w-full border-2 border-gray-200 p-3.5 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-800">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" required
                    className="w-full border-2 border-gray-200 p-3.5 pr-14 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors">
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    )}
                  </button>
                </div>
                {formData.password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1.5 w-full h-1.5">
                      {[1, 2, 3, 4].map((barLevel) => (
                        <div 
                          key={barLevel} 
                          className={`flex-1 rounded-full transition-colors duration-300 ${getPasswordStrength(formData.password).level >= barLevel ? getPasswordStrength(formData.password).color : 'bg-gray-200'}`} 
                        />
                      ))}
                    </div>
                    <p className={`text-xs mt-1.5 font-bold ${getPasswordStrength(formData.password).textColor}`}>
                      {getPasswordStrength(formData.password).label}
                    </p>
                  </div>
                )}
              </div>
              
                
                <button 
                  type="submit" 
                  disabled={loading || !formData.username.trim() || !formData.email.trim() || formData.password.length < 8 || usernameStatus === 'taken' || usernameStatus === 'checking'} 
                  className="w-full bg-emerald-600 text-white p-3.5 rounded-xl font-bold tracking-wide hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
                >
                {loading ? 'Memproses...' : 'Daftar sekarang'}
              </button>
            </form>
            <p className="mt-5 text-center text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-emerald-600 font-bold hover:underline">
                Login di sini
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Verifikasi OTP</h2>
            <p className="text-center text-gray-500 mb-5 text-sm leading-relaxed">Masukkan 6-digit kode OTP yang dikirim ke <br/><span className="font-bold text-gray-800">{formData.email}</span></p>
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <input type="text" placeholder="------" required maxLength={6}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors text-center text-3xl tracking-[0.5em] font-mono"
                  value={otpCode} onChange={e => setOtpCode(e.target.value)} />
              </div>
              
              <div className="text-center text-sm font-medium text-gray-500 mb-2">
                {countdown > 0 ? (
                  <span>Kirim ulang dalam 00:{countdown.toString().padStart(2, '0')}</span>
                ) : (
                  <button type="button" onClick={handleRegister} className="text-emerald-600 hover:underline">
                    Kirim ulang kode
                  </button>
                )}
              </div>

              <button type="submit" disabled={loading || otpCode.length < 6} className="w-full bg-emerald-600 text-white p-3.5 rounded-xl font-bold tracking-wide hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed">
                {loading ? 'Memverifikasi...' : 'Verifikasi Akun'}
              </button>
              
              <div className="text-center mt-4">
                <button type="button" onClick={cancelVerification} className="text-red-500 hover:underline text-sm font-medium">
                  Ganti Email / Batalkan
                </button>
              </div>
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

export default function Register() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
