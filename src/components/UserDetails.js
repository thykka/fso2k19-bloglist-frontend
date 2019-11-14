import React from 'react';
import { connect } from 'react-redux';

const UserDetails = (props) => {
  if(typeof props.user === 'undefined') return null;

  const { user } = props;

  return (
    <div>
      <h3>Blogs submitted by { user.name } (@{ user.username })</h3>
      <ul>
        { user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  //users: state.users
});

export default connect(mapStateToProps, {})(UserDetails);
