const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Add states for floating attachment menu if not exists
if (!code.includes('isFloatingAttachmentMenuOpen')) {
  code = code.replace(
    'const [isFloatingChatFilterOpen, setIsFloatingChatFilterOpen] = useState(false);',
    'const [isFloatingChatFilterOpen, setIsFloatingChatFilterOpen] = useState(false);\n  const [isFloatingAttachmentMenuOpen, setIsFloatingAttachmentMenuOpen] = useState(false);\n  const floatingAttachmentMenuRef = useRef<HTMLDivElement>(null);'
  );
  
  // Add to handleClickOutside
  code = code.replace(
    '        setIsFloatingChatFilterOpen(false);\n      }',
    '        setIsFloatingChatFilterOpen(false);\n      }\n      if (\n        floatingAttachmentMenuRef.current &&\n        !floatingAttachmentMenuRef.current.contains(event.target as Node)\n      ) {\n        setIsFloatingAttachmentMenuOpen(false);\n      }'
  );
}

const lines = code.split('\n');

let startInput = -1;
let endInput = -1;
let inFloatingRoom = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('{/* Floating Chat Room Panel */}')) {
    inFloatingRoom = true;
  }
  
  // Widen and heighten
  if (inFloatingRoom && lines[i].includes('w-[320px]') && lines[i].includes('h-[450px]')) {
    lines[i] = lines[i].replace('w-[320px]', 'w-[380px]').replace('h-[450px]', 'h-[500px]');
  }

  if (inFloatingRoom && lines[i].includes('{/* Input Area */}')) {
    startInput = i;
  }
  if (startInput !== -1 && lines[i].includes('{/* New Message Panel */}')) {
    endInput = i;
    // We actually need to keep the </div> that closes Floating Chat Room Panel.
    // The Input Area ends a bit before New Message Panel.
    // Let's step back until we hit '</div>' '</div>' or similar
    break;
  }
}

