import React from 'react';
import { connect } from 'react-redux';

const UsersList = (props) => {
  const { users } = props;

  return (
    <div>
      <ul className="userslist">
        { users.map(user => (
          <li key={ user.id }>
            <span className="userslist-name">{ user.username }</span>
            <span className="userslist-blogs">{ user.blogs.length }</span>
          </li>
        )) }
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, {})(UsersList);
