import React from "react";

const BlogCard = ({ key, image, title,content }) => {
  return (
    <div className="group cursor-pointer bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1">

      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="text-white font-semibold text-lg leading-snug group-hover:text-sky-400 transition-colors duration-200 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-2 mt-3 text-sky-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Read more</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
