import React from 'react';

function Notification(props) {
  return (
    <div>
      { props.message && (
        <p className={props.type || 'error'}>{props.message}</p>
      )}
    </div>
  )
}

export default Notification;
