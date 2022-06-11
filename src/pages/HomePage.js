import React from "react";
import { Link } from 'react-router-dom';

import LoginSession from '../stores/LoginSession';

const HomePage = ({ children }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </div>
  );
};

export default HomePage
