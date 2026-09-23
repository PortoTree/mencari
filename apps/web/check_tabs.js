const fs = require('fs');
const code = fs.readFileSync('nav_dump.txt', 'utf8');
const matches = code.match(/setActiveTab\("([^"]+)"\)/g);
console.log(matches);
