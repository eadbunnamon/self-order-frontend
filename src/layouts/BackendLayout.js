import React from "react";
import { Outlet } from 'react-router-dom';

const BackendLayout = () => {
  console.log("render Backend Layout");

  return (
    <div>
      <header className='bg-gray-400 py-4'>
        <div>Self-Order Backend</div>
      </header>
      <div>
        <h4>Backend</h4>
        <Outlet /> {/*nested routes rendered here*/}
      </div>
    </div>
  );
};

export default BackendLayout
