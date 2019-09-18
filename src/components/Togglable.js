import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef(({showLabel, hideLabel, children}, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: !visible ? 'none' : '' };

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => ({ toggleVisibility }));

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
})

export default Togglable;
