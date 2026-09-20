import React, { useState, useEffect } from 'react'
import {fetchPosts} from "../api"
import HeroSection from './HeroSection'
import BlogForm from './BlogForm'
import BlogGrid from './BlogGrid'

const Main = () => {
  const [Blog, setBlog] = useState([]);

  const loadBlog= async ()=>{
    const a= await fetchPosts();
    setBlog(a.data);
    
  }
  useEffect(() => { loadBlog(); }, []);
  return (
    <div>
        <HeroSection />
        <BlogForm onPub={loadBlog} />
        <BlogGrid Blog={Blog}/>
    </div>
  )
}

export default Main