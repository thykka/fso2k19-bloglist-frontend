import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';

function Notification(props) {
  return (
    <div>
      { props.message && (
        <p className={props.type || 'error'}>{props.message}</p>
      )}
    </div>
  )
}

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
  }

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

  const handleLogout = (event) => {
    window.localStorage.removeItem(userStorageKey);
    setUser(null);
  }

  const loginForm = () => (
    <section className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={({target}) => setUsername(target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={({target}) => setPassword(target.value)}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
    </section>
  );

  const logoutForm = () => (
    <section className="logout">
      <form onSubmit={handleLogout}>
        <button type="submit">Log out</button>
      </form>
    </section>
  );


  const blogList = () => (
    <section className="bloglist">
      <h2>Blogs</h2>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </section>
  );

  const blogForm = () => (
    <section className="blogs">
      <h2>Add new</h2>
      <form onSubmit={handleNewBlog}>
        <label>
          Title:
          <input
            value={newBlogTitle}
            onChange={({target}) => setNewBlogTitle(target.value)}
          />
        </label>
        <label>
          Author:
          <input
            value={newBlogAuthor}
            onChange={({target}) => setNewBlogAuthor(target.value)}
          />
        </label>
        <label>
          URL:
          <input
            value={newBlogUrl}
            onChange={({target}) => setNewBlogUrl(target.value)}
          />
        </label>
        <label>
          Added by:
          <input
            value={'@' + user.username}
            disabled
            style={{border: 0, paddingLeft: 0}}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </section>
  );

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={errorMessage} type={errorType} />
      { user === null && loginForm() }
      { user !== null && logoutForm() }
      { user !== null && blogForm() }
      { blogList() }
    </div>
  );
}

export default App;
