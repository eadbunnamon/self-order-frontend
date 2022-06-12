import React from "react";
import { Link } from 'react-router-dom';

import LoginSession from '../stores/LoginSession';

const HomePage = ({ children }) => {
  return (
    <div className='w-full'>
      Welcome to self-order
    </div>
  );
};

export default HomePage
