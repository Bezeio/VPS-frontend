import React, { useEffect, useState } from 'react';
import BlogList from './blogList/BlogList';
import SearchBar from './blogList/SearchBar';
import { blogList } from '../../../variables/blog';
import '../../../assets/css/blog.css'
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState(blogList);
  const [searchKey, setSearchKey] = useState('');
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetchData()
  })
  const fetchData = async() =>{
    try {
      const response = await axios.get("https://localhost:7050/api/Blog/list");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const allBlogs = blogList;
    const filteredBlogs = allBlogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setBlogs(blogList);
    setSearchKey('');
  };

  return (
    <div className='ml-8 mr-8'>
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />
      <BlogList blogs={data} />
    </div>
  );
};

export default Blogs;
