import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogList';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import Togglable from './components/Togglable';
import { useField } from './hooks/index';

import { flashNotification } from './reducers/notificationReducer';

function App(props) {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const username = useField('text');
  const password = useField('password');
  const [user, setUser] = useState(null);

  const newBlogFormRef = React.createRef();

  const userStorageKey = 'bloglist-user';

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem(userStorageKey);
    if(userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.props.value,
        password: password.props.value
      });
      window.localStorage.setItem(
        userStorageKey,
        JSON.stringify(user)
      );
      setUser(user);
      username.reset();
      password.reset();
      props.flashNotification('Logged in as ' + user.username, { duration: 5, level: 'info' });
    } catch(e) {
      props.flashNotification('Access denied.', { duration: 5 });
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem(userStorageKey);
    setUser(null);
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    newBlogFormRef.current.toggleVisibility();

    try {
      await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      });

      updateBlogs();
      setNewBlogTitle('');
      setNewBlogAuthor('');
      setNewBlogUrl('');
      props.flashNotification('Blog added!', { duration: 5, level: 'info' });
    } catch(e) {
      props.flashNotification('Failed to add blog', { duration: 5 });
    }
  };


  const handleLikeBlog = async (event, id) => {
    event.preventDefault();
    await blogService.like(id, {});
    updateBlogs();
  };

  const handleRemoveBlog = async (event, id) => {
    event.preventDefault();
    await blogService.remove(id);
    updateBlogs();
  };

  const updateBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const sortBlogs = (key, desc) => {
    return (blogA, blogB) => {
      if(desc) return blogB[key] - blogA[key];
      return blogA[key] - blogB[key];
    };
  };
  const sortByLikes = sortBlogs('likes', true);

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification />
      { user === null && (
        <Togglable showLabel="Log in" hideLabel="Cancel">
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            password={password}
          />
        </Togglable>
      )}
      { user !== null && (
        <section>
          <LogoutForm handleSubmit={handleLogout} name={user.name} />
          <Togglable ref={newBlogFormRef} showLabel="New blog" hideLabel="Cancel">
            <NewBlogForm
              username={user.username}
              handleSubmit={handleNewBlog}
              blogTitle={newBlogTitle}
              blogAuthor={newBlogAuthor}
              blogUrl={newBlogUrl}
              handleTitleChange={({ target }) => setNewBlogTitle(target.value)}
              handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
              handleUrlChange={({ target }) => setNewBlogUrl(target.value)}
            />
          </Togglable>
          <BlogList
            blogs={blogs.sort(sortByLikes)}
            userName={user.username}
            handleLikeBlog={handleLikeBlog}
            handleRemoveBlog={handleRemoveBlog} />
        </section>
      )}
    </div>
  );
}

export default connect(null, { flashNotification })(App);
