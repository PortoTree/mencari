const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Upgrade the product detail sidebar z-index to z-[9999] to definitely be on top of everything
code = code.replace(
  'isProductDetailOpen ? "translate-x-0" : "translate-x-full"} z-[60]`',
  'isProductDetailOpen ? "translate-x-0" : "translate-x-full"} z-[9999]`'
);

// Mobile overlay
code = code.replace(
  '"fixed inset-0 z-[59] lg:hidden bg-black/50"',
  '"fixed inset-0 z-[9998] lg:hidden bg-black/50"'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Done. z-index raised to 9999.');
