"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch semua postingan (Feed) pas halaman dibuka
  const fetchFeed = async () => {
    try {
      const res = await fetch("http://localhost:3001/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Gagal load feed", err);
    }
  };

  useEffect(() => {
    // Cek apakah user udah punya token (udah login)
    const token = localStorage.getItem("token");
    if (!token) {
      // Belum login? Lempar ke halaman /login
      router.push("/login");
    } else {
      fetchFeed();
    }
  }, [router]);

  // Fungsi buat bikin postingan baru
  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content: newPost, type: "NORMAL" }),
      });

      if (res.ok) {
        setNewPost("");
        fetchFeed(); // Refresh feed biar postingan baru muncul
      } else {
        alert("Gagal bikin postingan. Token lu mungkin kedaluwarsa, coba login ulang.");
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (err) {
      alert("Gagal terhubung ke API Backend.");
    }
    setLoading(false);
  };

  // Fungsi logout (hapus token dari browser)
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      {/* Navbar Simple */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Mencari.online</h1>
          <button onClick={handleLogout} className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto p-4 sm:p-8">
        {/* Form Bikin Status */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
          <form onSubmit={handlePost}>
            <textarea
              className="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
              rows={3}
              placeholder="Ada cerita apa hari ini bro?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? "Ngirim..." : "Posting"}
              </button>
            </div>
          </form>
        </div>

        {/* List Postingan (Feed) */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Belum ada postingan sama sekali. Jadilah yang pertama!</p>
          ) : (
            posts.map((post: any) => (
              <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                    {post.author?.profile?.displayName?.charAt(0).toUpperCase() || post.author?.username?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{post.author?.profile?.displayName || post.author?.username || 'User'}</h3>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString('id-ID')}</p>
                  </div>
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
