import React from 'react';

const NewBlogForm = ({
  handleSubmit,
  username,
  handleTitleChange, blogTitle,
  handleAuthorChange, blogAuthor,
  handleUrlChange, blogUrl
}) => {
  return (
    <section className="blogs">
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title: <input value={blogTitle} onChange={handleTitleChange} />
        </label>
        <label>
          Author: <input value={blogAuthor} onChange={handleAuthorChange} />
        </label>
        <label>
          URL: <input value={blogUrl} onChange={handleUrlChange} />
        </label>
        <label>
          Added by: <input value={'@' + username} disabled style={{ border: 0, paddingLeft: 0 }} />
        </label>
        <button type="submit">Add</button>
      </form>
    </section>
  );
};

export default NewBlogForm;
