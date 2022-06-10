import React from "react";
import { Link } from 'react-router-dom';

import LoginSession from '../stores/LoginSession';

const HomePage = ({ children }) => {
  return (
    <div>
      <h2>Home</h2>
      {!LoginSession.current ? (
        <div>
          <Link to="/login">Sign In</Link><br />
          <Link to="/sign_up">Sign Up</Link>
        </div>
      ) : (
        <div>
          {LoginSession.username}
        </div>
      )}
    </div>
  );
};

export default HomePage
