import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { flashNotification } from '../reducers/notificationReducer';

const NewBlogForm = (props) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const {
    username,
    toggleRef
  } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await props.createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    });
    if(result && result.id) {
      // success
      props.flashNotification('Blog added!', { duration: 3, level: 'info' });
      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
      toggleRef.current.toggleVisibility();
    } else {
      // fail
      props.flashNotification('Failed to add blog.', { duration: 5 });
    }
  };

  return (
    <section className="blogs">
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title: <input value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)} />
        </label>
        <label>
          Author: <input value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)} />
        </label>
        <label>
          URL: <input value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)} />
        </label>
        <label>
          Added by: <input value={'@' + username} disabled />
        </label>
        <button type="submit">Add</button>
      </form>
    </section>
  );
};

const mapStateToProps = state => ({
  username: state.user.username
});

export default connect(mapStateToProps, { createBlog, flashNotification })(NewBlogForm);
