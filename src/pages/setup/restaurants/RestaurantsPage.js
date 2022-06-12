import React from "react";
import { Link } from 'react-router-dom';

import LoginSession from '../../../stores/LoginSession';

const RestaurantsPage = () => {
  return (
    <div>
      <div className='mb-4'>
        <h1 className="text-3xl font-bold underline">Restaurants</h1>
      </div>

      <div className='text-right'>
        <Link to='/setup/create_restaurant' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          + Create new restaurant
        </Link>
      </div>

      <div className='mt-6'>
        <table className="border-collapse table-auto w-full">
          <thead className='text-left'>
            <tr>
              <th className='border-b dark:border-slate-600 font-medium pt-0 pb-3 text-slate-600 dark:text-slate-200'>Restaurant Name</th>
              <th className='border-b dark:border-slate-600 font-medium pt-0 pb-3 text-slate-600 dark:text-slate-200'>Restaurant Type</th>
              <th className='border-b dark:border-slate-600 font-medium pt-0 pb-3 text-slate-600 dark:text-slate-200'>Year</th>
              <th className='border-b dark:border-slate-600 font-medium pt-0 pb-3 text-slate-600 dark:text-slate-200'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>Malcolm Lockyer</td>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>1961</td>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>Edit</td>
            </tr>
            <tr>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>Witchy Woman</td>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>The Eagles</td>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>1972</td>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>Edit</td>
            </tr>
            <tr>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>Shining Star</td>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>Earth, Wind, and Fire</td>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>1975</td>
              <td className='border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantsPage;
