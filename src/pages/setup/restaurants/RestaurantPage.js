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
  const [openTab, setOpenTab] = React.useState(1);

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = '/restaurants/' + id;
      const data = await ApiService.apiGet(endpoint);
      setRestaurant(data);
    }

    fetchData().catch(function (error) {
      console.log('error =>', error);
    });
  }, [id]);

  const activeTabClass = () => {
    return (
      "inline-block p-4 rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
    )
  }

  const inactiveTabClass = () => {
    return (
      "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
    )
  }

  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2" onClick={() => {setOpenTab(1)}}>
            <button type="button"
              className={(openTab === 1 ? activeTabClass() : inactiveTabClass())}>
              Restaurant
            </button>
          </li>
          <li className="mr-2" onClick={() => {setOpenTab(2)}}>
            <button type="button"
              className={(openTab === 2 ? activeTabClass() : inactiveTabClass())}>
              จัดการเมนูอาหาร ({restaurant.number_of_categories})
            </button>
          </li>
          <li className="mr-2" onClick={() => {setOpenTab(3)}}>
            <button type="button"
              className={(openTab === 3 ? activeTabClass() : inactiveTabClass())}>
              Tables ({restaurant.number_of_tables})
            </button>
          </li>
        </ul>
      </div>
      <div id='restaurant-tab-content' className='my-5 pb-6'>
        <div className={(openTab !== 1 && "hidden ") + "p-4 bg-gray-50 rounded-lg dark:bg-gray-800"} id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <div className='flex w-full bg-gray-200 border rounded p-4'>
            <div className='w-1/2'>
              <h1 className='text-slate-600'>{restaurant.name}</h1>
            </div>
            <div className='w-1/2 text-right'>
              <Link to={`/setup/edit_restaurant/${id}`}
                className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'>
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
        </div>

        <div className={(openTab !== 2 && "hidden ") + "p-4 bg-gray-50 rounded-lg dark:bg-gray-800"} id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
          <CategoriesPage restaurant_id={id} restaurant={restaurant} />
        </div>

        <div className={(openTab !== 3 && "hidden ") + "p-4 bg-gray-50 rounded-lg dark:bg-gray-800"} id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
          <TablesPage restaurant_id={id} restaurant={restaurant} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
