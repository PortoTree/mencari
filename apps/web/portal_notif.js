const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// 1. Add createPortal to react import
for (let i = 0; i < 10; i++) {
  if (lines[i] && lines[i].includes('useState, useEffect, useRef')) {
    lines[i] = lines[i].replace(
      'import { useState, useEffect, useRef } from "react";',
      'import { useState, useEffect, useRef } from "react";\nimport { createPortal } from "react-dom";'
    );
    break;
  }
}

// 2. Wrap the notification panel block in createPortal
// Find the notif panel comment
let notifStart = -1;
let notifEnd = -1;
for (let i = 6000; i < lines.length; i++) {
  if (lines[i] && lines[i].includes('Notification Sidebar Panel')) {
    notifStart = i - 1; // the blank line before
    break;
  }
}

// find the closing </div> of the panel (the one that closes the Panel div)
let depth = 0;
let panelDivStart = -1;
for (let i = notifStart; i < notifStart + 200; i++) {
  if (lines[i] && lines[i].includes('className={`fixed top-0 right-0')) {
    panelDivStart = i - 1; // the <div ref=... line
    break;
  }
}

// Walk from notifStart and find the very last </div> of the whole block (after the last notification item)
for (let i = notifStart; i < notifStart + 200; i++) {
  if (lines[i] && lines[i].includes('3 hari yang lalu')) {
    // The end is a few lines after
    for (let j = i; j < i + 20; j++) {
      if (lines[j] && lines[j].trim() === '</div>') {
        notifEnd = j + 1; // include this closing </div>
      }
    }
    break;
  }
}

console.log('Notif block:', notifStart + 1, 'to', notifEnd + 1);

if (notifStart !== -1 && notifEnd !== -1) {
  // Remove the block
  const notifLines = lines.splice(notifStart, notifEnd - notifStart + 1);
  
  // Clean up the extracted lines (remove leading empty line if present)
  while (notifLines[0] && notifLines[0].trim() === '') notifLines.shift();
  
  // Wrap in createPortal
  const portalLines = [
    '',
    '  {/* Notification Panel — rendered via React Portal directly on document.body */}',
    '  {typeof document !== "undefined" && createPortal(',
    '    <>',
    ...notifLines,
    '    </>,',
    '    document.body',
    '  )}',
  ];
  
  // Insert the portal block right before the closing </main> tag in the new line positions
  let mainClose = -1;
  for (let i = lines.length - 1; i >= lines.length - 15; i--) {
    if (lines[i] && lines[i].trim() === '</main>') {
      mainClose = i;
      break;
    }
  }
  
  if (mainClose !== -1) {
    lines.splice(mainClose, 0, ...portalLines);
    fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
    console.log('Portal injected before </main>');
  } else {
    console.log('Could not find </main>');
  }
} else {
  console.log('Could not find notif panel bounds', notifStart, notifEnd);
}
