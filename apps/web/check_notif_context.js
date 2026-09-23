const fs = require('fs');
const dump = fs.readFileSync('nav_dump.txt', 'utf8');
const lines = dump.split('\n');
lines.forEach((l, i) => {
  if (l.includes('isNotifPanelOpen')) {
    console.log('--- Line', i);
    for(let j = Math.max(0, i-2); j <= Math.min(lines.length-1, i+5); j++) {
      console.log(lines[j]);
    }
  }
});
