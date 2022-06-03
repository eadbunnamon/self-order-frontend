import React from "react";
import { Outlet } from 'react-router-dom';

const SelfOrderLayout = () => {
  console.log("render SelfOrderLayout");

  return (
    <div>
      <header className="App-header">
        <h2>Restaurant Name</h2>
      </header>
      <body>
        <div>
          <h4>Welcome to our restaurant!</h4>
          <Outlet /> {/*nested routes rendered here*/}
        </div>
      </body>
    </div>
  );
};

export default SelfOrderLayout
