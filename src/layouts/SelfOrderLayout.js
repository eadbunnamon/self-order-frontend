import React from "react";
import { Outlet } from 'react-router-dom';

const SelfOrderLayout = () => {
  console.log("render SelfOrderLayout");

  return (
    <div>
      <header className='bg-gray-400 py-4'>
        <h2>Restaurant Name</h2>
      </header>
      <div>
        <h4>Welcome to our restaurant!</h4>
        <Outlet /> {/*nested routes rendered here*/}
      </div>
    </div>
  );
};

export default SelfOrderLayout
