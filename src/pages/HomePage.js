import React from "react";
import { Link } from 'react-router-dom';

import LoginSession from '../stores/LoginSession';

const HomePage = ({ children }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
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
