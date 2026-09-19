import React from "react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          <span className="text-white">Let Your Ideas </span>
          <span className="text-[#16b9e6]">
            Come Alive
          </span>
        </h1>

        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Write, share, and discover amazing stories. Your blog, your voice — 
          publish your thoughts to the world with a beautiful reading experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#write"
            className="bg-[#16b9e6] hover:bg-sky-400 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
          >
            Write a Blog
          </a>
          <a
            href="#blogs"
            className="text-neutral-300 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/50 transition-all duration-200"
          >
            Explore Blogs
          </a>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
