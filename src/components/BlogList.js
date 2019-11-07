import React from 'react';
import { connect } from 'react-redux';
import Blog from './Blog';

const BlogList = props => {
  const { blogs } = props;
  const { username } = props;

  return (
    <section className="bloglist">
      <h2>Blogs</h2>
      {
        blogs.map(blog => {
          return (
            <Blog
              className="bloglist"
              key={blog.id}
              blog={blog}
              isPostedByUser={username === blog.user.username}
            />
          );
        })
      }
    </section>
  );
};

const sortBlogs = (key, desc) => {
  return (blogA, blogB) => {
    if(desc) return blogB[key] - blogA[key];
    return blogA[key] - blogB[key];
  };
};
const sortByLikes = sortBlogs('likes', true);

const mapStateToProps = state => {
  return {
    blogs: state.blogs.sort(sortByLikes)
  };
};

export default connect(mapStateToProps, {})(BlogList);
