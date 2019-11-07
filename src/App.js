import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import BlogList from './components/BlogList';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import Togglable from './components/Togglable';

import { flashNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogsReducer';

const App = (props) => {
  const { user } = props;

  const newBlogFormRef = React.createRef();

  useEffect(() => {
    props.initializeBlogs();
  });

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification />
      { user === null ? (
        <LoginForm />
      ) : (
        <section>
          <LogoutForm />
          <Togglable ref={newBlogFormRef} showLabel="New blog" hideLabel="Cancel">
            <NewBlogForm toggleRef={ newBlogFormRef } />
          </Togglable>
          <BlogList />
        </section>
      ) }
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps, {
    initializeBlogs,
    flashNotification
  }
)(App);
