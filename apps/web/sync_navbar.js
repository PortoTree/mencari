const fs = require('fs');

// 1. Read beranda code to extract the precise Navbar and its required state
const berandaCode = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const navRegex = /<nav className="bg-white dark:bg-\[#242526\].*?<\/nav>/s;
const navMatch = berandaCode.match(navRegex);

if (!navMatch) {
  console.log("Could not extract Nav from beranda");
  process.exit(1);
}

const navHTML = navMatch[0];

// 2. Read current page.tsx
let pageCode = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

// Add the missing states to page.tsx
const statesToInject = `
  const [activeTab, setActiveTab] = useState<"home" | "mencari" | "friend" | "group" | "groups" | "chat" | "product">("none" as any);
  const [isSearchNavOpen, setIsSearchNavOpen] = useState(false);
  const searchNavRef = React.useRef<HTMLDivElement>(null);
  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);
  const notifBtnRef = React.useRef<HTMLButtonElement>(null);
  const locale = "id"; // fallback locale
`;

// Replace state block
pageCode = pageCode.replace('const [slug, setSlug] = useState("");', 'const [slug, setSlug] = useState("");\n' + statesToInject);

// Add handleClickOutside for the dropdowns
const clickOutsideCode = `
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchNavRef.current && !searchNavRef.current.contains(event.target as Node)) {
        setIsSearchNavOpen(false);
      }
      if (notifBtnRef.current && !notifBtnRef.current.contains(event.target as Node)) {
        setIsNotifPanelOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
`;

pageCode = pageCode.replace('const handleSlugChange', clickOutsideCode + '\n  const handleSlugChange');

// Replace the <nav> block in page.tsx with the one from beranda
const pageNavRegex = /<nav className="bg-white dark:bg-\[#242526\].*?<\/nav>/s;
pageCode = pageCode.replace(pageNavRegex, navHTML);

fs.writeFileSync('src/app/[locale]/page/page.tsx', pageCode);
console.log("Navbar successfully synced to page.tsx");
