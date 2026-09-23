const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// 1. Update Website CTA
// Find the exact block for Website CTA
let idx1 = code.indexOf('bg-emerald-500 rounded-xl overflow-hidden shadow-sm p-4 text-white relative');
if (idx1 !== -1) {
    // Change color to dark emerald
    code = code.substring(0, idx1) + 'bg-emerald-800 rounded-xl overflow-hidden shadow-sm p-4 text-white relative' + code.substring(idx1 + 'bg-emerald-500 rounded-xl overflow-hidden shadow-sm p-4 text-white relative'.length);
    
    // Replace icon
    // The icon is inside <div className="w-10 h-10 bg-white/20..."><svg ...></svg></div>
    let iconStart = code.indexOf('<div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">', idx1);
    let iconEnd = code.indexOf('</div>', iconStart) + 6;
    
    let newIcon = '<div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">\n                    <img src="/visit.png" alt="Website" className="w-6 h-6 object-contain" />\n                  </div>';
    
    code = code.substring(0, iconStart) + newIcon + code.substring(iconEnd);
}

// 2. Update Community CTA
let idx2 = code.indexOf('bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl overflow-hidden shadow-sm p-4 text-white relative mt-4');
if (idx2 !== -1) {
    // Change color to dark blue gradient
    code = code.substring(0, idx2) + 'bg-gradient-to-br from-blue-800 to-blue-950 rounded-xl overflow-hidden shadow-sm p-4 text-white relative mt-4' + code.substring(idx2 + 'bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl overflow-hidden shadow-sm p-4 text-white relative mt-4'.length);
    
    // Replace icon
    let iconStart = code.indexOf('<div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">', idx2);
    let iconEnd = code.indexOf('</div>', iconStart) + 6;
    
    let newIcon = '<div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">\n                    <img src="/navigasi/komunitas-aktif.svg" alt="Community" className="w-6 h-6 object-contain brightness-0 invert" />\n                  </div>';
    // (added brightness-0 invert so the SVG turns white, assuming it's normally a dark/colored icon)
    
    code = code.substring(0, iconStart) + newIcon + code.substring(iconEnd);
}

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Cards updated.');