if (startInput !== -1) {
  // Let's find the closing tags precisely
  for (let j = startInput; j < lines.length; j++) {
    if (lines[j].includes('        {/* New Message Panel */}')) {
      endInput = j - 2; // leave the closing </div> of floating chat room
      break;
    }
  }

  const exactInput = `          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-[#242526] shrink-0 border-t border-gray-200 dark:border-[#3E4042]">
            <div className="flex items-center gap-1.5">
              <div className="relative" ref={floatingAttachmentMenuRef}>
                <button 
                  onClick={() => setIsFloatingAttachmentMenuOpen(!isFloatingAttachmentMenuOpen)}
                  className="bg-[#00B47A] text-white hover:bg-[#009E6B] p-1.5 rounded-full transition-colors flex items-center justify-center shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                
                {isFloatingAttachmentMenuOpen && (
                  <div className="absolute bottom-full left-0 mb-3 w-[200px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-[#3E4042] overflow-hidden py-1.5 z-50">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-medium text-black dark:text-[#E4E6EB] transition-colors">
                      <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#2D88FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      {t("chat.uploadImage")}
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-medium text-black dark:text-[#E4E6EB] transition-colors">
                      <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      {t("chat.uploadFile")}
                    </button>
                  </div>
                )}
              </div>
              <button className="text-gray-500 dark:text-[#A8ABAF] hover:text-[#00B47A] transition-colors p-1.5 shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex-1 flex items-center bg-[#F0F2F5] dark:bg-[#3A3B3C] border border-gray-300 dark:border-[#4E4F50] rounded-full px-3 py-1.5 min-w-0">
                <input
                  type="text"
                  placeholder={t("chat.typeMessage")}
                  className="flex-1 bg-transparent outline-none text-[13px] text-black dark:text-[#E4E6EB] min-w-0"
                />
                <button className="bg-[#00B47A] text-white p-1 rounded-full hover:bg-[#009E6B] ml-1.5 transition-colors shrink-0 flex items-center justify-center w-6 h-6">
                  <svg className="w-3.5 h-3.5 translate-x-[1px] -translate-y-[1px]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
              <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full transition-colors font-bold text-[11px] shadow-sm shrink-0">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <g
                    transform="translate(0,512) scale(0.1,-0.1)"
                    stroke="none"
                  >
                    <path d="M2256 5104 c-140 -34 -288 -147 -353 -269 -49 -94 -66 -167 -65 -275 2 -215 153 -2686 167 -2744 51 -199 230 -368 429 -405 141 -26 291 -6 405 54 135 71 253 228 281 375 6 30 46 661 90 1402 71 1228 77 1353 65 1422 -38 221 -198 389 -420 441 -83 20 -515 19 -599 -1z" />
                    <path d="M414 3206 c-42 -18 -71 -60 -137 -191 -130 -260 -208 -507 -253 -800 -26 -169 -26 -541 0 -710 23 -151 74 -359 121 -495 41 -119 172 -397 212 -448 77 -101 228 -72 261 51 14 49 9 64 -80 242 -108 220 -176 432 -215 680 -24 153 -24 497 0 650 39 248 107 460 215 680 89 178 94 193 80 242 -24 90 -119 136 -204 99z" />
                    <path d="M4596 3210 c-58 -18 -96 -73 -96 -140 0 -30 19 -79 78 -198 112 -227 175 -424 218 -687 26 -154 26 -496 0 -650 -43 -263 -106 -460 -218 -687 -88 -177 -96 -219 -55 -278 59 -87 177 -91 240 -9 40 53 161 309 206 436 214 601 197 1264 -46 1848 -40 95 -133 277 -160 314 -40 53 -99 71 -167 51z" />
                    <path d="M934 2906 c-43 -19 -74 -63 -138 -196 -222 -463 -256 -981 -95 -1465 45 -136 142 -344 183 -392 66 -78 194 -64 241 27 29 56 19 106 -44 232 -88 175 -141 346 -167 537 -43 327 17 667 172 972 42 82 54 116 54 151 0 106 -108 176 -206 134z" />
                    <path d="M4063 2900 c-25 -11 -51 -33 -63 -52 -35 -58 -27 -103 44 -250 120 -250 176 -482 176 -738 0 -256 -56 -488 -176 -738 -74 -153 -80 -194 -39 -254 34 -50 100 -76 154 -59 65 19 89 47 155 181 270 546 274 1171 11 1718 -68 142 -88 170 -139 193 -52 23 -71 23 -123 -1z" />
                    <path d="M1475 2613 c-66 -16 -133 -122 -198 -308 -56 -164 -71 -258 -71 -445 0 -122 4 -188 18 -255 39 -190 139 -423 200 -470 47 -35 95 -41 150 -17 98 44 110 122 42 265 -56 117 -83 199 -101 312 -36 221 1 450 106 656 45 88 51 145 19 197 -31 51 -105 80 -165 65z" />
                    <path d="M3577 2610 c-58 -10 -108 -65 -114 -124 -5 -41 0 -60 40 -144 58 -124 84 -205 102 -317 36 -221 4 -424 -102 -645 -39 -82 -45 -100 -40 -143 10 -112 144 -168 236 -99 58 43 159 284 198 472 13 61 18 131 18 250 0 119 -5 189 -18 250 -39 186 -140 429 -197 471 -35 26 -78 36 -123 29z" />
                    <path d="M2455 1090 c-198 -44 -352 -180 -417 -368 -32 -95 -32 -249 0 -344 56 -164 180 -288 348 -350 85 -31 263 -31 348 0 168 62 292 186 348 350 32 -95 32 -249 0 -344 -57 -164 -183 -291 -348 -349 -67 23 -215 33 -279 19z" />
                  </g>
                </svg>
                PING
              </button>
            </div>
          </div>`;

  lines.splice(startInput, endInput - startInput, ...exactInput.split('\n'));
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Successfully updated input area and expanded window size.');
}
