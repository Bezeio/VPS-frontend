import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { blogList } from '../../../variables/blog';
import '../../../assets/css/blog.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    let blog = blogList.find((blog) => blog.id === parseInt(id));
    if (blog) {
      setBlog(blog);
    }
  }, []);

  useEffect(()=>{
    fetchData()
  })
  const fetchData = async() =>{
    try {
      const response = await axios.get("https://localhost:7050/api/Blog/18");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Link className='blog-goBack' to='/'>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
        <div className='blog-wrap'>
          <header>
            <p className='blog-date'>Published {data.createdAt}</p>
            <h1>{data.title}</h1>
           
          </header>
          <img src={data.cover} alt='cover' />
          <p className='blog-desc'>{data.description}</p>
        </div>
    </>
  );
};

export default BlogDetail;
