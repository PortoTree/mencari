const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// ========================================================
// FIX 1: Restore broken useEffect for outside click
// The file is corrupted - the token useEffect code got merged into handleClickOutside
// We need to fix the useEffect block
// ========================================================

// The broken section looks like:
// useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//         const payload = JSON.parse(...   <-- WRONG, this is from token useEffect
// We need to rewrite this entire useEffect block properly

const brokenBlock = `  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username || payload.name) {
          setCurrentUser({
            username: payload.username || payload.name || "User",
            displayName: payload.displayName || payload.username || payload.name || "User"
          });
        }
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
  }, []);`;

const fixedBlock = `  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (chatSettingsRef.current && !chatSettingsRef.current.contains(event.target as Node)) {
        setIsChatSettingsOpen(false);
      }
      if (chatFilterRef.current && !chatFilterRef.current.contains(event.target as Node)) {
        setIsChatFilterOpen(false);
      }
      if (chatMenuRef.current && !chatMenuRef.current.contains(event.target as Node)) {
        setActiveChatMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeChatMenu]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username || payload.name) {
          setCurrentUser({
            username: payload.username || payload.name || "User",
            displayName: payload.displayName || payload.username || payload.name || "User"
          });
        }
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
  }, []);`;

file = file.replace(brokenBlock, fixedBlock);

// ========================================================
// FIX 2: Fix activeChatMenu type
// ========================================================
file = file.replace(
  '    const [activeChatMenu, setActiveChatMenu] = useState(null);',
  '    const [activeChatMenu, setActiveChatMenu] = useState<number | null>(null);'
);
file = file.replace(
  '    const chatMenuRef = useRef(null);',
  '    const chatMenuRef = useRef<HTMLDivElement>(null);'
);

fs.writeFileSync('src/app/beranda/page.tsx', file);

// Verify
const check = file.includes('setActiveChatMenu(null);') && 
              file.includes('removeEventListener') &&
              file.includes('token = localStorage') &&
              file.includes('Failed to parse token');
console.log('Fix result:', check ? 'SUCCESS' : 'FAILED');
console.log('Has close:', file.includes('chatMenuRef.current && !chatMenuRef'));
console.log('Has token useEffect:', file.includes('token = localStorage'));
console.log('No Bisukan:', !file.includes('Bisukan notifikasi'));
console.log('Has Sematkan:', file.includes('Sematkan obrolan'));
