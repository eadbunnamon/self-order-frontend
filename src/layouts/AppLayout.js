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
      <header className='bg-gray-400 py-4'>
        <div className='flex w-full'>
          <div className='w-1/3 mx-4'>Logo</div>
          <div className='w-1/3 mx-4 text-center'><h1>Self-Order</h1></div>
          <div className='w-1/3 mx-4 text-right'>
            {LoginSession.current && (
              <div>
                <Link to="/sign_out" onClick={handleLogout} className='text-sky-700'>Sign Out</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className='h-screen w-full'>
        <h4>Welcome to self-order restaurant tool</h4>
        <Outlet /> {/*nested routes rendered here*/}
      </div>
    </div>
  );
};

export default AppLayout
