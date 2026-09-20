const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// Find bounds
let portalStart = -1;
for (let i = 6030; i < 6050; i++) {
  if (lines[i] && lines[i].includes('Notification Panel Portal')) {
    portalStart = i;
    break;
  }
}

let portalEnd = -1;
for (let i = 6170; i < 6190; i++) {
  if (lines[i] && lines[i].trim() === ')}'  ) {
    portalEnd = i;
    break;
  }
}

let mainClose = -1;
for (let i = lines.length - 1; i > lines.length - 20; i--) {
  if (lines[i] && lines[i].includes('</main>')) {
    mainClose = i;
    break;
  }
}

console.log('Portal:', portalStart + 1, '-', portalEnd + 1);
console.log('</main>:', mainClose + 1);

// Extract portal block (lines portalStart to portalEnd inclusive)
const portalBlock = lines.splice(portalStart, portalEnd - portalStart + 1);

// Re-find </main> after splice
mainClose = -1;
for (let i = lines.length - 1; i > lines.length - 20; i--) {
  if (lines[i] && lines[i].includes('</main>')) {
    mainClose = i;
    break;
  }
}

// Re-find closing ); after </main>
let returnClose = mainClose + 1;

// Insert portal AFTER </main> and ); (after the return statement, before the final })
// Actually, for Next.js with "use client", portal must be inside the return()
// The proper place is right after </main> but still inside return()
// return (
//   <main>...</main>
//   {isMounted && createPortal(...)}    <-- here
// );
// This requires wrapping the return in a fragment <>...</>

// Check if return is wrapped in fragment
let returnOpen = -1;
for (let i = 500; i < lines.length; i++) {
  if (lines[i] && lines[i].trim() === 'return (') {
    returnOpen = i;
    break;
  }
}
console.log('return ( at:', returnOpen + 1);

// Check what's right after return (
console.log('After return:', lines[returnOpen + 1].trim());

// If it's <main, we need to wrap in fragment
if (lines[returnOpen + 1].trim().startsWith('<main')) {
  // Wrap: add <> after return ( and add </> before );
  lines.splice(returnOpen + 1, 0, '  <>');
  
  // Re-find </main> after splice
  mainClose = -1;
  for (let i = lines.length - 1; i > lines.length - 20; i--) {
    if (lines[i] && lines[i].includes('</main>')) {
      mainClose = i;
      break;
    }
  }
  
  // Insert portal + </> after </main>
  lines.splice(mainClose + 1, 0, 
    ...portalBlock,
    '  </>'
  );
} else {
  // Already in fragment, just insert portal before </> closing
  // Find </> before );
  for (let i = lines.length - 1; i > lines.length - 15; i--) {
    if (lines[i] && lines[i].trim() === '</>') {
      lines.splice(i, 0, ...portalBlock);
      break;
    }
  }
}

// Remove trailing "undefined" lines at end of file
while (lines[lines.length - 1] !== undefined && lines[lines.length - 1].trim() === 'undefined') {
  lines.pop();
}
while (lines[lines.length - 1] !== undefined && lines[lines.length - 1].trim() === '') {
  lines.pop();
}
lines.push('');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Portal moved OUTSIDE </main>');
