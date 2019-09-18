import React from 'react';
import PropTypes from 'prop-types';


const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username, password
}) => {
  return (
    <section className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
    </section>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;
