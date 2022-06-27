import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import ApiService from '../../../services/api_service';

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = '/restaurants';
      const data = await ApiService.apiGet(endpoint);
      setRestaurants(data);
    }

    fetchData().catch(function (error) {
      console.log('error =>', error);
    });
  }, []);

  const renderRestaurant = (restaurant, index) => {
    return (
      <tr key={index}>
        <td className='p-3 border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>
          <Link to={`/setup/restaurants/${restaurant.id}`} >{restaurant.name}</Link>
        </td>
        <td className='p-3 border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>
          <Link to={`/setup/restaurants/${restaurant.id}`} >{restaurant.name_en}</Link>
        </td>
        <td className='p-3 border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>
          <Link to={`/setup/restaurants/${restaurant.id}`} >{restaurant.restaurant_type.type_name}</Link>
        </td>
        <td className='p-3 border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'>
          <Link to={`/setup/restaurants/${restaurant.id}`} >{restaurant.number_of_tables}</Link>
        </td>
      </tr>
    )
  }

  return (
    <div>
      <div className='my-4'>
        <div className='flex w-full'>
          <div className='w-1/2'>
            <h1 className="text-3xl font-bold">Restaurants</h1>
          </div>
          <div className='w-1/2 text-right'>
            <Link to='/setup/create_restaurant' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              + Create new restaurant
            </Link>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <table className="border-collapse table-auto w-full">
          <thead className='text-left'>
            <tr>
              <th className='border-b bg-gray-200 dark:border-slate-600 font-medium p-3 text-slate-600 dark:text-slate-200'>Restaurant Name</th>
              <th className='border-b bg-gray-200 dark:border-slate-600 font-medium p-3 text-slate-600 dark:text-slate-200'>Restaurant Name (EN)</th>
              <th className='border-b bg-gray-200 dark:border-slate-600 font-medium p-3 text-slate-600 dark:text-slate-200'>Restaurant Type</th>
              <th className='border-b bg-gray-200 dark:border-slate-600 font-medium p-3 text-slate-600 dark:text-slate-200'>Number of Tables</th>
            </tr>
          </thead>
          <tbody>
          {(!_.isEmpty(restaurants)) && _.map(restaurants, renderRestaurant)}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default RestaurantsPage;
