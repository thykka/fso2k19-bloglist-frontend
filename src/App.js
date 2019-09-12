import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
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
      setErrorMessage('Access denied');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem(userStorageKey);
    setUser(null);
  }

  const loginForm = () => (
    <section className="login">
      <h2>Login</h2>
      {/*<Notification message={errorMessage} />*/}
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

  const addBlog = () => {

  };

  const handleBlogChange = async () => {

  };

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
      <form onSubmit={addBlog}>
        <label>
          User:
          <input
            value={user.name}
            disabled
          />
        </label>
        <label>
          Blog URL:
          <input
            value={newBlog}
            onChange={handleBlogChange}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </section>
  );

  return (
    <div>
      <h1>Bloglist</h1>
      { user === null && loginForm() }
      { user !== null && logoutForm() }
      { user !== null && blogForm() }
      { blogList() }
    </div>
  );
}

export default App;
