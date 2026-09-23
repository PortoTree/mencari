const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

// 1. Fix Dark Mode Effect
if (!code.includes('const savedTheme = localStorage.getItem("theme");')) {
  const darkModeEffect = `
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);
`;
  code = code.replace(
    'const [isDarkMode, setIsDarkMode] = useState(false);',
    'const [isDarkMode, setIsDarkMode] = useState(true);\n' + darkModeEffect
  );
}

// 2. Fix the Dark Mode Toggle Button Logic
// The toggle button needs to also save to localStorage and update classList.
// In page.tsx it currently might just be onClick={() => setIsDarkMode(!isDarkMode)}
code = code.replace(
  /onClick=\{\(\) => setIsDarkMode\(!isDarkMode\)\}/g,
  `onClick={() => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }}`
);

// 3. Fix the Visit Icon Routing
// I previously replaced router.push('/beranda') for the visit icon.
// The visit icon is the one with src="/visit.png". Let's find its container.
// It looks like:
// <button onClick={() => router.push(`/${locale}/beranda`)} className="..."><img src="/visit.png" ... /></button>
code = code.replace(
  /<button onClick=\{\(\) => router\.push\(\`\/\$\{locale\}\/beranda\`\)\} className="[^"]*w-10 h-10 rounded-full[^"]*">\s*<img src="\/visit\.png"/g,
  (match) => match.replace('/beranda', '/mencari')
);

// Let's also check the search dropdown! In nav_dump, there's a search icon/input.
// Did I break any other routing?
// The search dropdown dummy items or the main search button might route to beranda.
// In fix_tabs.js I did:
// if (lines[i].includes('setActiveTab("mencari")') && lines[i+1].includes('setIsSearchNavOpen(false)')) {
//   lines[i-1] = `onClick={() => router.push(\`/\${locale}/beranda\`)}`;
// }
// This replaced the search functionality (setActiveTab("mencari")) with router.push('/beranda')!
code = code.replace(
  /onClick=\{\(\) => router\.push\(\`\/\$\{locale\}\/beranda\`\)\}\n\s*className="flex items-center gap-3 w-full/g,
  (match) => match.replace('/beranda', '/mencari')
);

// We need to carefully replace all `router.push('/beranda')` that should be `/mencari`.
// Let's just find the text "Mencari" or "visit" and fix their specific buttons.

fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
console.log('Fixed dark mode and routing');
