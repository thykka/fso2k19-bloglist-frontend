import React, { useState } from 'react';

const Blog = ({ blog, isPostedByUser, handleLikeBlog, handleRemoveBlog }) => {
  const [blogExpanded, setBlogExpanded] = useState(false);

  const handleRemoveBlogClick = event => {
    event.preventDefault();
    if(window.confirm(`Are you sure you wish to delete "${blog.title}"?`)) {
      handleRemoveBlog(blog.id);
    }
  };

  return (
    <div>
      <div className={'blog' + (blogExpanded ? ' expanded' : '') }>
        <a
          href={blog.url}>
          {blog.title}
        </a>
        <div className="blog-actions">
          <button
            onClick={() => setBlogExpanded(!blogExpanded)}>
            { blogExpanded ? '-' : '+' }
          </button>
          <button
            onClick={event => handleLikeBlog(event, blog.id)}>+1</button>
          <button
            onClick={handleRemoveBlogClick}
            disabled={!isPostedByUser}>X</button>
        </div>
      </div>
      <div className="blog-details" style={{ display: !blogExpanded ? 'none' : '' }}>
        <p>Author: {blog.author}</p>
        <p>Posted by: {blog.user.name}</p>
        <p>Likes: {blog.likes}</p>
      </div>
    </div>
  );
};

export default Blog;
