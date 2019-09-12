import React, { useState } from 'react';

const Togglable = ({showLabel, hideLabel, children}) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: !visible ? 'none' : '' };

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{showLabel || 'show'}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>{hideLabel || 'hide'}</button>
        { children }
      </div>

    </div>
  )
}

export default Togglable;
