              <div className="flex items-center gap-6 pr-2">
                <button className="text-[#00B47A] transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <button 
                  onClick={() => setIsChatInfoOpen(!isChatInfoOpen)}
                  className="text-[#00B47A] transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              <div className="flex flex-col items-center justify-center my-6">
                <div className="w-24 h-24 bg-gray-200 dark:bg-[#3A3B3C] rounded-full flex items-center justify-center mb-3">
                   <svg className="w-12 h-12 text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                </div>
                <h3 className="font-bold text-[20px] text-black dark:text-[#E4E6EB]">Pam Faiz</h3>
                <p className="text-[14px] text-gray-500 dark:text-[#B0B3B8] mt-1">{t('chat.youCreatedGroup')}</p>
              </div>

              <div className="text-center my-4">
                <span className="text-[12px] text-gray-400 dark:text-[#B0B3B8]">09:06</span>
              </div>
              
              <div className="flex items-end justify-end gap-2 max-w-[70%] self-end">
                <div className="flex flex-col items-end">
                  <div className="bg-[#00B47A] px-4 py-2 rounded-2xl rounded-tr-none shadow-sm">
                    <p className="text-[15px] text-white">test</p>
                  </div>