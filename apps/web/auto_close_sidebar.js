const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const target = `  useEffect(() => {
    if (activeTab === "chat") {
      setActiveFloatingChatIdx(null);
    }
  }, [activeTab]);`;

const newCode = `  useEffect(() => {
    if (activeTab === "chat") {
      setActiveFloatingChatIdx(null);
    }
    
    // Auto-close sidebars when leaving their tabs
    if (activeTab !== "product") {
      setIsProductDetailOpen(false);
    }
    if (activeTab !== "beranda") {
      setIsProfileSidebarOpen(false);
    }
  }, [activeTab]);`;

// Deal with CRLF variations
const normalizedCode = code.replace(/\r\n/g, '\n');
if (normalizedCode.includes(target.replace(/\r\n/g, '\n'))) {
  code = normalizedCode.replace(target.replace(/\r\n/g, '\n'), newCode);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Sidebar auto-close logic injected via activeTab useEffect.');
} else {
  console.log('Could not find target useEffect.');
}
