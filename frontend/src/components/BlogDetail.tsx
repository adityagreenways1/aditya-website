import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { blogs } from "../data/blogs";

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const goBackToBlogs = () => {
    navigate("/blogs");
  };

  const blog = blogs.find((b) => b.slug === slug);

  // Split "Main Title: Accent Part" so the part after the colon renders as the italic amber accent
  const [titleMain, titleAccent] = blog
    ? (() => {
        const idx = blog.title.indexOf(":");
        return idx === -1
          ? [blog.title, ""]
          : [blog.title.slice(0, idx + 1), blog.title.slice(idx + 1).trim()];
      })()
    : ["", ""];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [iframeHeight, setIframeHeight] = useState<number>(900);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // ✅ For heroStyle "new" blogs: fetch the blog's static HTML and inject it
  // directly into this page (same approach the reference site uses) instead
  // of loading it in an iframe. Because the content becomes part of the same
  // document, native CSS position:sticky and #anchor links just work — no
  // iframe boundary to bridge.
  const [injectedHtml, setInjectedHtml] = useState("");
  const [injectLoading, setInjectLoading] = useState(true);
  const [injectError, setInjectError] = useState(false);
  const injectedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!blog) return;

    setLoading(true);
    setError(false);
    setIframeHeight(900);

    window.scrollTo(0, 0);
  }, [blog]);

  useEffect(() => {
    if (!blog || blog.heroStyle !== "new") return;

    setInjectLoading(true);
    setInjectError(false);

    fetch(blog.htmlFile)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return res.text();
      })
      .then((raw) => {
        const parsed = new DOMParser().parseFromString(raw, "text/html");
        const styles = Array.from(parsed.querySelectorAll("style"))
          .map((s) => s.outerHTML)
          .join("\n");
        setInjectedHtml(`${styles}${parsed.body.innerHTML}`);
      })
      .catch(() => setInjectError(true))
      .finally(() => setInjectLoading(false));
  }, [blog]);

  // Inline <script> tags don't execute when injected via dangerouslySetInnerHTML,
  // so wire up the CTA button by hand once the content is in the DOM.
  useEffect(() => {
    const container = injectedRef.current;
    if (!container || !injectedHtml) return;

    const btn = container.querySelector<HTMLAnchorElement>("#cta-get-quote");
    if (!btn) return;

    const handleClick = (e: Event) => {
      e.preventDefault();
      // Reuses App.tsx's existing NAVIGATE_TO_QUOTE listener (originally built
      // for the iframe postMessage flow) — self-posting works the same way
      // now that this content is injected into the page directly.
      window.postMessage({ type: "NAVIGATE_TO_QUOTE" }, window.location.origin);
    };

    btn.addEventListener("click", handleClick);
    return () => btn.removeEventListener("click", handleClick);
  }, [injectedHtml]);

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

  const iframeEl = (
    <>
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
          className="w-full border-0 block"
          style={{ height: iframeHeight }}
        />
      )}
    </>
  );

  // ✅ New shared hero (breadcrumbs / badge / serif title) — opt-in per blog via heroStyle: "new"
  if (blog.heroStyle === "new") {
    return (
      <div className="min-h-screen bg-white">

        {/* Hero */}
        <div className="w-full bg-[#1a3c2e] pt-20 md:pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4">

            {/* Breadcrumbs */}
            <nav className="flex items-center flex-wrap gap-1.5 text-sm text-white/60 mb-5">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <span>›</span>
              <Link to="/blogs" className="hover:text-white transition">Blog</Link>
              <span>›</span>
              <span className="text-amber-300">{blog.category}</span>
            </nav>

            {/* Category badge */}
            <span className="inline-flex items-center gap-2 rounded-md border border-amber-300/40 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-amber-300 mb-6">
              🌿 {blog.category.toUpperCase()}
            </span>

            {/* Blog Title */}
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
              {titleMain}{" "}
              {titleAccent && (
                <span className="italic text-amber-300">{titleAccent}</span>
              )}
            </h1>

            {/* Description */}
            {blog.description && (
              <p className="mt-5 text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
                {blog.description}
              </p>
            )}

            {/* Byline */}
            {(blog.author || blog.date || blog.readTime) && (
              <div className="flex items-center flex-wrap gap-2 mt-6 text-sm text-white/40">
                {blog.author && <span>By {blog.author}</span>}
                {blog.author && (blog.date || blog.readTime) && <span>·</span>}
                {blog.date && <span>{blog.date}</span>}
                {blog.date && blog.readTime && <span>·</span>}
                {blog.readTime && <span>{blog.readTime}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Blog Content — injected directly into the page (no iframe), so its own
            CSS (position:sticky sidebar, #anchor links) works natively. */}
        <div className="w-full min-h-[60vh] bg-white relative">
          {injectLoading && (
            <div className="flex items-center justify-center py-20">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}
          {injectError && (
            <div className="text-center text-red-500 py-10">
              Failed to load blog content.
            </div>
          )}
          {!injectLoading && !injectError && (
            <div ref={injectedRef} dangerouslySetInnerHTML={{ __html: injectedHtml }} />
          )}
        </div>
      </div>
    );
  }

  // ✅ Legacy layout (blogs 1-4) — unchanged from the original design
  return (
    <section className="max-w-4xl mx-auto px-4 pt-24 pb-10 min-h-screen">

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
        {iframeEl}
      </div>
    </section>
  );
};

export default BlogDetail;