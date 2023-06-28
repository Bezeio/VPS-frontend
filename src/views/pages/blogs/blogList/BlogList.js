import React from 'react';
import BlogItem from './blogItem/BlogItem';
import '../../../../assets/css/blog.css'

const BlogList = ({ blogs }) => {
  return (
    <div className='blogList-wrap'>
      {blogs.map((blog, item) => (
        <BlogItem key={item} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
