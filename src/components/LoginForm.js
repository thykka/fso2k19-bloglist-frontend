import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks/index';
import { login } from '../reducers/userReducer';
import { flashNotification } from '../reducers/notificationReducer';


const LoginForm = (props) => {
  const username = useField('text');
  const password = useField('password');

  const handleSubmit = async event => {
    event.preventDefault();
    const user = await props.login({
      username: username.props.value,
      password: password.props.value
    });
    if(user) {
      props.flashNotification('Logged in', { level: 'info' });
    } else {
      props.flashNotification('Access denied');
    }
  };

  return (
    <section className="login">
      <h2>Login</h2>
      <form onSubmit={ handleSubmit }>
        <label>
          Username:
          <input id="login-username" {...username.props} name="username" />
        </label>
        <label>
          Password:
          <input id="login-password" {...password.props} name="password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </section>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, { login, flashNotification })(LoginForm);
