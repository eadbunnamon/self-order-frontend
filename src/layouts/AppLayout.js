import React from "react";
import { Outlet, Link } from 'react-router-dom';

import LoginSession from '../stores/LoginSession';
import SetupMenu from '../components/SetupMenu';

const AppLayout = () => {
  console.log("render App Layout");

  const handleLogout = (event) => {
    event.preventDefault();
    LoginSession.logout();
    window.location.replace('/');
  }

  return (
    <div>
      <header className='py-4 sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent'>
        <div className='flex w-full'>
          <div className='w-1/3 mx-4'>
            <Link to='/' className='hover:text-sky-500 dark:hover:text-sky-400'>Logo</Link>
          </div>
          <div className='w-1/3 mx-4 text-center font-bold'><h1>Self-Order</h1></div>
          <div className='w-1/3 mx-4 text-right'>
            {LoginSession.current ? (
              <div>
                <span className='pr-3'>{LoginSession.username}</span>|
                <Link to="/sign_out" onClick={handleLogout} className='hover:text-sky-500 dark:hover:text-sky-400 pl-3'>Sign Out</Link>
              </div>
            ) : (
              <div>
                <Link to="/login" className='hover:text-sky-500 dark:hover:text-sky-400 pr-3'>Sign In</Link>|
                <Link to="/sign_up" className='hover:text-sky-500 dark:hover:text-sky-400 pl-3'>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      {LoginSession.current ? (
        <div className='flex h-screen w-full'>
          <SetupMenu />
          <div className='w-4/5 p-4'>
            <Outlet /> {/*nested routes rendered here*/}
          </div>
        </div>
      ) : (
        <div className='h-screen w-full p-5'>
          <Outlet /> {/*nested routes rendered here*/}
        </div>
      )}
    </div>
  );
};

export default AppLayout
