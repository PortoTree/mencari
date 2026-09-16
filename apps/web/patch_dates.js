const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const newChats = `dummyChats = [
  { name: "Budi Santoso", ts: Date.now() - 15 * 86400000, msg: "Halo bro, apa kabar? Udah la...", isOnline: false },
  { name: "Siti Aminah", ts: Date.now() - 3 * 86400000, msg: "Project kemarin gimana kelanjutannya?", isOnline: true },
  { name: "Agus Pratama", ts: Date.now() - 2 * 86400000, msg: "Wkwk siap bro ntar malam ya", isOnline: true },
  { name: "Dewi Lestari", ts: Date.now() - 6 * 86400000, msg: "Oke, dokumennya udah aku kirim ke email.", isOnline: false },
  { name: "Andi Wijaya", ts: Date.now() - 4 * 86400000, msg: "Jadi nongkrong nggak nih hari ini?", isOnline: true },
  { name: "Rina Kusuma", ts: Date.now() - 5 * 86400000, msg: "Thanks ya buat bantuannya kemarin!", isOnline: false },
  { name: "Fajar Nugroho", ts: Date.now() - 3 * 86400000, msg: "Jangan lupa meeting jam 2 siang bro.", isOnline: true },
  { name: "Maya Indah", ts: Date.now() - 1 * 86400000, msg: "Sipp, nanti aku kabarin lagi.", isOnline: false },
  { name: "Reza Pahlevi", ts: Date.now() - 1 * 86400000, msg: "Tugas bagian backend udah aman?", isOnline: true },
  { name: "Nina Marlina", ts: Date.now() - 16 * 86400000, msg: "Wah mantap tuh idenya, boleh dicoba.", isOnline: false },
  { name: "Eko Susilo", ts: Date.now() - 17 * 86400000, msg: "Kirim aja linknya kesini bro", isOnline: true },
  { name: "Fitri Yani", ts: Date.now() - 18 * 86400000, msg: "Haha bener banget", isOnline: false },
];

// Format tanggal chat sesuai locale (seperti WhatsApp/Facebook):
// - Hari ini: tampilkan jam (e.g., "14:30")
// - Dalam 7 hari: nama hari singkat (e.g., "Wed" / "Rab")  
// - Lebih lama: tanggal singkat (e.g., "1 Jun" / "Jun 1")
function formatChatDate(ts: number, locale: string): string {
  const now = Date.now();
  const diff = now - ts;
  const oneDay = 86400000;
  const sevenDays = 7 * oneDay;

  const date = new Date(ts);

  if (diff < oneDay && new Date(now).getDate() === date.getDate()) {
    // Hari ini: tampilkan jam
    return new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(date);
  } else if (diff < sevenDays) {
    // Dalam 7 hari: nama hari singkat
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
  } else {
    // Lebih dari 7 hari: tanggal + bulan singkat
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(date);
  }
}`;

// Use regex to replace the entire dummyChats array
file = file.replace(/dummyChats = \[[\s\S]*?\];/, newChats);

// Replace {chat.date} with {formatChatDate(chat.ts, locale)}
file = file.replace(/\{chat\.date\}/g, "{formatChatDate(chat.ts, locale)}");

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated dummyChats and replaced chat.date');
