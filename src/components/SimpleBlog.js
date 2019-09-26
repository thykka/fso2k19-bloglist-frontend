import React from 'react';

const SimpleBlog = ({ blog, onClick }) => {
  return (
    <div className="simpleblog">
      <h3 className="simpleblog-title">{ blog.author }: { blog.title }</h3>
      <div className="simpleblog-likes">
        Blog has { blog.likes } likes.
        <button onClick={onClick}>like</button>
      </div>
    </div>
  );
};

export default SimpleBlog;
