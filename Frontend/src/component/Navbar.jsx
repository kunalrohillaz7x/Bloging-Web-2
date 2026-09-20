import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/80 border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#16b9e6] rounded-lg flex items-center justify-center group-hover:bg-sky-400 transition-colors duration-200">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">
              BlogVerse
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-neutral-400 hover:text-white text-sm font-medium transition-colors duration-200">
              Home
            </a>
            <a href="#blogs" className="text-neutral-400 hover:text-white text-sm font-medium transition-colors duration-200">
              Explore
            </a>
            <a href="#write" className="text-neutral-400 hover:text-white text-sm font-medium transition-colors duration-200">
              Write
            </a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-neutral-300 text-sm font-medium hidden sm:inline">
                  Hi, {user.username}
                </span>
                <button
                  onClick={logout}
                  className="text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="bg-[#16b9e6] hover:bg-sky-400 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default Navbar;

