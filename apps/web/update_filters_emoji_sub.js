const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const searchStartIndex = code.indexOf('{["all", "Ebook", "Template", "Prompt AI", "Course", "Design", "Software"].map((filter) => (');
const searchEndIndex = code.indexOf('))}', searchStartIndex);

if (searchStartIndex !== -1 && searchEndIndex !== -1) {
  const oldText = code.substring(searchStartIndex, searchEndIndex + 3);

  const newCode = `{[
                    { id: "all", label: t("product.filter_all"), emoji: "💠" },
                    { id: "ai_prompt", label: "AI & Prompt", emoji: "🤖" },
                    { id: "design", label: "Desain & Grafis", emoji: "🎨" },
                    { id: "document", label: "Dokumen & Template", emoji: "📄" },
                    { id: "ebook", label: "Ebook & Buku Digital", emoji: "📚" },
                    { id: "course", label: "Kursus & Edukasi", emoji: "🎓" },
                    { id: "software", label: "Software & Tools", emoji: "💻" },
                    { id: "business", label: "Bisnis & Keuangan", emoji: "📊" },
                    { id: "social", label: "Social Media", emoji: "📱" },
                    { id: "photo_video", label: "Foto & Video", emoji: "📷" },
                    { id: "audio", label: "Audio & Musik", emoji: "🎵" },
                    { id: "gaming", label: "Gaming", emoji: "🎮" },
                    { id: "website", label: "Website & Development", emoji: "🌐" },
                    { id: "career", label: "Karier & Profesional", emoji: "🧑‍💼" },
                    { id: "printable", label: "Printable", emoji: "🖨️" },
                    { id: "3d_asset", label: "3D & Asset", emoji: "🧩" },
                    { id: "font", label: "Font & Typography", emoji: "✍️" },
                    { id: "marketing", label: "Marketing", emoji: "📈" },
                    { id: "lifestyle", label: "Lifestyle", emoji: "🧘" },
                    { id: "membership", label: "Membership & Subscription", emoji: "🔒" },
                    { id: "bundle", label: "Bundle & Resource Pack", emoji: "📦" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setProductFilter(cat.id)}
                      className={\`w-full text-left px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors flex items-center gap-3 border-b border-transparent hover:border-gray-100 dark:hover:border-[#3E4042] \${
                        productFilter === cat.id
                          ? "bg-emerald-50 text-emerald-600 dark:bg-[#203D2E] dark:text-emerald-400 font-bold"
                          : "text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-50 dark:hover:bg-[#3A3B3C]"
                      }\`}
                    >
                      <span className="text-[16px] leading-none shrink-0">{cat.emoji}</span>
                      <span className="truncate">{cat.label}</span>
                    </button>
                  ))}`;

  code = code.replace(oldText, newCode);
  code = code.replace('Kategori Produk</h4>', 'Kategori</h4>');
  
  // Wait, I should make the entire container styling more like a vertical nav list, with divider lines instead of transparent borders.
  // The image shows the faint lines BETWEEN every item, effectively a `divide-y divide-gray-100 dark:divide-[#3E4042]` container.
  const oldContainerStart = 'p-2 space-y-1">\r\n                  <h4 className="font-bold text-[13px] text-gray-500 dark:text-[#B0B3B8] px-2 pt-2 pb-1">Kategori</h4>';
  const newContainerStart = 'p-2 flex flex-col divide-y divide-gray-100 dark:divide-[#3E4042]">\r\n                  <h4 className="font-bold text-[13px] text-gray-500 dark:text-[#B0B3B8] px-2 pt-2 pb-2">Kategori</h4>';
  code = code.replace(oldContainerStart, newContainerStart);
  // Remove rounded-lg and borders from button since divide-y handles it
  code = code.replace('rounded-lg text-[13.5px] font-medium transition-colors flex items-center gap-3 border-b border-transparent hover:border-gray-100 dark:hover:border-[#3E4042]', 'text-[13.5px] font-medium transition-colors flex items-center gap-3 py-3');
  
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully updated category filters with emojis');
} else {
  console.log('Could not find start or end index for old array');
}
