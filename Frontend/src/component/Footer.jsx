import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">
              BlogVerse
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-neutral-300 transition-colors duration-200">Home</a>
            <a href="#write" className="hover:text-neutral-300 transition-colors duration-200">Write</a>
            <a href="#blogs" className="hover:text-neutral-300 transition-colors duration-200">Explore</a>
            <a href="#" className="hover:text-neutral-300 transition-colors duration-200">About</a>
          </div>

          <p className="text-sm text-neutral-600">
            © 2026 BlogVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
