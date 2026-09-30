import re

file_path = 'c:/mencari-online/apps/web/src/components/PostCard.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add isDeleteModalOpen state
if 'const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);' not in content:
    content = re.sub(
        r'const \[isDeleting, setIsDeleting\] = useState\(false\);',
        r'const [isDeleting, setIsDeleting] = useState(false);\n  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);',
        content
    )

# Update handleDelete to remove the confirm()
handle_delete_old = '''  const handleDelete = async () => {
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
  };'''

handle_delete_new = '''  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deletePost(post.id, currentUser.id);
    if (res.success) {
      window.dispatchEvent(new Event("refresh_feed"));
    } else {
      alert(res.error || "Failed to delete post");
    }
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
  };'''

content = content.replace(handle_delete_old, handle_delete_new)

# Update the delete button in the dropdown to open the modal instead of calling handleDelete directly
old_delete_btn = '''<button onClick={handleDelete} disabled={isDeleting} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">'''
new_delete_btn = '''<button onClick={() => { setIsDeleteModalOpen(true); setActivePostMenu(false); }} disabled={isDeleting} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors text-left text-red-500 font-semibold text-[15px]">'''
content = content.replace(old_delete_btn, new_delete_btn)

# Add Delete Modal JSX at the end of the file, just before CreatePostModal
delete_modal_jsx = '''
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 dark:bg-black/70 px-4">
          <div className="w-full max-w-[400px] bg-white dark:bg-[#242526] rounded-xl shadow-xl flex flex-col relative border border-gray-200 dark:border-[#3E4042] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#3E4042]">
              <h2 className="text-[20px] font-bold text-black dark:text-[#E4E6EB]">
                {t("postMenu.deletePost") || "Hapus Postingan"}
              </h2>
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-9 h-9 bg-gray-200 dark:bg-[#3A3B3C] rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-[#4E4F50] transition-colors text-gray-600 dark:text-[#B0B3B8]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-4">
              <p className="text-[15px] text-gray-600 dark:text-[#B0B3B8] mb-6">
                {t("postMenu.confirmDelete") || "Apakah Anda yakin ingin menghapus postingan ini?"}
              </p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="px-5 py-2 rounded-lg font-semibold text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
                  Batal
                </button>
                <button onClick={handleDelete} disabled={isDeleting} className="px-5 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center gap-2">
                  {isDeleting ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
'''

if 'isDeleteModalOpen &&' not in content:
    content = content.replace('<CreatePostModal', delete_modal_jsx + '      <CreatePostModal')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated PostCard.tsx with custom Delete Modal')
