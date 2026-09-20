const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Replace hover bg on buttons
// Middle View Buttons
code = code.replace(/<button className="w-full flex items-center justify-between py-5 hover:bg-gray-50 dark:hover:bg-\[#3A3B3C\]\/50 transition-colors group px-4 rounded-lg mt-2">/g, '<button className="w-full flex items-center justify-between py-5 transition-colors group px-4 rounded-lg mt-2">');

// Right Sidebar Buttons
code = code.replace(/<button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 dark:hover:bg-\[#3A3B3C\]\/50 transition-colors group px-2 -mx-2 rounded-lg">/g, '<button className="w-full flex items-center justify-between py-4 transition-colors group px-2 -mx-2 rounded-lg">');

// Replace span to add group-hover:underline
code = code.replace(/<span className="font-semibold text-\[16px\] text-black dark:text-\[#E4E6EB\]">\{t\("chat\.links", \{ defaultMessage: "Links" \}\)\}<\/span>/g, '<span className="font-semibold text-[16px] text-black dark:text-[#E4E6EB] group-hover:underline">{t("chat.links", { defaultMessage: "Links" })}</span>');
code = code.replace(/<span className="font-semibold text-\[16px\] text-black dark:text-\[#E4E6EB\]">\{t\("chat\.mediaGallery"\)\}<\/span>/g, '<span className="font-semibold text-[16px] text-black dark:text-[#E4E6EB] group-hover:underline">{t("chat.mediaGallery")}</span>');
code = code.replace(/<span className="font-semibold text-\[16px\] text-black dark:text-\[#E4E6EB\]">\{t\("chat\.mediaFile"\)\}<\/span>/g, '<span className="font-semibold text-[16px] text-black dark:text-[#E4E6EB] group-hover:underline">{t("chat.mediaFile")}</span>');

// Right Sidebar Spans
code = code.replace(/<span className="font-semibold text-\[15px\] text-black dark:text-\[#E4E6EB\]">\{t\("chat\.links"\)\}<\/span>/g, '<span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB] group-hover:underline">{t("chat.links")}</span>');
code = code.replace(/<span className="font-semibold text-\[15px\] text-black dark:text-\[#E4E6EB\]">\{t\("chat\.mediaGallery"\)\}<\/span>/g, '<span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB] group-hover:underline">{t("chat.mediaGallery")}</span>');
code = code.replace(/<span className="font-semibold text-\[15px\] text-black dark:text-\[#E4E6EB\]">\{t\("chat\.mediaFile"\)\}<\/span>/g, '<span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB] group-hover:underline">{t("chat.mediaFile")}</span>');

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log("Done");
