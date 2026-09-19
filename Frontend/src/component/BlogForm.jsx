import React, { useState } from "react";

const BlogForm = ({Blog,setBlog}) => {

  

  return (
    <section id="write" className="py-20">
      <div className="max-w-3xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Write Your Blog
          </h2>
          <p className="text-neutral-400 text-lg">
            Share your thoughts, ideas, and stories with the world.
          </p>
        </div>

        <form onSubmit={(e)=>{
          e.preventDefault();
          
            setBlog([...Blog, {image: e.target[0].value,
            title: e.target[1].value,
            content: e.target[2].value}]
          );
            

          
        }} className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 md:p-10 space-y-8">

          <div>
            <label htmlFor="blog-image" className="block text-sm font-semibold text-neutral-300 mb-3">
              Cover Image URL
            </label>
            <div className="relative">
              <input
                type="text"
                id="blog-image"
                placeholder="Paste your image URL here... (e.g. https://example.com/photo.jpg)"
                className="w-full bg-neutral-800/60 border border-neutral-700 rounded-xl px-5 py-4 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 transition-all duration-200"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="blog-title" className="block text-sm font-semibold text-neutral-300 mb-3">
              Blog Title
            </label>
            <input
              type="text"
              id="blog-title"
              placeholder="Give your blog an awesome title..."
              className="w-full bg-neutral-800/60 border border-neutral-700 rounded-xl px-5 py-4 text-white placeholder-neutral-500 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="blog-content" className="block text-sm font-semibold text-neutral-300 mb-3">
              Blog Content
            </label>
            <textarea
              id="blog-content"
              rows="8"
              placeholder={"Start writing your blog content here...\n\nYou can write multiple paragraphs.\nMake it interesting!"}
              className="w-full bg-neutral-800/60 border border-neutral-700 rounded-xl px-5 py-4 text-white placeholder-neutral-500 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 transition-all duration-200"
            ></textarea>
            <p className="text-xs text-neutral-600 mt-2">
              Tip: Write at least 100 words for a great blog post!
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-400 text-white py-4 rounded-xl text-lg font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Publish Blog
          </button>

          
        </form>
      </div>
    </section>
  );
};

export default BlogForm;
