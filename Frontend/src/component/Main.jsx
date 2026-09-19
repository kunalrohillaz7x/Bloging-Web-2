import React, { useState } from 'react'
import HeroSection from './HeroSection'
import BlogForm from './BlogForm'
import BlogGrid from './BlogGrid'

const Main = () => {
  const [Blog, setBlog] = useState([]);
  return (
    <div>
        <HeroSection />
        <BlogForm Blog={Blog} setBlog={setBlog}/>
        <BlogGrid Blog={Blog} setBlog={setBlog}/>
    </div>
  )
}

export default Main