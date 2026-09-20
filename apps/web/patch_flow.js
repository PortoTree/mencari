const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Remove MiniListPreview completely
const startStr = ': selectedFriendsToAdd.length > 0 ? (';
const endStr = ') : profileViewIdx !== null ? (';

const startIndex = code.indexOf(startStr);
const endIndex = code.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  // Replace everything between startIndex and endIndex + the endStr itself, replacing with just the end part
  const before = code.substring(0, startIndex);
  const after = code.substring(endIndex + endStr.length - 'profileViewIdx !== null ? ('.length);
  
  code = before + after;
  console.log('Removed MiniListPreview block.');
} else {
  console.log('MiniListPreview block not found.');
}

// 2. Hide sticky footer when isCreatingGroup is true
const footerStr = '{selectedFriendsToAdd.length > 0 && (\\r?\\n\\s*<div className="px-4 py-3 border-t border-gray-200';
const footerRegex = /\{selectedFriendsToAdd\.length > 0 && \(\s*<div className="px-4 py-3 border-t border-gray-200/;

if (footerRegex.test(code)) {
  code = code.replace(
    footerRegex,
    '{(selectedFriendsToAdd.length > 0 && !isCreatingGroup) && (\n                <div className="px-4 py-3 border-t border-gray-200'
  );
  console.log('Updated sticky footer condition.');
} else {
  console.log('Sticky footer not found.');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
