import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../../assets/css/blog.css'
const BlogItem = ({
  blog: {
    description,
    title,
    publishDate,
    authorName,
    authorAvatar,
    cover,
    category,
    id,
  },
}) => {
  return (
    <div className='blogItem-wrap'>
      <img className='blogItem-cover' src={cover} alt='cover' />
      <p className='chip'>{category}</p>
      <h3>{title}</h3>
      <p className='blogItem-desc'>{description}</p>
      <footer>
        <div className='blogItem-author'>
          <img src={authorAvatar} alt='avatar' />
          <div>
            <h6>{authorName}</h6>
            <p>{publishDate}</p>
          </div>
        </div>
        <Link className='blogItem-link' to={`/list-blogs/${id}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;
