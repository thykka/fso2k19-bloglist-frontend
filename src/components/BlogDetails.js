import React from 'react';
import { connect } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';

const BlogDetails = (props) => {
  if(typeof props.blog === 'undefined') return null;

  const { blog, currentUser } = props;

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

  const isPostedByUser = currentUser.username === blog.user.username;

  return (
    <section>
      <h3>{ blog.title }</h3>
      <p>Author: {blog.author}</p>
      <p>Posted by: {blog.user.name}</p>
      <p>Likes: {blog.likes} </p>
      <div className="blog-controls">
        <button onClick={ handleLikeBlog }>Updoot</button>
        <button
          onClick={ handleRemoveBlogClick }
          disabled={ !isPostedByUser }>Baleet</button>
      </div>
      <ul className="blog-comments">
        { blog.comments.map(comment =>
          <li key={comment.id}>{comment.message}</li>
        ) }
      </ul>
    </section>
  );
};

export default connect(null, { likeBlog, removeBlog })(BlogDetails);
