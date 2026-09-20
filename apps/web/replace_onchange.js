const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('onChange={(e) => {')) {
    if (lines[i+1].includes('setFloatingChatMessage') || lines[i+1].includes('setMainChatMessage')) {
      // It's the one we want.
      // Replace the next lines
      const isFloating = lines[i+1].includes('setFloatingChatMessage');
      
      lines[i+2] = "                    const prev = e.target.style.height;";
      lines[i+3] = "                    e.target.style.height = 'auto';";
      lines.splice(i+4, 0, 
                   "                    e.target.style.height = e.target.scrollHeight + 'px';",
                   "                    if (prev !== e.target.style.height) {",
                   "                      const msgs = e.target.closest('.flex-col')?.querySelector('.overflow-y-auto');",
                   "                      if (msgs) msgs.scrollTop = msgs.scrollHeight;",
                   "                    }"
      );
    }
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Fixed onChange successfully');
