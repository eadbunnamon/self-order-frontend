import React from "react";
import { Outlet, Link } from 'react-router-dom';

import LoginSession from '../stores/LoginSession';

const AppLayout = () => {
  console.log("render App Layout");

  const handleLogout = (event) => {
    event.preventDefault();
    LoginSession.logout();
    window.location.replace('/login');
  }

  return (
    <div>
      <header className="App-header">
        <h2>Self-Order</h2>
      </header>
      <body>
        <div>
          <h4>Welcome to self-order restaurant tool</h4>
          <div>
            <Link to="/sign_out" onClick={handleLogout}>Sign Out</Link>
          </div>
          <Outlet /> {/*nested routes rendered here*/}
        </div>
      </body>
    </div>
  );
};

export default AppLayout
