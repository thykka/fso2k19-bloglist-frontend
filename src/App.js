import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogList';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import Togglable from './components/Togglable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorType, setErrorType] = useState('error');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const userStorageKey = 'bloglist-user';

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem(userStorageKey);
    if(userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token)
    }
  }, []);

  const setNotification = (message, type = 'error') => {
    setErrorMessage(message);
    if(type) setErrorType(type);
    setTimeout(() => setErrorMessage(null), 8000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem(
        userStorageKey,
        JSON.stringify(user)
      );
      setUser(user);
      setUsername('');
      setPassword('');
    } catch(e) {
      setNotification('Access denied');
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem(userStorageKey);
    setUser(null);
  }

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      });

      const blogs = await blogService.getAll()
      setBlogs(blogs);
      setNewBlogTitle('');
      setNewBlogAuthor('');
      setNewBlogUrl('');
      setNotification('Blog added', 'info');
    } catch(e) {
      setNotification('Failed to add blog');
    }
  };

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={errorMessage} type={errorType} />
      { user === null && (
        <Togglable showLabel="Log in" hideLabel="Cancel">
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({target}) => setUsername(target.value)}
            handlePasswordChange={({target}) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Togglable>
      )}
      { user !== null && (
        <LogoutForm handleSubmit={handleLogout} />
      ) }
      { user !== null && (
        <NewBlogForm
          username={user.username}
          handleSubmit={handleNewBlog}
          blogTitle={newBlogTitle}
          blogAuthor={newBlogAuthor}
          blogUrl={newBlogUrl}
          handleTitleChange={({target}) => setNewBlogTitle(target.value)}
          handleAuthorChange={({target}) => setNewBlogAuthor(target.value)}
          handleUrlChange={({target}) => setNewBlogUrl(target.value)}
        />
      )}
      <BlogList blogs={blogs} />
    </div>
  );
}

export default App;
