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
import { initializeBlogs } from './reducers/blogsReducer';

const App = (props) => {
  const username = useField('text');
  const password = useField('password');
  const [user, setUser] = useState(null);

  const newBlogFormRef = React.createRef();

  const userStorageKey = 'bloglist-user';

  useEffect(() => {
    props.initializeBlogs();
  });

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
            <NewBlogForm username={ user.username } toggleRef={ newBlogFormRef } />
          </Togglable>
          <BlogList username={ user.username } />
        </section>
      )}
    </div>
  );
};

export default connect(null, { initializeBlogs, flashNotification })(App);
