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

import { flashNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';

const App = (props) => {
  const { user } = props;

  const newBlogFormRef = React.createRef();

  useEffect(() => {
    props.initializeBlogs();
    props.initializeUsers();
  });

  const userIsLoggedIn = () => user !== null;

  return (
    <div>
      <Router>
        <h1>Bloglist</h1>
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
      </Router>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps, {
    initializeBlogs,
    initializeUsers,
    flashNotification
  }
)(App);
