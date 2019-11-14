import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = props => {
  const { blogs } = props;

  return (
    <section className="bloglist">
      <h2>Blogs</h2>
      <ul>
        {
          blogs.map(blog => {
            return (
              <li key={ blog.id }>
                <Link to={ '/blog/' + blog.id }>{blog.title}</Link>
              </li>
            );
          })
        }
      </ul>
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
