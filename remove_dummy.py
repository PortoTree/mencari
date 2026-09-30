with open('c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '{/* Post 1 */}' in line:
        start_idx = i
    if '{(activeTab === "community") && (' in line and start_idx != -1:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    # Look backwards from end_idx to find the closing div of Post 2 (or just the closing </div> of the tab)
    # The div structure was:
    # </div>
    # )}
    # {(activeTab === "community") && (
    
    # Let's just find where `)}` is right before end_idx
    close_idx = end_idx - 1
    while close_idx > start_idx and ')}' not in lines[close_idx]:
        close_idx -= 1
        
    if ')}' in lines[close_idx]:
        # Wait, before `)}` there is a `</div>` which closes the tab content.
        # So we should replace from start_idx to close_idx - 1 (inclusive)
        
        # However, let's just do something simpler:
        # We want to replace from start_idx up to the line before `</div>` that precedes `)}`
        # But we can just replace the whole slice with:
        # <PostFeed currentUser={currentUser} />
        # </div>
        
        replacement = ['              <PostFeed currentUser={currentUser} />\n']
        
        # Wait, the `</div>` before `)}` might be at close_idx - 1
        # Let's preserve `</div>` and `)}`
        # The structure is:
        #               </div>
        #             )}
        # So we can replace lines[start_idx : close_idx - 1]
        
        del lines[start_idx : close_idx - 1]
        lines.insert(start_idx, '              <PostFeed currentUser={currentUser} />\n')
        
        with open('c:/mencari-online/apps/web/src/app/[locale]/home/page.tsx', 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print(f"Replaced lines {start_idx} to {close_idx-2}")
    else:
        print("Could not find )}")
else:
    print(f"Indices: start={start_idx}, end={end_idx}")
