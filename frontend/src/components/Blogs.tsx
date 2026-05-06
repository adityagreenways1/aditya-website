import React, { useEffect, useMemo, useState } from "react";
import { blogs } from "../data/blogs";
import { Link } from "react-router-dom";

// ✅ dynamic categories
const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

const Blogs: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Featured slider index
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featuredBlog =
    blogs.length > 0 ? blogs[featuredIndex % blogs.length] : undefined;

  // ✅ AUTO CHANGE EVERY 5 SECONDS
  useEffect(() => {
    if (blogs.length <= 1) return;

    const id = window.setInterval(() => {
      setFeaturedIndex((i) => (i + 1) % blogs.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, []);

  // ✅ NEXT
  const nextSlide = () => {
    setFeaturedIndex((prev) => (prev + 1) % blogs.length);
  };

  // ✅ PREVIOUS
  const prevSlide = () => {
    setFeaturedIndex((prev) =>
      prev === 0 ? blogs.length - 1 : prev - 1
    );
  };

  // ✅ FILTER BLOGS
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <section className="max-w-6xl mx-auto px-4 pt-2 pb-10 min-h-screen">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-4">

        <Link
          to="/"
          className="px-3 py-1 rounded-lg bg-[#46614b] text-white font-semibold hover:bg-[#3d5340] transition"
        >
          Home
        </Link>

        <span className="text-gray-400">›</span>

        <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-900 font-semibold">
          Blogs
        </span>
      </div>

      {/* HERO SLIDER */}
      {featuredBlog && (
        <div className="relative overflow-hidden rounded-2xl mb-10 bg-gray-200">

          <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96">

            {/* Background */}
            <img
              src={featuredBlog.image || "/img/placeholder.jpg"}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-top scale-110 blur-lg opacity-70 pointer-events-none select-none"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25 pointer-events-none" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent pointer-events-none" />

            {/* Main Image */}
            <img
              src={featuredBlog.image || "/img/placeholder.jpg"}
              alt={featuredBlog.title}
              onError={(e) =>
                (e.currentTarget.src = "/img/placeholder.jpg")
              }
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-end">

            <div className="w-full p-5 sm:p-8">

              {/* ❌ SOLAR GUIDE REMOVED */}

              <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-3xl">
                {featuredBlog.title}
              </h1>

              {/* Bottom Actions */}
              <div className="mt-4 flex items-center justify-between">

                {/* Read Button */}
                <Link
                  to={`/blog/${featuredBlog.slug}`}
                  className="inline-flex items-center justify-center bg-yellow-500 text-black px-5 py-2.5 rounded-lg font-semibold hover:bg-yellow-400 transition"
                >
                  Read Article
                </Link>

                {/* RIGHT SIDE ROUND GREEN ARROWS */}
                <div className="flex items-center gap-3">

                  {/* Previous */}
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full bg-[#46614b] text-white text-2xl font-bold hover:bg-[#3d5340] transition flex items-center justify-center shadow-lg"
                  >
                    ←
                  </button>

                  {/* Next */}
                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full bg-[#46614b] text-white text-2xl font-bold hover:bg-[#3d5340] transition flex items-center justify-center shadow-lg"
                  >
                    →
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Sidebar */}
        <aside className="lg:col-span-3">

          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-28">

            {/* Search */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search
              </label>

              <input
                type="text"
                placeholder="Search an article"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46614b]"
              />
            </div>

            {/* Categories */}
            <div>

              <div className="text-sm font-semibold text-gray-800 mb-3">
                Browse by Category
              </div>

              <div className="space-y-1">

                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;

                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={
                        "w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition " +
                        (isActive
                          ? "bg-[#46614b] text-white"
                          : "text-gray-800 bg-gray-50 hover:bg-gray-100")
                      }
                    >
                      {cat}
                    </button>
                  );
                })}

              </div>
            </div>
          </div>
        </aside>

        {/* Blog Grid */}
        <div className="lg:col-span-9">

          <div className="flex items-end justify-between mb-5">

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                All blogs
              </h2>

              <div className="w-14 h-1 bg-yellow-500 mt-3 rounded-full" />
            </div>
          </div>

          {/* No Results */}
          {filteredBlogs.length === 0 ? (
            <div className="text-center text-gray-500 py-20 bg-white rounded-xl border border-gray-200">

              <p>No blogs found.</p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-[#46614b] text-white font-semibold hover:bg-[#3d5340] transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  to={`/blog/${blog.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
                >

                  {/* Image */}
                  <div className="h-40 w-full bg-gray-200 overflow-hidden">

                    <img
                      src={blog.image || "/img/placeholder.jpg"}
                      alt={blog.title}
                      onError={(e) =>
                        (e.currentTarget.src = "/img/placeholder.jpg")
                      }
                      className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">

                    <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                      {blog.category}
                    </div>

                    <h3 className="mt-3 text-lg font-semibold text-gray-900 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {blog.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">

                      <span className="text-sm font-semibold text-[#46614b]">
                        Read More
                      </span>

                      <span className="text-sm text-gray-400 group-hover:text-gray-500 transition">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;