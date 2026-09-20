import React, { useState, useRef } from "react";
import { createPost } from "../api";
import { useAuth } from "../context/AuthContext";

const BlogForm = ({ onPub }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
    }
  };

  const { token, user } = useAuth();

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please log in first to publish a blog!");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("Please fill in both the title and content.");
      return;
    }

    setSubmitting(true);
    const file = fileInputRef.current?.files?.[0] || null;

    try {
      await createPost(title, content, file, token);
      // Reset form
      setTitle("");
      setContent("");
      removeImage();
      if (onPub) onPub();  // Tell Main.jsx to reload blogs from backend
      alert("🎉 Blog published successfully!");
    } catch (err) {
      const detail = err.response?.data?.detail;
      let errorMsg = "Failed to publish.";
      if (Array.isArray(detail)) {
        errorMsg = detail.map((d) => d.msg || JSON.stringify(d)).join(", ");
      } else if (typeof detail === "string") {
        errorMsg = detail;
      } else if (detail) {
        errorMsg = JSON.stringify(detail);
      }
      alert(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 md:p-10 space-y-8">

          {/* Custom Image Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-neutral-300 mb-3">
              Cover Image
            </label>

            {/* Hidden file input */}
            <input
              type="file"
              id="blog-image"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                handleFile(file);
              }}
            />

            {imagePreview ? (
              /* Image Preview */
              <div className="relative group rounded-xl overflow-hidden border border-neutral-700 bg-neutral-800/60">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="bg-neutral-800/90 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 backdrop-blur-sm border border-neutral-600"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 backdrop-blur-sm"
                  >
                    Remove
                  </button>
                </div>
                {/* Small indicator */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-neutral-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Image ready
                </div>
              </div>
            ) : (
              /* Drop Zone */
              <div
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                  cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 p-10 flex flex-col items-center justify-center gap-4
                  ${isDragging
                    ? "border-sky-500 bg-sky-500/10"
                    : "border-neutral-700 bg-neutral-800/40 hover:border-neutral-500 hover:bg-neutral-800/60"
                  }
                `}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${isDragging ? "bg-sky-500/20" : "bg-neutral-700/50"}`}>
                  <svg className={`w-7 h-7 transition-colors duration-300 ${isDragging ? "text-sky-400" : "text-neutral-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className={`text-sm font-medium transition-colors duration-300 ${isDragging ? "text-sky-400" : "text-neutral-300"}`}>
                    {isDragging ? "Drop your image here" : "Drag & drop your image here"}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1.5">
                    or <span className="text-sky-400 hover:text-sky-300">browse from device</span> · JPG, PNG, GIF, WebP
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="blog-title" className="block text-sm font-semibold text-neutral-300 mb-3">
              Blog Title
            </label>
            <input
              type="text"
              id="blog-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your blog an awesome title..."
              required
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"Start writing your blog content here...\n\nYou can write multiple paragraphs.\nMake it interesting!"}
              required
              className="w-full bg-neutral-800/60 border border-neutral-700 rounded-xl px-5 py-4 text-white placeholder-neutral-500 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 transition-all duration-200"
            ></textarea>
            <p className="text-xs text-neutral-600 mt-2">
              Tip: Write at least 100 words for a great blog post!
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/50 disabled:cursor-not-allowed text-white py-4 rounded-xl text-lg font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {submitting ? "Publishing..." : "Publish Blog"}
          </button>

        </form>
      </div>
    </section>
  );
};

export default BlogForm;
