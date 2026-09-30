import sys

file_path = 'c:/mencari-online/apps/web/src/app/actions/posts.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_actions = """
export async function deletePost(postId: string, authorId: string) {
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.authorId !== authorId) {
      return { success: false, error: "Unauthorized or not found" };
    }
    await prisma.post.delete({ where: { id: postId } });
    
    revalidateTag("feed_posts");
    revalidateTag(`profile_posts_${authorId}`);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePost(postId: string, authorId: string, content: string, visibility: "PUBLIC" | "FRIENDS" | "PRIVATE" | "COMMUNITY_ONLY") {
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.authorId !== authorId) {
      return { success: false, error: "Unauthorized or not found" };
    }
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { content, visibility },
    });
    
    revalidateTag("feed_posts");
    revalidateTag(`profile_posts_${authorId}`);
    
    return { success: true, post: updatedPost };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
"""

if 'export async function deletePost' not in content:
    with open(file_path, 'a', encoding='utf-8') as f:
        f.write('\n' + new_actions)
    print('Added deletePost and updatePost')
else:
    print('Already exists')
