import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { adminApi } from '../../../api';
import _ from 'lodash';

function RestaurantPage() {
  let params = useParams();
  const id = params['id'];
  const [restaurant, setRestaurant] = useState({});
  const [tables, setTables] = useState([]);

  useEffect(() => {
    // Fetch restaurant
    adminApi.request({
      method: 'get',
      url: '/restaurants/' + id
    }).then(function (resp) {
      setRestaurant(resp.data);
      // Fetch tables
      adminApi.request({
        method: 'get',
        url: '/restaurants/' + id + '/tables'
      }).then(function (resp) {
        setTables(resp.data);
      }).catch(function (error) {
        console.log(error);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  const renderTable = (table, index) => {
    return (
      <div key={index} className='border border-lime-600 rounded p-3'>
        {table.name}
      </div>
    )
  }

  return (
    <div>
      <div className='flex w-full bg-gray-300 border rounded p-4'>
        <div className='w-1/2'>
          <h1>{restaurant.name}</h1>
        </div>
        <div className='w-1/2 text-right'>
          <Link to={`/setup/edit_restaurant/${id}`}
            className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Edit
          </Link>
        </div>
      </div>

      <div className='flex mt-5'>
        <div className='w-1/2 border-l-4 border-lime-600 px-3'>
          <div className='text-slate-400'>Restaurant Name:</div>
          <div className='text-slate-600'>{restaurant.name}</div>
        </div>
        <div className='w-1/2 border-l-4 border-lime-600 px-3'>
          <div className='text-slate-400'>Restaurant Name in English:</div>
          <div className='text-slate-600'>{restaurant.name_en}</div>
        </div>
      </div>

      <div className='flex mt-5'>
        <div className='w-1/2 border-l-4 border-lime-400 px-3'>
          <div className='text-slate-400'>Open:</div>
          <div className='text-slate-600'>{restaurant.open_time || '-'}</div>
        </div>
        <div className='w-1/2 border-l-4 border-lime-400 px-3'>
          <div className='text-slate-400'>Close:</div>
          <div className='text-slate-600'>{restaurant.close_time || '-'}</div>
        </div>
      </div>

      <div className='flex mt-5'>
        <div className='w-1/2 border-l-4 border-lime-600 px-3'>
          <div className='text-slate-400'>Day Off Description:</div>
          <div className='text-slate-600'>{restaurant.day_off_description || '-'}</div>
        </div>
        <div className='w-1/2 border-l-4 border-lime-600 px-3'>
          <div className='text-slate-400'>Day Off Description in English:</div>
          <div className='text-slate-600'>{restaurant.day_off_description_en || '-'}</div>
        </div>
      </div>

      <div className='flex w-full bg-gray-100 border rounded p-4 my-5'>
        <div className='w-1/2'>
          <h1>Tables ({restaurant.number_of_tables})</h1>
        </div>
        <div className='w-1/2 text-right'>
          <Link to={`/setup/edit_restaurant/${id}`}
            className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            + Create new Table
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {(!_.isEmpty(tables)) && _.map(tables, renderTable)}
      </div>
    </div>
  );
};

export default RestaurantPage;
