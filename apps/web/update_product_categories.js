const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// 1. Change the filter parent container styling
const oldParentRegex = /<div className="bg-white dark:bg-\[\#242526\] rounded-xl shadow-sm border border-gray-100 dark:border-\[\#3E4042\] p-2 flex flex-col divide-y divide-gray-100 dark:divide-\[\#3E4042\]">/g;
const newParent = '<div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-100 dark:border-[#3E4042] p-2 flex flex-col gap-0.5">';
code = code.replace(oldParentRegex, newParent);

// 2. Change the header styling
const oldHeaderRegex = /<h4 className="font-bold text-\[14px\] text-black dark:text-\[\#E4E6EB\] px-3 pt-3 pb-3">Kategori<\/h4>/g;
const newHeader = '<h4 className="font-bold text-[14px] text-black dark:text-[#E4E6EB] px-2 pt-1 pb-2">Kategori</h4>';
code = code.replace(oldHeaderRegex, newHeader);

// 3. Update the map loop button classes and onClick
const oldButtonRegex = /<button\s+key=\{cat\.id\}\s+onClick=\{\(\) => setProductFilter\(cat\.id\)\}\s+className=\{`w-full text-left px-3 py-2\.5 text-\[13\.5px\] font-medium transition-colors flex items-center gap-3 py-3 \$\{\s*productFilter === cat\.id\s*\?\s*"bg-emerald-50 text-emerald-600 dark:bg-\[\#203D2E\] dark:text-emerald-400 font-bold"\s*:\s*"text-gray-700 dark:text-\[\#E4E6EB\] hover:bg-gray-50 dark:hover:bg-\[\#3A3B3C\]"\s*\}`\}\s*>/g;

const newButton = `<button
                      key={cat.id}
                      onClick={() => {
                        setProductFilter(cat.id);
                        const url = new URL(window.location.href);
                        url.searchParams.set("category", cat.id);
                        window.history.pushState({}, "", url.toString());
                      }}
                      className={\`w-full text-left px-3 py-2.5 text-[13.5px] font-medium transition-colors flex items-center gap-3 rounded-lg \${
                        productFilter === cat.id
                          ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                          : "text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"
                      }\`}
                    >`;

code = code.replace(oldButtonRegex, newButton);


// 4. Inject useEffect for initial category reading
const hookRegex = /const \[productFilter, setProductFilter\] = useState\("all"\);/;
const newHook = `const [productFilter, setProductFilter] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const cat = url.searchParams.get("category");
      if (cat) {
        setProductFilter(cat);
      }
    }
  }, []);`;

code = code.replace(hookRegex, newHook);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Updated product filter styling and URL logic.');
