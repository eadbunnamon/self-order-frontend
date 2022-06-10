import React from "react";
import { Outlet } from 'react-router-dom';

const BackendLayout = () => {
  console.log("render Backend Layout");

  return (
    <div>
      <header className="App-header">
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
