import { getExplorePosts } from "@/app/actions/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export default async function ExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { posts } = await getExplorePosts();

  const generateSlug = (content: string, id: string) => {
    const text = content.slice(0, 50).replace(/[^a-zA-Z0-9\s]/g, "").trim().replace(/\s+/g, "-").toLowerCase();
    return `${text}-${id}`;
  };

  return (
    <div className="w-full max-w-[600px] mx-auto min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-[#E4E6EB]">Explore</h1>
        <p className="text-sm text-gray-500 dark:text-[#B0B3B8]">Temukan apa yang orang-orang cari.</p>
      </div>

      <div className="flex flex-col gap-4">
        {posts?.map((post: any) => {
          const slug = generateSlug(post.content, post.id);
          return (
            <div key={post.id} className="relative group">
              <PostCard post={post} currentUser={null} />
              {/* Overlay link for SEO and navigation */}
              <Link href={`/${locale}/explore/post/${slug}`} className="absolute inset-0 z-[50]" aria-label="View post details" />
            </div>
          );
        })}
        {(!posts || posts.length === 0) && (
          <div className="text-center text-gray-500 dark:text-[#B0B3B8] p-8">
            Belum ada postingan.
          </div>
        )}
      </div>
    </div>
  );
}
