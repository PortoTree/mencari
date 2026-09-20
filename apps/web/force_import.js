const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// Find the exact line index of the react import 
let reactImportIdx = -1;
for (let i = 0; i < 10; i++) {
  if (lines[i] && lines[i].includes('useState, useEffect, useRef') && lines[i].includes('from "react"')) {
    reactImportIdx = i;
    break;
  }
}

if (reactImportIdx !== -1) {
  // Insert createPortal import right after
  lines.splice(reactImportIdx + 1, 0, 'import { createPortal } from "react-dom";');
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('createPortal import inserted at line', reactImportIdx + 2);
} else {
  console.log('React import not found');
}
