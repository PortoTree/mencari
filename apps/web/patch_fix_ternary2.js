const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Remove the incorrectly placed `</> )}` at Profile Right Sidebar
const badEnd2 = `                </div>
             </div>
          </div>
        </div>
            </>
          )}

    
        {/* Profile Right Sidebar */}`;
const fixEnd2 = `                </div>
             </div>
          </div>
        </div>

    
        {/* Profile Right Sidebar */}`;
file = file.split(badEnd2).join(fixEnd2);
file = file.split(badEnd2.replace(/\n/g, '\r\n')).join(fixEnd2.replace(/\n/g, '\r\n'));

// 2. Put the `</> )}` where the feed ACTUALLY ends (before Right Sidebar (Chat Panel))
const feedActualEnd = `          </div>
        </div>
        </div>

        {/* Right Sidebar (Chat Panel) */}`;
const fixActualEnd = `          </div>
        </div>
            </>
          )}
        </div>

        {/* Right Sidebar (Chat Panel) */}`;
// Wait, is it 3 `</div>`s?
// Let's look at lines 653-657 from output earlier:
//           </div>
//         </div>
//         </div>
// 
//         {/* Right Sidebar (Chat Panel) */}
//
// The third `</div>` closes the `<div className="flex-1">`!
// So the fragment `</> )}` should be BEFORE the third `</div>`!

const feedTarget = `          </div>
        </div>
        </div>

        {/* Right Sidebar (Chat Panel) */}`;
const feedFixed = `          </div>
        </div>
            </>
          )}
        </div>

        {/* Right Sidebar (Chat Panel) */}`;

file = file.split(feedTarget).join(feedFixed);
file = file.split(feedTarget.replace(/\n/g, '\r\n')).join(feedFixed.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed ternary placement exactly at the end of feed');
