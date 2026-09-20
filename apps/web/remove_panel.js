const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Remove New Chat Panel block
const panelStartStr = '             {/* New Chat Panel */}';
const panelEndStr = '               </div>\r\n            <div className="pt-4 px-4 border-b';

const panelStart = code.indexOf(panelStartStr);
const panelEndOffset = code.indexOf(panelEndStr);

if (panelStart !== -1 && panelEndOffset !== -1) {
  // Remove from panelStart to panelEndOffset (keep everything from panelEndStr onwards)
  const newCode = code.substring(0, panelStart) + '            <div className="pt-4 px-4 border-b' + code.substring(panelEndOffset + panelEndStr.length);
  
  // Also clean up any remaining isNewChatPanelOpen usages (just in case)
  const cleaned = newCode
    .replace(/setIsNewChatPanelOpen\(false\)/g, '')
    .replace(/setIsNewChatPanelOpen\(true\)/g, '');
  
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', cleaned);
  console.log('Panel removed!');
} else {
  console.log('Panel not found:', panelStart, panelEndOffset);
}
