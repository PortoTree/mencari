const fs = require('fs');
let svg = fs.readFileSync('C:/mencari-online/apps/web/public/pemberitahuan.svg', 'utf8');

const gradientDefs = `
<defs>
  <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#FF7A00" />
    <stop offset="100%" stop-color="#FFCA28" />
  </linearGradient>
</defs>
`;

// Insert <defs> right after <svg ...>
svg = svg.replace(/(<svg[^>]*>)/, `$1${gradientDefs}`);

// Replace all existing fill colors with the gradient URL
svg = svg.replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="url(#orangeGradient)"');

fs.writeFileSync('C:/mencari-online/apps/web/public/pemberitahuan.svg', svg);
console.log('Successfully updated SVG with orange gradient');
