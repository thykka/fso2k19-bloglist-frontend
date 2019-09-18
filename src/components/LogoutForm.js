import React from 'react';

const LogoutForm = ({
  handleSubmit, name
}) => (
  <section className="logout">
    <p>Logged in as {name}</p>
    <form onSubmit={handleSubmit}>
      <button type="submit">Log out</button>
    </form>
  </section>
);

export default LogoutForm;
