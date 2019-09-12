import React from 'react';
import Blog from './Blog';

const BlogList = ({blogs}) => (
  <section className="bloglist">
    <h2>Blogs</h2>
    {
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    }
  </section>
);

export default BlogList;
