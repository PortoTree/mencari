const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// 1. Update scrollToBottom
for (let i = 310; i < 330; i++) {
  if (lines[i] && lines[i].includes('chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;')) {
    // line i is chatContainerRef scroll
    // insert floating logic at i + 2
    if (!lines[i+2].includes('floatingChatContainerRef.current.scrollTop')) {
      lines.splice(i+2, 0, 
        '      if (floatingChatContainerRef.current) {',
        '        floatingChatContainerRef.current.scrollTop = floatingChatContainerRef.current.scrollHeight;',
        '      }'
      );
    }
    break;
  }
}

// 2. Update Date badge styling
for (let i = 3560; i < 3580; i++) {
  if (lines[i] && lines[i].includes('9/9/2026')) {
    // line i-1 is the span
    if (lines[i-1].includes('text-[11px]')) {
      lines[i-1] = lines[i-1].replace('text-[11px]', 'text-[12.5px]').replace('px-2.5', 'px-3').replace('py-0.5', 'py-1');
    }
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Fixed scrollToBottom and Date Badge!');
