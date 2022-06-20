import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import ApiService from '../../../services/api_service';
import _ from 'lodash';

import TablesPage from '../tables/TablesPage';
import CategoriesPage from '../categories/CategoriesPage';

function RestaurantPage() {
  let params = useParams();
  const id = params['id'];
  const [restaurant, setRestaurant] = useState({});
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = '/restaurants/' + id;
      const data = await ApiService.apiGet(endpoint);
      setRestaurant(data);
      fetchTableData().catch(function (error) {
        console.log('error in =>', error);
      });
    }

    const fetchTableData = async () => {
      let endpoint = '/restaurants/' + id + '/tables';
      const data = await ApiService.apiGet(endpoint);
      setTables(data);
    }

    fetchData().catch(function (error) {
      console.log('error =>', error);
    });
  }, [id]);

  return (
    <div>
      <div className='flex w-full bg-gray-300 border rounded p-4'>
        <div className='w-1/2'>
          <h1>{restaurant.name}</h1>
        </div>
        <div className='w-1/2 text-right'>
          <Link to={`/setup/edit_restaurant/${id}`}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
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

      <CategoriesPage restaurant={restaurant} />
      <TablesPage restaurant={restaurant} tables={tables} />
    </div>
  );
};

export default RestaurantPage;
