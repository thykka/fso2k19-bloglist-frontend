import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <a
      href={blog.url}
      title={'Posted by ' + blog.user.name}>{blog.title}</a> - {blog.author}
  </div>
)

export default Blog
