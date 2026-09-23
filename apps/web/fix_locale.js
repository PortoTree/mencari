const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

// Add import if missing
if (!code.includes('useLocale')) {
  code = code.replace('import { useTranslations } from "next-intl";', 'import { useTranslations, useLocale } from "next-intl";');
}

// Replace hardcoded locale
code = code.replace('const locale = "id"; // fallback locale', 'const locale = useLocale();');
// Wait, I might have modified it earlier to: const locale = "id"; // useLocale() would be better but lets just bypass TS error
code = code.replace(/const locale = "id";.*/, 'const locale = useLocale();');

fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
console.log('Fixed locale usage');
