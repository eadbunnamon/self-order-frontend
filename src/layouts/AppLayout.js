import React from "react";
import { Outlet, Link } from 'react-router-dom';

import LoginSession from '../stores/LoginSession';
import SetupMenu from '../components/SetupMenu';
import Logo from '../assets/images/self-order-logo.jpg';

const AppLayout = () => {
  console.log("render App Layout");

  const handleLogout = (event) => {
    event.preventDefault();
    LoginSession.logout();
    window.location.replace('/');
  }

  return (
    <div>
      <header className='pt-4 pb-2 top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent'>
        <div className='flex w-full'>
          <div className='w-4/6 mx-4'>
            <Link to='/' className='hover:text-sky-500 dark:hover:text-sky-400 inline-block'>
              <img alt='LOGO' src={Logo} className='w-20' />
            </Link>
            {LoginSession.current && (
              <SetupMenu />
            )}
          </div>
          <div className='w-2/6 mx-4 text-right'>
            {LoginSession.current ? (
              <div>
                <span className='pr-3'>user: {LoginSession.username}</span>|
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
        <div className='flex h-screen w-full px-5 mt-5'>
          <div className='w-5/6 px-5 mx-auto'>
            <Outlet /> {/*nested routes rendered here*/}
          </div>
        </div>
      ) : (
        <div className='h-screen w-full px-5 mt-5'>
          <Outlet /> {/*nested routes rendered here*/}
        </div>
      )}
    </div>
  );
};

export default AppLayout
