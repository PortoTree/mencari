const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const replacements = [
  // Header title
  ['<h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">Pemberitahuan</h2>',
   '<h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">{t("notif.title")}</h2>'],

  // Filter tabs
  ['{["Semua", "Belum Dibaca"].map((tab, idx) => (',
   '{[t("notif.all"), t("notif.unread")].map((tab, idx) => ('],

  // Friend request text
  ['<span className="font-semibold">Budi Santoso</span> mengirimkan permintaan pertemanan kepada kamu.',
   '{t("notif.friendRequest", { name: "Budi Santoso" })}'],

  // Friend request time
  ['"5 menit yang lalu"',
   't("notif.minutesAgo", { n: 5 })'],

  // Confirm button
  ['>Konfirmasi<',
   '>{t("notif.confirm")}<'],

  // Delete button
  ['>Hapus<',
   '>{t("notif.delete")}<'],

  // Like text
  ['<span className="font-semibold">Siti Aminah</span> menyukai postingan kamu.',
   '{t("notif.likedPost", { name: "Siti Aminah" })}'],

  // Like time
  ['"23 menit yang lalu"',
   't("notif.minutesAgo", { n: 23 })'],

  // Comment text
  ['<span className="font-semibold">Agus Pratama</span> mengomentari postingan kamu: <span className="italic">"Keren banget bro!"</span>',
   '{t("notif.commented", { name: "Agus Pratama", text: "Keren banget bro!" })}'],

  // Comment time
  ['"2 jam yang lalu"',
   't("notif.hoursAgo", { n: 2 })'],

  // Group invite text
  ['<span className="font-semibold">Dewi Lestari</span> mengundangmu ke grup <span className="font-semibold">Programmer Jakarta</span>.',
   '{t("notif.groupInvite", { name: "Dewi Lestari", group: "Programmer Jakarta" })}'],

  // Group invite time
  ['"Kemarin 14:30"',
   '`${t("notif.yesterday")} 14:30`'],

  // Mention text
  ['<span className="font-semibold">Andi Wijaya</span> menyebutmu di sebuah komentar.',
   '{t("notif.mentioned", { name: "Andi Wijaya" })}'],

  // Mention time
  ['"3 hari yang lalu"',
   't("notif.daysAgo", { n: 3 })'],
];

let count = 0;
for (const [from, to] of replacements) {
  if (code.includes(from)) {
    code = code.replace(from, to);
    count++;
  } else {
    console.log('NOT FOUND:', from.substring(0, 60));
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log(`Replaced ${count}/${replacements.length} hardcoded strings`);
