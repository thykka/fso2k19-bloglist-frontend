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
      <div className="details" style={{ display: !blogExpanded ? 'none' : '' }}>
        Author: {blog.author}<br/>
        Posted by: {blog.user.name}<br/>
        Likes: {blog.likes}
      </div>
    </div>
  );
};

export default Blog;
