const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

let chatStart = -1;
let chatEnd = -1;

// Find Chat Tab
for (let i = 560; i < 700; i++) {
  if (lines[i].includes('setActiveTab("chat");')) {
    chatStart = i - 2;
    break;
  }
}

if (chatStart !== -1) {
  for (let i = chatStart; i < chatStart + 30; i++) {
    if (lines[i].includes('t("nav.chat")')) {
      chatEnd = i + 2; // closing span, then closing div
      break;
    }
  }
}

// Extract Chat Tab
let chatTabLines = [];
if (chatStart !== -1 && chatEnd !== -1) {
  chatTabLines = lines.splice(chatStart, chatEnd - chatStart + 1);
}

// Find Friend Tab
let friendStart = -1;
for (let i = 560; i < 700; i++) {
  if (lines[i] && lines[i].includes('setActiveTab("friend");')) {
    friendStart = i - 2;
    break;
  }
}

// Insert Chat Tab before Friend Tab
if (friendStart !== -1 && chatTabLines.length > 0) {
  lines.splice(friendStart, 0, ...chatTabLines);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Moved chat tab to the 3rd position');
} else {
  console.log('Failed to find positions', chatStart, chatEnd, friendStart);
}
