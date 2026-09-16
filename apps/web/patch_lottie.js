const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/mencari/page.tsx', 'utf8');
file = file.replace('import Lottie from "lottie-react";', 'import { Lottie } from "lottie-react";');
file = file.replace('<Lottie', '<Lottie');
fs.writeFileSync('src/app/[locale]/mencari/page.tsx', file);
