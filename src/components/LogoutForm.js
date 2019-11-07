import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../reducers/userReducer';

const LogoutForm = (props) => {

  const { user } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    props.logout();
  };

  return (
    <section className="logout">
      <p>Logged in as @{user.username}</p>
      <form onSubmit={handleSubmit}>
        <button type="submit">Log out</button>
      </form>
    </section>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { logout })(LogoutForm);
