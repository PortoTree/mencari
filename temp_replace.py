import re
import sys

file_path = 'c:/mencari-online/apps/web/src/components/CreatePostModal.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add initialPost to interface
content = re.sub(
    r'interface CreatePostModalProps \{([\s\S]*?)\}',
    r'interface CreatePostModalProps {\g<1>  initialPost?: any;\n}',
    content
)

# Add initialPost to destructured props
content = re.sub(
    r'export default function CreatePostModal\(\{ isOpen, onClose, currentUser, onSuccess \}: CreatePostModalProps\) \{',
    r'export default function CreatePostModal({ isOpen, onClose, currentUser, onSuccess, initialPost }: CreatePostModalProps) {',
    content
)

# Update state initialization
content = re.sub(
    r"const \[postPrivacy, setPostPrivacy\] = useState<'PUBLIC' \| 'FRIENDS' \| 'PRIVATE' \| 'COMMUNITY_ONLY'>\('PUBLIC'\);",
    r"const [postPrivacy, setPostPrivacy] = useState<'PUBLIC' | 'FRIENDS' | 'PRIVATE' | 'COMMUNITY_ONLY'>(initialPost?.visibility || 'PUBLIC');",
    content
)
content = re.sub(
    r'const \[postContent, setPostContent\] = useState\(""\);',
    r'const [postContent, setPostContent] = useState(initialPost?.content || "");',
    content
)

# Add useEffect for initialPost
use_effect_code = '''
  useEffect(() => {
    if (isOpen) {
      setPostContent(initialPost?.content || "");
      setPostPrivacy(initialPost?.visibility || "PUBLIC");
    }
  }, [isOpen, initialPost]);

  // Close dropdown on outside click
'''
content = content.replace('  // Close dropdown on outside click', use_effect_code)


# Update imports to include updatePost
content = re.sub(
    r'import \{ createPost \} from "@/app/actions/posts";',
    r'import { createPost, updatePost } from "@/app/actions/posts";',
    content
)

# Update handlePost
handle_post_old = """    try {
      const res = await createPost({
        authorId: currentUser.id,
        content: postContent,
        visibility: postPrivacy,
      });

      if (res.success) {"""

handle_post_new = """    try {
      let res;
      if (initialPost) {
        res = await updatePost(initialPost.id, currentUser.id, postContent, postPrivacy);
      } else {
        res = await createPost({
          authorId: currentUser.id,
          content: postContent,
          visibility: postPrivacy,
        });
      }

      if (res.success) {"""

content = content.replace(handle_post_old, handle_post_new)

# Update title and button
content = content.replace('Create post', '{initialPost ? "Edit post" : "Create post"}')
content = content.replace('{isPosting ? "Posting..." : "Post"}', '{isPosting ? (initialPost ? "Menyimpan..." : "Posting...") : (initialPost ? "Simpan" : "Post")}')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated CreatePostModal.tsx')
