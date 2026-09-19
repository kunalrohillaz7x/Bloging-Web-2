import React from "react";
import BlogCard from "./BlogCard";

import sample1 from "../assets/sample1.jpg";
import sample2 from "../assets/sample2.jpg";
import sample3 from "../assets/sample3.jpg";
import sample4 from "../assets/sample4.jpg";



const sampleBlogs = [];

const BlogGrid = ({Blog,setBlog}) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {Blog.map((e,idx) => (
            <BlogCard
              key={idx}
              image={e.image}
              title={e.title}
              content={e.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
