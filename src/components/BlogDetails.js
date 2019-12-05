import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks/index';
import { likeBlog, removeBlog, newComment } from '../reducers/blogsReducer';
import { flashNotification } from '../reducers/notificationReducer';

const BlogDetails = (props) => {
  const newCommentText = useField('text');

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

  const handleNewCommentSubmit = async event => {
    event.preventDefault();

    const success = await props.newComment({
      message: newCommentText.props.value,
      blog: blog.id
    });

    if(success) {
      newCommentText.reset();
    } else {
      props.flashNotification(`Failed to add comment "${ newCommentText.props.value }"`);
    }
  };

  const isPostedByUser = currentUser && currentUser.username === blog.user.username;

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
      <form onSubmit={handleNewCommentSubmit}>
        <label>
          New comment:
          <input {...newCommentText.props} name="newComment" />
        </label>
        <button type="submit">Add</button>
      </form>
    </section>
  );
};

export default connect(null, { likeBlog, removeBlog, newComment, flashNotification })(BlogDetails);
