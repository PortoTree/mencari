import re

file_path = 'c:/mencari-online/apps/web/src/components/PostCard.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
if 'import { deletePost }' not in content:
    content = re.sub(
        r'import \{ useRouter \} from "next/navigation";',
        r'import { useRouter } from "next/navigation";\nimport { deletePost } from "@/app/actions/posts";\nimport CreatePostModal from "./CreatePostModal";',
        content
    )

# Add states for Edit modal and loading
if 'const [isEditModalOpen, setIsEditModalOpen] = useState(false);' not in content:
    content = re.sub(
        r'const \[activePostMenu, setActivePostMenu\] = useState<boolean>\(false\);',
        r'const [activePostMenu, setActivePostMenu] = useState<boolean>(false);\n  const [isEditModalOpen, setIsEditModalOpen] = useState(false);\n  const [isDeleting, setIsDeleting] = useState(false);',
        content
    )

# Add handleDelete function
handle_delete = '''
  const handleDelete = async () => {
    if (confirm(t("postMenu.confirmDelete") || "Apakah Anda yakin ingin menghapus postingan ini?")) {
      setIsDeleting(true);
      const res = await deletePost(post.id, currentUser.id);
      if (res.success) {
        window.dispatchEvent(new Event("refresh_feed"));
      } else {
        alert(res.error || "Failed to delete post");
      }
      setIsDeleting(false);
    }
  };
'''
if 'const handleDelete =' not in content:
    content = content.replace('  // Fallbacks', handle_delete + '\n  // Fallbacks')

# Update Dropdown Menu for Edit and Delete
# Currently there's "Hapus Postingan"
delete_btn = '''<button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Hapus Postingan
                  </button>'''

new_owner_actions = '''<button onClick={() => { setIsEditModalOpen(true); setActivePostMenu(false); }} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-black dark:text-[#E4E6EB] font-semibold text-[15px]">
                    <svg className="w-6 h-6 text-gray-600 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {t("postMenu.editPost") || "Edit Postingan"}
                  </button>
                  <button onClick={handleDelete} disabled={isDeleting} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {isDeleting ? "Menghapus..." : (t("postMenu.deletePost") || "Hapus Postingan")}
                  </button>'''

content = content.replace(delete_btn, new_owner_actions)

# Render CreatePostModal at the end of the component
if '<CreatePostModal' not in content:
    content = content.replace('    </div>\n  );\n}', '    </div>\n      <CreatePostModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} currentUser={currentUser} initialPost={post} />\n    </>\n  );\n}')
    content = content.replace('  return (\n    <div className="bg-white', '  return (\n    <>\n    <div className="bg-white')


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated PostCard.tsx')
