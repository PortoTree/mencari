const fs = require('fs');
let svg = fs.readFileSync('C:/mencari-online/apps/web/public/pemberitahuan.svg', 'utf8');

if (!svg.includes('viewBox=')) {
  // Replace the opening tag to include viewBox
  svg = svg.replace(
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512">',
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">'
  );
  fs.writeFileSync('C:/mencari-online/apps/web/public/pemberitahuan.svg', svg);
  console.log('Fixed SVG by adding viewBox');
} else {
  console.log('SVG already has viewBox');
}
