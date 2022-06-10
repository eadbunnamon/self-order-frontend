import React from "react";
import { Outlet, Link } from 'react-router-dom';

import LoginSession from '../stores/LoginSession';

const AppLayout = () => {
  console.log("render App Layout");

  const handleLogout = (event) => {
    event.preventDefault();
    LoginSession.logout();
    window.location.replace('/');
  }

  return (
    <div>
      <header className="App-header">
        <h2>Self-Order</h2>
      </header>
      <div>
        <h4>Welcome to self-order restaurant tool</h4>
        <div>
          <Link to="/sign_out" onClick={handleLogout}>Sign Out</Link>
        </div>
        <Outlet /> {/*nested routes rendered here*/}
      </div>
    </div>
  );
};

export default AppLayout
