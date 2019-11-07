import React, { useState } from 'react';
import { connect } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';

const Blog = (props) => {
  const { blog, isPostedByUser } = props;
  const [blogExpanded, setBlogExpanded] = useState(false);

  const handleRemoveBlogClick = async event => {
    event.preventDefault();
    if(window.confirm(`Are you sure you wish to delete "${blog.title}"?`)) {
      const success = await props.removeBlog(blog.id);
      if(!success) console.log('deleting failed');
    }
  };

  const handleLikeBlog = async () => {
    await props.likeBlog(blog.id);
  };

  return (
    <div>
      <div className={'blog' + (blogExpanded ? ' expanded' : '') }>
        <a
          href={blog.url}>
          {blog.title}
        </a>
        <div className="blog-actions">
          <button className="button button--expand"
            onClick={() => setBlogExpanded(!blogExpanded)}>
            { blogExpanded ? '-' : '+' }
          </button>
          <button
            onClick={handleLikeBlog}>+1</button>
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

export default connect(null, { likeBlog, removeBlog })(Blog);
