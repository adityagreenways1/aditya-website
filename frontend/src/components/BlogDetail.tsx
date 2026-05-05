import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogs } from "../data/blogs";

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const goBackToBlogs = () => {
    navigate({ pathname: "/", hash: "#blogs" });
  };

  const blog = blogs.find((b) => b.slug === slug);

  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!blog) return;

    setLoading(true);
    setError(false);

    // ✅ Use htmlFile instead of manual path
    fetch(blog.htmlFile)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load blog");
        return res.text();
      })
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // ❌ remove unwanted parts
        doc.querySelector("header")?.remove();
        doc.querySelector("footer")?.remove();

        // ✅ extract styles
        let styles = "";
        doc.querySelectorAll("style").forEach((style) => {
          styles += style.outerHTML;
        });

        const body = doc.body.innerHTML;

        setContent(styles + body);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, [blog]);

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
    <section className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <button
        className="mb-6 text-[#46614b] underline"
        onClick={goBackToBlogs}
      >
        ← Back to Blogs
      </button>

      <h1 className="text-3xl font-bold mb-4 text-[#46614b]">
        {blog.title}
      </h1>

      <span className="inline-block mb-4 text-xs text-gray-500">
        {blog.category}
      </span>

      <div className="w-full min-h-[60vh] bg-gray-100 rounded-xl overflow-hidden relative">
        
        {/* 🔄 Loading */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <span className="text-gray-500">Loading...</span>
          </div>
        )}

        {/* ❌ Error */}
        {error && (
          <div className="text-center text-red-500 py-10">
            Failed to load blog content.
          </div>
        )}

        {/* ✅ Blog Content */}
        {!loading && !error && (
          <div
            style={{ minHeight: "100vh" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </section>
  );
};

export default BlogDetail;