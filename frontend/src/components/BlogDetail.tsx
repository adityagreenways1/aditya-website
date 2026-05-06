import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogs } from "../data/blogs";

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const goBackToBlogs = () => {
    navigate("/blogs");
  };

  const blog = blogs.find((b) => b.slug === slug);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [iframeHeight, setIframeHeight] = useState<number>(900);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!blog) return;

    setLoading(true);
    setError(false);
    setIframeHeight(900);

    window.scrollTo(0, 0);
  }, [blog]);

  // ✅ Auto iframe height
  const updateIframeHeight = () => {
    try {
      const iframe = iframeRef.current;
      const doc = iframe?.contentDocument;

      if (!doc) return;

      const nextHeight =
        doc.documentElement?.scrollHeight || doc.body?.scrollHeight;

      if (typeof nextHeight === "number" && nextHeight > 0) {
        setIframeHeight(nextHeight);
      }
    } catch {
      // Ignore iframe access issues
    }
  };

  // ✅ iframe load
  const handleIframeLoad = () => {
    setLoading(false);
    setError(false);

    updateIframeHeight();

    setTimeout(updateIframeHeight, 250);
    setTimeout(updateIframeHeight, 1200);
  };

  // ❌ Blog not found
  if (!blog) {
    return (
      <div className="py-20 text-center text-2xl">
        Blog not found.

        <button
          className="block mt-4 text-[#46614b] underline"
          onClick={goBackToBlogs}
        >
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return (
    // ✅ EXTRA TOP SPACE REMOVED
    <section className="max-w-4xl mx-auto px-4 pt-0 pb-10 min-h-screen">

      {/* Top Bar */}
      <div className="z-20 -mx-4 px-2 sm:px-4 py-1 bg-white/90 backdrop-blur border-b border-gray-200 mb-2">

        <div className="flex items-center gap-3">

          {/* Back Button */}
          <button
            type="button"
            onClick={goBackToBlogs}
            className="px-4 py-2 rounded-lg bg-[#46614b] text-white font-semibold hover:bg-[#3d5340] transition"
          >
            ← Back to Blogs
          </button>

          {/* Category */}
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            {blog.category}
          </span>

        </div>
      </div>

      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-4 text-[#46614b]">
        {blog.title}
      </h1>

      {/* Blog Content */}
      <div className="w-full min-h-[60vh] bg-gray-100 rounded-xl overflow-hidden relative">

        {/* Loading */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <span className="text-gray-500">Loading...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 py-10">
            Failed to load blog content.
          </div>
        )}

        {/* iframe */}
        {!error && (
          <iframe
            ref={iframeRef}
            title={blog.title}
            src={blog.htmlFile}
            onLoad={handleIframeLoad}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
            className="w-full border-0"
            style={{ height: iframeHeight }}
          />
        )}

      </div>
    </section>
  );
};

export default BlogDetail;