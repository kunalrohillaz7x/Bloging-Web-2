import React, { useState } from "react";
import { login, signup } from "../api";
import { useAuth } from "../context/AuthContext";

const AuthModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState("login"); // "login" or "signup"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveAuth } = useAuth();

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleTabSwitch = (newTab) => {
    setTab(newTab);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (tab === "signup") {
        // Step 1: Sign up
        await signup(username, email, password);
        // Step 2: Auto-login after signup
        const res = await login(username, password);
        saveAuth(res.data.access_token, res.data.user);
      } else {
        const res = await login(username, password);
        saveAuth(res.data.access_token, res.data.user);
      }
      resetForm();
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-2">
          <h2 className="text-2xl font-bold text-white mb-1">
            {tab === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-neutral-400 text-sm">
            {tab === "login"
              ? "Log in to publish your blogs"
              : "Sign up to start writing"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mx-8 mt-4 bg-neutral-800/60 rounded-lg p-1">
          <button
            onClick={() => handleTabSwitch("login")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer ${
              tab === "login"
                ? "bg-sky-500 text-white shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => handleTabSwitch("signup")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer ${
              tab === "signup"
                ? "bg-sky-500 text-white shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full bg-neutral-800/60 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 transition-all duration-200"
            />
          </div>

          {/* Email — only for signup */}
          {tab === "signup" && (
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-neutral-800/60 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 transition-all duration-200"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full bg-neutral-800/60 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 transition-all duration-200"
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {loading
              ? "Please wait..."
              : tab === "login"
                ? "Log In"
                : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
