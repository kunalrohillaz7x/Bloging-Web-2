import axios from "axios";

// 👇 This is where your friend's backend is running
const API = axios.create({
  baseURL: "http://localhost:8000",
});

// ---- AUTH (signup & login) ----

export const signup = (username, email, password) => {
  return API.post("/signup", { username, email, password });
};

export const login = (username, password) => {
  // Backend uses OAuth2 form format, not JSON
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);
  return API.post("/login", formData);
};

// ---- BLOG POSTS ----

export const fetchPosts = () => {
  return API.get("/posts/");
};

export const createPost = (title, content, imageFile, token) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (imageFile) {
    formData.append("image", imageFile);
  }
  return API.post("/posts/", formData, {
    headers: {
      Authorization: `Bearer ${token}`,  // 👈 proves the user is logged in
    },
  });
};

export default API;
