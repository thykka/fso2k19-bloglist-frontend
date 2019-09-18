import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, userName, handleLikeBlog, handleRemoveBlog }) => {
  return (
    <section className="bloglist">
      <h2>Blogs {userName}</h2>
      {
        blogs.map(blog => {
          return (
            <Blog
              key={blog.id}
              blog={blog}
              isPostedByUser={userName === blog.user.username}
              handleLikeBlog={handleLikeBlog}
              handleRemoveBlog={handleRemoveBlog} />
          );
        })
      }
    </section>
  );
};

export default BlogList;
