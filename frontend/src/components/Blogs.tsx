import React, { useMemo, useState } from "react";
import { blogs } from "../data/blogs";
import { Link } from "react-router-dom";

// ✅ dynamic categories
const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

const Blogs: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ optimized filtering
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
    <section className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      
      <div className="text-center mb-10">
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#46614b]">
      Blogs
     </h1>

      {/* Description */}
      <p className="mt-3 text-gray-600 text-lg max-w-xl mx-auto">
      Explore insights, guides, and updates about solar solutions and energy savings.
     </p>

       {/* Yellow underline */}
       <div className="w-16 h-1 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
      </div>
      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46614b]"
          />

          
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedCategory === cat
                  ? "bg-[#46614b] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ❌ No Results */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p>No blogs found.</p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="mt-4 text-[#46614b] underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* ✅ Blog Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.slug}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col hover:scale-[1.02]"
            >
              {/* Image */}
              <img
                src={blog.image || "/img/placeholder.jpg"}
                alt={blog.title}
                onError={(e) =>
                  (e.currentTarget.src = "/img/placeholder.jpg")
                }
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs text-gray-500 mb-2">
                  {blog.category}
                </span>

                <h3 className="text-lg font-semibold mb-2 text-[#46614b] line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.description}
                </p>

                {/* Read More */}
                <Link
                  to={`/blog/${blog.slug}`}
                  className="mt-auto bg-[#46614b] text-white px-4 py-2 rounded-lg hover:bg-[#3d5340] transition w-fit self-end text-base"
                >
                    Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blogs;