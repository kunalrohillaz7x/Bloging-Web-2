import React from "react";
import BlogCard from "./BlogCard";

const BlogGrid = ({ Blog }) => {
  return (
    <section id="blogs" className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore Blogs
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Discover amazing stories and ideas from writers around the world.
          </p>
        </div>

        {Blog.length === 0 ? (
          <p className="text-center text-neutral-500 text-lg py-12">
            No blogs yet. Be the first to write one! ✍️
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Blog.map((e) => (
              <BlogCard
                key={e.id}
                image_url={e.image_url}
                title={e.title}
                content={e.content}
                author={e.author}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;

