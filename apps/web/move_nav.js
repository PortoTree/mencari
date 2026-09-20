const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// 1. Remove from Right Icons
let startRightChat = -1;
let endRightChat = -1;

for (let i = 650; i < 700; i++) {
  if (lines[i] && lines[i].includes('onClick={() => {') && lines[i+1].includes('setActiveTab("chat");')) {
    startRightChat = i - 2; // the <div className="relative group"> before <button
    break;
  }
}

for (let i = startRightChat; i < startRightChat + 30; i++) {
  if (lines[i] && lines[i].includes('</div>')) {
    // Wait, the block is:
    // <div className="relative group">
    //   <button ...>
    //     <img ... />
    //   </button>
    //   <div className="absolute ...">
    //     {t("nav.chat")}
    //   </div>
    // </div>
    // So there are two </div>s to close the relative group and the absolute tooltip.
    // Actually, I can just slice exactly. Let's find exactly.
  }
}

// 2. Add to Center Tabs
let centerTabsEnd = -1;
for (let i = 560; i < 700; i++) {
  if (lines[i] && lines[i].includes('{/* Right: Icons & Avatar */}')) {
    // The center tabs block ends a few lines before this
    centerTabsEnd = i - 2;
    break;
  }
}

// Using a smarter regex or exact string replacement for the removal.
