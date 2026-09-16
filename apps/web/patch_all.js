const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Dynamic import
file = file.replace(
  'import { useRouter } from "next/navigation";',
  'import { useRouter } from "next/navigation";\nimport dynamic from "next/dynamic";\nimport animationData from "../../../../public/search-bar.json";\n\n// @ts-ignore\nconst Lottie = dynamic(() => import("lottie-react").then((mod) => ({ default: mod.Lottie || mod.default })), { ssr: false });'
);

// 2. State
file = file.replace(
  'const [isChatExpanded, setIsChatExpanded] = useState(false);',
  "const [isChatExpanded, setIsChatExpanded] = useState(false);\n  const [activeTab, setActiveTab] = useState<'home' | 'mencari'>('home');\n  const lottieRef = useRef<any>(null);\n  const handleAnimationComplete = () => {\n    setTimeout(() => {\n      if (lottieRef.current) lottieRef.current.goToAndPlay(0, true);\n    }, 5000);\n  };"
);

// 3. Navbar Center (Mencari tab replacement from update + onClick)
const oldTabsStr = `absolute left-1/2 -translate-x-1/2 h-full">
          <div className="flex flex-col items-center justify-center w-[110px] h-full border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 cursor-pointer">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-[11px] font-semibold mt-0.5">{t('tabs.home')}</span>
          </div>
          <div className="flex flex-col items-center justify-center w-[110px] h-full text-gray-500 dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer transition-colors my-1 border-b-[3px] border-transparent">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-[11px] font-semibold mt-1">{t('nav.search')}</span>
          </div>`;

// Wait, the git restore went back to MENCARI UPDATE 20, which STILL HAD THE OLD nav.search placeholder (or not)?
// If the user committed at 15:12, the "Mencari" tab was ALREADY injected!
// Let's check what's actually in the file before trying to replace it blindly.
