const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Imports
if (!file.includes('next/dynamic')) {
  file = file.split('import { useRouter } from "next/navigation";').join('import { useRouter } from "next/navigation";\nimport dynamic from "next/dynamic";\nimport animationData from "../../../../public/search-bar.json";\n\n// @ts-ignore\nconst Lottie = dynamic(() => import("lottie-react").then((mod) => mod.Lottie || mod.default || mod), { ssr: false });');
  if (!file.includes('next/dynamic')) {
      file = file.split('import { useRouter } from "next/navigation";\r\n').join('import { useRouter } from "next/navigation";\r\nimport dynamic from "next/dynamic";\r\nimport animationData from "../../../../public/search-bar.json";\r\n\r\n// @ts-ignore\r\nconst Lottie = dynamic(() => import("lottie-react").then((mod) => mod.Lottie || mod.default || mod), { ssr: false });');
  }
}

// 2. States
if (!file.includes('const [activeTab, setActiveTab]')) {
  file = file.split('const [isChatExpanded, setIsChatExpanded] = useState(false);').join("const [isChatExpanded, setIsChatExpanded] = useState(false);\n  const [activeTab, setActiveTab] = useState<'home' | 'mencari'>('home');\n  const lottieRef = useRef<any>(null);\n  const handleAnimationComplete = () => {\n    setTimeout(() => {\n      if (lottieRef.current) lottieRef.current.goToAndPlay(0, true);\n    }, 5000);\n  };");
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Injected variables');
