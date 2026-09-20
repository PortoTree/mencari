const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Replace the right sidebar onClick to include setIsChatInfoOpen(true)
const oldStr = "onClick={() => { setActiveChatIdx(realIdx); setProfileViewIdx(null); setIsCreatingGroup(false); setSelectedNewChatUsers([]); }}";
const newStr = "onClick={() => { setActiveChatIdx(realIdx); setIsChatInfoOpen(true); setProfileViewIdx(null); setIsCreatingGroup(false); setSelectedNewChatUsers([]); }}";

code = code.replaceAll(oldStr, newStr);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed: added setIsChatInfoOpen(true) to right sidebar clicks');
