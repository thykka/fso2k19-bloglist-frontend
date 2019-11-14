import React from 'react';
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom';

import './App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import BlogList from './components/BlogList';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import Togglable from './components/Togglable';

import UsersList from './components/UsersList';
import UserDetails from './components/UserDetails';

import { flashNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';

const Menu = props => {
  return (
    <nav>
      <Link to='/'> Home </Link>
      <Link to='/users'> Users </Link>
    </nav>
  );
};

const App = (props) => {
  const { user, users, initializeBlogs, initializeUsers } = props;

  const newBlogFormRef = React.createRef();

  useEffect(() => {
    initializeBlogs();
  }, [initializeBlogs]);

  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

  const userIsLoggedIn = () => user !== null;

  const userById = id => users.find(user => user.id === id);

  return (
    <div>
      <Router>
        <h1>Bloglist</h1>
        <Menu />
        <Notification />
        <div>
          { userIsLoggedIn() ? <LogoutForm /> : <LoginForm /> }
        </div>
        <Route exact path="/" render={ () =>
          userIsLoggedIn() && (
            <section>
              <Togglable ref={newBlogFormRef} showLabel="New blog" hideLabel="Cancel">
                <NewBlogForm toggleRef={ newBlogFormRef } />
              </Togglable>
              <BlogList />
            </section>
          )} />
        <Route exact path="/users" render={ () => (
          <section>
            <h2>Users</h2>
            <UsersList />
          </section>
        )} />
        <Route exact path="/users/:id" render={({ match }) => (
          <UserDetails user={ userById(match.params.id) } />
        )} />
      </Router>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  users: state.users
});

export default connect(
  mapStateToProps, {
    initializeBlogs,
    initializeUsers,
    flashNotification
  }
)(App);
