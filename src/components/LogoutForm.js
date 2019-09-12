import React from 'react';

const LogoutForm = ({
  handleSubmit
}) => (
  <section className="logout">
    <form onSubmit={handleSubmit}>
      <button type="submit">Log out</button>
    </form>
  </section>
);

export default LogoutForm;
