const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// 1. Add isMounted state near other states (after isNotifPanelOpen)
for (let i = 298; i < 310; i++) {
  if (lines[i] && lines[i].includes('isNotifPanelOpen')) {
    lines.splice(i + 1, 0, '  const [isMounted, setIsMounted] = useState(false);');
    break;
  }
}

// 2. Add useEffect to set isMounted after other useEffects - find the theme useEffect
for (let i = 395; i < 430; i++) {
  if (lines[i] && lines[i].includes('}, [isDarkMode, themeLoaded]);')) {
    lines.splice(i + 1, 0, '\n  // Set mounted flag for portal rendering (prevents SSR hydration mismatch)\n  useEffect(() => { setIsMounted(true); }, []);');
    break;
  }
}

// 3. Fix the portal usage: replace `typeof window !== "undefined" && createPortal(` with `isMounted && createPortal(`
for (let i = 6030; i < 6040; i++) {
  if (lines[i] && lines[i].includes('typeof window !== "undefined"') && lines[i].includes('createPortal')) {
    lines[i] = lines[i].replace('typeof window !== "undefined" && createPortal(', 'isMounted && createPortal(');
    break;
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Fixed hydration error with isMounted pattern');
