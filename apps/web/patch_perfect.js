const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Dynamic import
file = file.replace(
  'import { useRouter } from "next/navigation";',
  'import { useRouter } from "next/navigation";\nimport dynamic from "next/dynamic";\nimport animationData from "../../../../public/search-bar.json";\n\nconst Lottie = dynamic(() => import("lottie-react").then((mod) => ({ default: mod.Lottie || mod.default })), { ssr: false });'
);

// 2. State
file = file.replace(
  'const [isChatExpanded, setIsChatExpanded] = useState(false);',
  "const [isChatExpanded, setIsChatExpanded] = useState(false);\n  const [activeTab, setActiveTab] = useState<'home' | 'mencari'>('home');\n  const lottieRef = useRef<any>(null);\n  const handleAnimationComplete = () => {\n    setTimeout(() => {\n      if (lottieRef.current) lottieRef.current.goToAndPlay(0, true);\n    }, 5000);\n  };"
);

// 3. Tabs onClick
const oldHomeTab = `<div className="flex flex-col items-center justify-center w-[110px] h-full border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 cursor-pointer">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-[11px] font-semibold mt-0.5">{t('tabs.home')}</span>
          </div>`;

const newHomeTab = `<div onClick={() => setActiveTab('home')} className={\`flex flex-col items-center justify-center w-[110px] h-full cursor-pointer \${activeTab === 'home' ? 'border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400' : 'border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg my-1 transition-colors'}\`}>
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-[11px] font-semibold mt-0.5">{t('tabs.home')}</span>
          </div>`;

const oldMencariTab = `<div className="flex flex-col items-center justify-center w-[110px] h-full text-gray-500 dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors my-1 border-b-[3px] border-transparent">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-[11px] font-semibold mt-1">Mencari</span>
          </div>`;

const newMencariTab = `<div onClick={() => setActiveTab('mencari')} className={\`flex flex-col items-center justify-center w-[110px] h-full cursor-pointer transition-colors \${activeTab === 'mencari' ? 'border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 my-0 h-full rounded-none' : 'border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg my-1'}\`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-[11px] font-semibold mt-1">Mencari</span>
          </div>`;

file = file.split(oldHomeTab).join(newHomeTab);
file = file.split(oldHomeTab.replace(/\n/g, '\r\n')).join(newHomeTab.replace(/\n/g, '\r\n'));
file = file.split(oldMencariTab).join(newMencariTab);
file = file.split(oldMencariTab.replace(/\n/g, '\r\n')).join(newMencariTab.replace(/\n/g, '\r\n'));

// 4. Feed Start Ternary Wrap
const oldFeedStart = `{/* Center Main Feed */}
        <div className="flex-1 flex justify-center lg:ml-[340px] xl:ml-[380px] lg:mr-[340px] xl:mr-[380px]">
          <div className="space-y-4 max-w-[590px] w-full px-4">`;

const newFeedStart = `{/* Center Main Feed */}
        <div className="flex-1 flex justify-center lg:ml-[340px] xl:ml-[380px] lg:mr-[340px] xl:mr-[380px]">
          {activeTab === 'mencari' ? (
            <div className="w-full flex flex-col items-center pt-24 max-w-[680px]">
              {/* Lottie Animation (Logo) */}
              <div className="w-72 h-40 mb-8 flex items-center justify-center [&>div]:w-full [&>div]:h-full">
                <Lottie 
                  {...({
                    lottieRef: lottieRef,
                    animationData: animationData,
                    loop: false,
                    onComplete: handleAnimationComplete
                  } as any)}
                />
              </div>

              {/* Google-style Search Box */}
              <div className="w-full bg-white dark:bg-[#242526] rounded-full shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:shadow-[0_1px_6px_rgba(32,33,36,0.4)] dark:shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-shadow duration-200 border border-transparent dark:border-[#3E4042] flex items-center px-4 py-3 min-h-[48px]">
                <svg className="w-5 h-5 text-gray-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text"
                  placeholder="Cari di Mencari atau ketik URL..."
                  className="w-full bg-transparent border-none outline-none ml-4 text-[16px] text-black dark:text-[#E4E6EB] placeholder-gray-500 dark:placeholder-[#B0B3B8]"
                  autoFocus
                />
                <div className="flex items-center gap-3 shrink-0 mr-1">
                  <svg className="w-5 h-5 text-blue-500 cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3zm5-3a1 1 0 0 1 2 0 7 7 0 0 1-14 0 1 1 0 0 1 2 0 5 5 0 0 0 10 0zm-6 8v3h2v-3h-2z"/></svg>
                  <svg className="w-5 h-5 text-gray-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
              </div>
              
              {/* Google-style Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button className="px-4 py-2 bg-[#F8F9FA] dark:bg-[#303134] hover:border-gray-300 dark:hover:border-gray-500 text-[#3C4043] dark:text-[#E8EAED] text-[14px] rounded border border-transparent transition-colors">
                  Penelusuran Mencari
                </button>
                <button className="px-4 py-2 bg-[#F8F9FA] dark:bg-[#303134] hover:border-gray-300 dark:hover:border-gray-500 text-[#3C4043] dark:text-[#E8EAED] text-[14px] rounded border border-transparent transition-colors">
                  Saya Sedang Beruntung
                </button>
              </div>
            </div>
          ) : (
          <div className="space-y-4 max-w-[590px] w-full px-4">`;

file = file.split(oldFeedStart).join(newFeedStart);
file = file.split(oldFeedStart.replace(/\n/g, '\r\n')).join(newFeedStart.replace(/\n/g, '\r\n'));
file = file.replace('lg:ml-[280px] xl:ml-[320px] lg:mr-[340px] xl:mr-[380px]', 'lg:ml-[340px] xl:ml-[380px] lg:mr-[340px] xl:mr-[380px]');

// 5. Feed End Ternary Wrap
const oldFeedEnd = `          </div>
        </div>
        </div>

        {/* Right Sidebar (Chat Panel) */}`;

const newFeedEnd = `          </div>
          )}
        </div>

        {/* Right Sidebar (Chat Panel) */}`;

file = file.split(oldFeedEnd).join(newFeedEnd);
file = file.split(oldFeedEnd.replace(/\n/g, '\r\n')).join(newFeedEnd.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Success! Full clean rewrite.');
