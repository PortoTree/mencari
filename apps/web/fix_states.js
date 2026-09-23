const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

const missingStates = `
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentUser = { displayName: "User", email: "user@example.com", photoURL: "/profil.jpg" };
`;

code = code.replace('const [slug, setSlug] = useState("");', 'const [slug, setSlug] = useState("");\n' + missingStates);

// add to click outside
code = code.replace('if (notifBtnRef.current', 'if (langRef.current && !langRef.current.contains(event.target as Node)) setIsLangOpen(false);\n      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsDropdownOpen(false);\n      if (notifBtnRef.current');

fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
console.log('Fixed states');
