import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../reducers/userReducer';

const LogoutForm = (props) => {
  if(!props.user) return null;

  const { user } = props;

  const handleClick = (event) => {
    event.preventDefault();
    props.logout();
  };

  return (
    <span className="login-info">
      <span>Logged in as @{user.username}</span>
      <button type="submit" onClick={handleClick}>Log out</button>
    </span>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { logout })(LogoutForm);
