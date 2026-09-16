const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/mencari/page.tsx', 'utf8');
file = file.replace('import { Lottie } from "lottie-react";', '// @ts-ignore\nimport Lottie from "lottie-react";');
fs.writeFileSync('src/app/[locale]/mencari/page.tsx', file);
