import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const { notification } = props;

  return (
    <div>
      { notification.visible && (
        <p className={notification.level || 'error'}>{notification.message}</p>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);
