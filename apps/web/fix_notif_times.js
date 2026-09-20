const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const fixes = [
  [6082, '5 menit yang lalu', '{t("notif.minutesAgo", { n: 5 })}'],
  [6100, '23 menit yang lalu', '{t("notif.minutesAgo", { n: 23 })}'],
  [6114, '2 jam yang lalu', '{t("notif.hoursAgo", { n: 2 })}'],
  [6126, 'Kemarin 14:30', '{`${t("notif.yesterday")} 14:30`}'],
  [6139, '3 hari yang lalu', '{t("notif.daysAgo", { n: 3 })}'],
];

for (const [lineNum, from, to] of fixes) {
  const idx = lineNum - 1;
  if (lines[idx] && lines[idx].includes(from)) {
    lines[idx] = lines[idx].replace(from, to);
    console.log('Fixed line', lineNum);
  } else {
    // search nearby
    for (let i = idx - 3; i <= idx + 3; i++) {
      if (lines[i] && lines[i].includes(from)) {
        lines[i] = lines[i].replace(from, to);
        console.log('Fixed line', i + 1, '(nearby)');
        break;
      }
    }
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
