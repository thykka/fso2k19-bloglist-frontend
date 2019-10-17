import React from 'react';
import PropTypes from 'prop-types';


const LoginForm = ({
  handleSubmit,
  username, password
}) => {
  return (
    <section className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input {...username.props} name="username" />
        </label>
        <label>
          Password:
          <input {...password.props} name="password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </section>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
};

export default LoginForm;
