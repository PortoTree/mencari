const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const regex = /\{\["all", "Ebook", "Template", "Prompt AI", "Course", "Design", "Software"\]\.map\(\(filter\) => \([\s\S]*?\}\)\)\}/;

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

if (regex.test(code)) {
  code = code.replace(regex, newCode);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully updated category filters with emojis');
} else {
  console.log('Regex did not match');
}
