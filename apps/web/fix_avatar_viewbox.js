const fs = require("fs");
let file = fs.readFileSync("src/app/beranda/page.tsx", "utf8");

file = file.replace(/className="w-\[115%\] h-\[115%\] mt-\[15%\]([^"]*)" fill="currentColor" viewBox="0 0 20 20"/g, "className=\"w-full h-full pt-1.5$1\" fill=\"currentColor\" viewBox=\"2 0 16 18\"");

file = file.replace(/className="w-\[115%\] h-\[115%\] mt-\[15%\]" fill="currentColor" viewBox="0 0 20 20"/g, "className=\"w-full h-full pt-1.5\" fill=\"currentColor\" viewBox=\"2 0 16 18\"");

fs.writeFileSync("src/app/beranda/page.tsx", file);
console.log("Fixed avatar viewBoxes");
