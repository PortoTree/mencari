import { getPostById } from "@/app/actions/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const id = slug.slice(-36); // UUID length
  const { post } = await getPostById(id);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  const excerpt = post.content.slice(0, 150) + (post.content.length > 150 ? "..." : "");
  
  return {
    title: `${excerpt} - nethubz.com`,
    description: excerpt,
    openGraph: {
      title: `${excerpt} - nethubz.com`,
      description: excerpt,
      type: "article",
    },
  };
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  const id = slug.slice(-36);
  const { post } = await getPostById(id);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F0F2F5] dark:bg-[#18191A]">
        <div className="text-center text-gray-500 dark:text-[#B0B3B8]">
          <h2 className="text-2xl font-bold mb-2">Postingan tidak ditemukan</h2>
          <p>Mungkin sudah dihapus atau privasinya diubah.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[600px] mx-auto min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] p-4 flex flex-col items-center justify-center">
      <div className="w-full relative group">
        <PostCard post={post} currentUser={null} />
        {/* Overlay block for unauthenticated users, redirects to login */}
        <Link 
          href={`/${locale}/login?redirect=${encodeURIComponent(`/${locale}/explore/post/${slug}`)}`}
          className="absolute inset-0 z-[50]" 
          aria-label="Login to interact"
        />
      </div>
    </div>
  );
}
