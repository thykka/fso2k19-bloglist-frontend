import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [blogExpanded, setBlogExpanded] = useState(false);

  return (
    <div className={'blog' + (blogExpanded ? ' expanded' : '') }>
      <button
        onClick={() => setBlogExpanded(!blogExpanded)}
        >
        { blogExpanded ? '-' : '+' }
      </button>
      <a
        href={blog.url}
        >
        {blog.title}
      </a>
      <div className="details" style={{display: !blogExpanded ? 'none' : ''}}>
        Author: {blog.author}<br/>
        Posted by: {blog.user.name}
      </div>
    </div>
  );
};

export default Blog
