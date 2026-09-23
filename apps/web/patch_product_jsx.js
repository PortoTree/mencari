const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Update state
code = code.replace('useState("Semua")', 'useState("all")');

// Update Title
code = code.replace('px-2 sm:px-0">Produk Digital</h2>', 'px-2 sm:px-0">{t("product.title")}</h2>');

// Update Placeholder
code = code.replace('placeholder="Cari produk digital..."', 'placeholder={t("product.search_placeholder")}');

// Update Filter Array & Render
code = code.replace('["Semua", "Ebook", "Template", "Prompt AI", "Course", "Design", "Software"]', '["all", "Ebook", "Template", "Prompt AI", "Course", "Design", "Software"]');
code = code.replace(
  '>\n                        {filter}\n                      </button>', 
  '>\n                        {filter === "all" ? t("product.filter_all") : filter}\n                      </button>'
);

// Update Badge
code = code.replace('shadow-sm">Baru</div>', 'shadow-sm">{t("product.badge_new")}</div>');

// Update Sold
code = code.replace('rounded">Terjual 12</span>', 'rounded">{t("product.sold")} 12</span>');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Successfully patched JSX strings');
