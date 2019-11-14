import React from 'react';
import { connect } from 'react-redux';

const UserDetails = (props) => {
  if(typeof props.user === 'undefined') return null;

  const { user } = props;

  return (
    <section>
      <h3>Blogs submitted by { user.name } (@{ user.username })</h3>
      <ul>
        { user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </section>
  );
};

export default connect(null, {})(UserDetails);
