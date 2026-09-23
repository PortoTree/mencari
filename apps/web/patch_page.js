const fs = require('fs');
let beranda = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Get notification portal
const portalStart = beranda.indexOf('{isMounted && createPortal(');
const portalEnd = beranda.lastIndexOf('</>', beranda.length - 1);
const portalCode = beranda.substring(portalStart, portalEnd);

let pageCode = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

// 1. Add isMounted
if (!pageCode.includes('isMounted')) {
  pageCode = pageCode.replace('const [slug, setSlug] = useState("");', 'const [slug, setSlug] = useState("");\n  const [isMounted, setIsMounted] = React.useState(false);\n  React.useEffect(() => setIsMounted(true), []);\n');
}

// 2. Add createPortal import
if (!pageCode.includes('createPortal')) {
  pageCode = pageCode.replace('import { useRouter } from "next/navigation";', 'import { useRouter } from "next/navigation";\nimport { createPortal } from "react-dom";\n');
}

// 3. Add currentUser effect
const effectCode = `
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username || payload.name) {
          setCurrentUser({
            username: payload.username || payload.name || "User",
            displayName: payload.displayName || payload.username || payload.name || "User",
            photoURL: "/profil.jpg"
          });
        }
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
  }, []);
`;

// Replace dummy currentUser with state and effect
pageCode = pageCode.replace(
  'const currentUser = { displayName: "User", email: "user@example.com", photoURL: "/profil.jpg", username: "user" };',
  'const [currentUser, setCurrentUser] = useState<any>({ displayName: "User", email: "user@example.com", photoURL: "/profil.jpg", username: "User" });\n' + effectCode
);

// 4. Inject notification portal
if (!pageCode.includes('notifPanelRef')) {
  // also need to add notifPanelRef
  pageCode = pageCode.replace('const notifBtnRef = React.useRef<HTMLButtonElement>(null);', 'const notifBtnRef = React.useRef<HTMLButtonElement>(null);\n  const notifPanelRef = React.useRef<HTMLDivElement>(null);\n');
  pageCode = pageCode.replace('</main>\n    </>', '</main>\n' + portalCode + '\n    </>');
}

// 5. Fix tab routing
// find setActiveTab("xxx"); window.history.pushState(null, "", `/${locale}/yyy`);
pageCode = pageCode.replace(/setActiveTab\([^)]+\);\s*window\.history\.pushState\([^,]+,\s*"",\s*`\/\$\{locale\}\/([^`]+)`\);/g, 'router.push(`/${locale}/$1`);');

// Let's also fix the logo routing:
pageCode = pageCode.replace(/setActiveTab\("home"\);\s*window\.history\.pushState\([^,]+,\s*"",\s*`\/\$\{locale\}\/beranda`\);/g, 'router.push(`/${locale}/beranda`);');

fs.writeFileSync('src/app/[locale]/page/page.tsx', pageCode);
console.log('Patched page.tsx successfully');
