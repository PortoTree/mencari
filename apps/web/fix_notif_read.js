const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// isRead state:
// Unread (dot + bright): Friend Request (6074), Like (6092)
// Read (no dot + dimmed): Comment (6106), Group Invite (6119), Mention (6131)

// --- Fix container classes ---
// Friend Request (unread): already no opacity — add bg highlight for unread
const friendReqIdx = 6073;
lines[friendReqIdx] = lines[friendReqIdx].replace(
  'flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1"',
  'flex items-start gap-3 px-3 py-2.5 bg-blue-50/50 dark:bg-[#1a2535] hover:bg-blue-100/60 dark:hover:bg-[#1e2d40] cursor-pointer transition-colors rounded-xl mx-1"'
);

// Like (unread): add bg highlight
const likeIdx = 6091;
lines[likeIdx] = lines[likeIdx].replace(
  'flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1"',
  'flex items-start gap-3 px-3 py-2.5 bg-blue-50/50 dark:bg-[#1a2535] hover:bg-blue-100/60 dark:hover:bg-[#1e2d40] cursor-pointer transition-colors rounded-xl mx-1"'
);

// Comment (read): add opacity-60
const commentIdx = 6105;
lines[commentIdx] = lines[commentIdx].replace(
  'flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1"',
  'flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1 opacity-60"'
);

// Group Invite (read): add opacity-60
const groupIdx = 6118;
lines[groupIdx] = lines[groupIdx].replace(
  'flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1"',
  'flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors rounded-xl mx-1 opacity-60"'
);
// Mention (read): already has opacity-60 ✓

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Read/unread states applied');
