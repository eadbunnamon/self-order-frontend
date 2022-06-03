import React from "react";
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  console.log("render App Layout");

  return (
    <div>
      <header className="App-header">
        <h2>Self-Order</h2>
      </header>
      <body>
        <div>
          <h4>Welcome to self-order restaurant tool</h4>
          <Outlet /> {/*nested routes rendered here*/}
        </div>
      </body>
    </div>
  );
};

export default AppLayout
