const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const floatingWrapperOld = '<div className="flex-1 flex items-center bg-[#F0F2F5] dark:bg-[#3A3B3C] border border-gray-300 dark:border-[#4E4F50] rounded-full px-3 py-1.5 min-w-0">';
const floatingWrapperNew = '<div className="flex-1 flex items-end bg-[#F0F2F5] dark:bg-[#3A3B3C] border border-gray-300 dark:border-[#4E4F50] rounded-[20px] px-3 py-1.5 min-w-0">';
code = code.replace(floatingWrapperOld, floatingWrapperNew);

const floatingInputOld = `<input 
                  type="text" 
                  placeholder={t("chat.typeMessage")} 
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-black dark:text-[#E4E6EB] placeholder-gray-500 dark:placeholder-[#B0B3B8] min-w-0"
                  value={floatingChatMessage}
                  onChange={(e) => setFloatingChatMessage(e.target.value)}
                />`;
const floatingInputNew = `<textarea 
                  rows={1}
                  placeholder={t("chat.typeMessage")} 
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-black dark:text-[#E4E6EB] placeholder-gray-500 dark:placeholder-[#B0B3B8] min-w-0 resize-none max-h-[100px] overflow-y-auto sidebar-scrollbar"
                  style={{ minHeight: "20px" }}
                  value={floatingChatMessage}
                  onChange={(e) => {
                    setFloatingChatMessage(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />`;
code = code.replace(floatingInputOld, floatingInputNew);


const mainWrapperOld = '<div className="flex-1 flex items-center bg-white dark:bg-[#242526] border border-gray-300 dark:border-[#3E4042] rounded-full px-4 py-2 ml-1">';
const mainWrapperNew = '<div className="flex-1 flex items-end bg-white dark:bg-[#242526] border border-gray-300 dark:border-[#3E4042] rounded-[24px] px-4 py-2 ml-1">';
code = code.replace(mainWrapperOld, mainWrapperNew);

const mainInputOld = `<input
                    type="text"
                    placeholder={t("chat.typeMessage")}
                    className="flex-1 bg-transparent outline-none text-[15px] text-black dark:text-[#E4E6EB]"
                    value={mainChatMessage}
                    onChange={(e) => setMainChatMessage(e.target.value)}
                  />`;
const mainInputNew = `<textarea
                    rows={1}
                    placeholder={t("chat.typeMessage")}
                    className="flex-1 bg-transparent outline-none text-[15px] text-black dark:text-[#E4E6EB] resize-none max-h-[120px] overflow-y-auto sidebar-scrollbar"
                    style={{ minHeight: "24px" }}
                    value={mainChatMessage}
                    onChange={(e) => {
                      setMainChatMessage(e.target.value);
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />`;
code = code.replace(mainInputOld, mainInputNew);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Replaced textareas successfully');
