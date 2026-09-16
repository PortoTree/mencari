const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const shareButtonHtml = `
                    <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] px-4 py-1.5 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
                      <span className="text-[13px] font-medium">Bagikan</span>
                    </button>`;

const oldPost1Buttons = `                    <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] px-4 py-1.5 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      <span className="text-[13px] font-medium">Komentar</span>
                    </button>
                  </div>
                </div>

                {/* Post 2 */}`;

const newPost1Buttons = `                    <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] px-4 py-1.5 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      <span className="text-[13px] font-medium">Komentar</span>
                    </button>${shareButtonHtml}
                  </div>
                </div>

                {/* Post 2 */}`;

const oldPost2Buttons = `                    <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] px-4 py-1.5 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      <span className="text-[13px] font-medium">Komentar</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>`;

const newPost2Buttons = `                    <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] px-4 py-1.5 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      <span className="text-[13px] font-medium">Komentar</span>
                    </button>${shareButtonHtml}
                  </div>
                </div>

              </div>
            </div>`;

file = file.split(oldPost1Buttons).join(newPost1Buttons);
file = file.split(oldPost1Buttons.replace(/\n/g, '\r\n')).join(newPost1Buttons.replace(/\n/g, '\r\n'));

file = file.split(oldPost2Buttons).join(newPost2Buttons);
file = file.split(oldPost2Buttons.replace(/\n/g, '\r\n')).join(newPost2Buttons.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added Share buttons to friend feed posts');
