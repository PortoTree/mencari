const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

let inWidgetList = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Chat Bubble Fixed bottom right')) {
    inWidgetList = true;
  }
  if (inWidgetList && lines[i].includes('Floating Chat Room Panel')) {
    inWidgetList = false;
  }
  
  if (inWidgetList && lines[i].includes('<button') && lines[i+1] && lines[i+1].includes('onClick={(e) => {')) {
    // Let's check a bit further down for setActiveChatMenu
    let hasChatMenu = false;
    for(let j=i; j<i+10; j++) {
      if (lines[j] && lines[j].includes('setActiveChatMenu')) hasChatMenu = true;
    }
    
    if (hasChatMenu) {
      let buttonEndIdx = -1;
      for (let j = i; j < i + 40; j++) {
        if (lines[j] && lines[j].includes('</button>')) {
          buttonEndIdx = j;
          break;
        }
      }
      if (buttonEndIdx !== -1) {
        for (let j = i; j <= buttonEndIdx; j++) {
          lines[j] = ''; // blank it out
        }
        console.log('Removed button starting at line ' + i);
      }
    }
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
