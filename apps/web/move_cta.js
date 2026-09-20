const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// The original CTA block
const ctaRegex = /<div className="bg-gradient-to-br from-emerald-500[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/;
const match = code.match(ctaRegex);

if (match) {
  let ctaContent = match[0];
  
  // Remove it from the original location
  code = code.replace(ctaContent, '{/* CTA moved to center */}');

  // Add some classes to the CTA block to keep it centered and a reasonable width
  ctaContent = ctaContent.replace(
    'className="bg-gradient-to-br', 
    'className="w-full max-w-[320px] mx-auto mt-6 bg-gradient-to-br'
  );

  // Insert it after the Add Shortcut button
  const shortcutRegex = /\{t\("mencari\.shortcut_add"\)\}\s*<\/span>\s*<\/div>\s*<\/div>/;
  code = code.replace(shortcutRegex, (shortcutMatch) => {
    return shortcutMatch + '\n\n' + '              {/* Moved CTA Block */}\n              ' + ctaContent;
  });

  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully moved CTA block');
} else {
  console.log('CTA block not found');
}
