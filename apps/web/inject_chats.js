const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

const dummyArrayStr = `
const dummyChats = [
  { name: "Budi Santoso", date: "1 Jun", msg: "Halo bro, apa kabar? Udah la...", isOnline: false },
  { name: "Siti Aminah", date: "Rab", msg: "Project kemarin gimana kelanjutannya?", isOnline: true },
  { name: "Agus Pratama", date: "Sel", msg: "Wkwk siap bro ntar malam ya", isOnline: true },
  { name: "Dewi Lestari", date: "Min", msg: "Oke, dokumennya udah aku kirim ke email.", isOnline: false },
  { name: "Andi Wijaya", date: "Sab", msg: "Jadi nongkrong nggak nih hari ini?", isOnline: true },
  { name: "Rina Kusuma", date: "Kam", msg: "Thanks ya buat bantuannya kemarin!", isOnline: false },
  { name: "Fajar Nugroho", date: "Rab", msg: "Jangan lupa meeting jam 2 siang bro.", isOnline: true },
  { name: "Maya Indah", date: "Sen", msg: "Sipp, nanti aku kabarin lagi.", isOnline: false },
  { name: "Reza Pahlevi", date: "Sen", msg: "Tugas bagian backend udah aman?", isOnline: true },
  { name: "Nina Marlina", date: "31 Mei", msg: "Wah mantap tuh idenya, boleh dicoba.", isOnline: false },
  { name: "Eko Susilo", date: "30 Mei", msg: "Kirim aja linknya kesini bro", isOnline: true },
  { name: "Fitri Yani", date: "29 Mei", msg: "Haha bener banget", isOnline: false },
];

export default function Beranda() {`;

file = file.replace('export default function Beranda() {', dummyArrayStr);

const listRegex = /<div className="flex-1 overflow-y-auto \[&::-webkit-scrollbar\]:w-2 \[&::-webkit-scrollbar-thumb\]:bg-gray-300 \[&::-webkit-scrollbar-thumb\]:rounded-full">[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* New Message Panel \*\/)/;

const newListStr = `<div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {dummyChats.map((chat, idx) => (
                   <div key={idx} className="flex items-center gap-3 p-3 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden border border-emerald-600 dark:border-emerald-400">
                        <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                        {chat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-baseline">
                            <h4 className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] truncate">{chat.name}</h4>
                            <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] shrink-0">{chat.date}</span>
                         </div>
                         <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] truncate mt-0.5">{chat.msg}</p>
                      </div>
                   </div>
                  ))}
                 `;
file = file.replace(listRegex, newListStr);

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Dummy chats injected');
