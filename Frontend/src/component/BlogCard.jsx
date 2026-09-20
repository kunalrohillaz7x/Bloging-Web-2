import React from "react";

const API_BASE = "http://localhost:8000";

const BlogCard = ({ image_url, title, content, author }) => {
  // Backend returns image_url like "/uploads/abc.jpg" — prepend the backend URL
  const imgSrc = image_url ? `${API_BASE}${image_url}` : null;

  return (
    <div className="group cursor-pointer bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1">

      <div className="relative overflow-hidden aspect-[16/10]">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-white font-semibold text-lg leading-snug group-hover:text-sky-400 transition-colors duration-200 line-clamp-2">
          {title}
        </h3>

        {author && (
          <p className="text-neutral-500 text-sm mt-2">
            by <span className="text-neutral-300">{author}</span>
          </p>
        )}

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

