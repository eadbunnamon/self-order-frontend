import React, { useState, useEffect, useCallback } from 'react';
import ApiService from '../../../services/api_service';
import _ from 'lodash';

import NewCategoryPage from './NewCategoryPage';
import EditCategoryPage from './EditCategoryPage';

function CategoriesPage(props) {
  const restaurant_id = props.restaurant.id;

  const [categories, setCategories] = useState();
  const [mode, setMode] = useState({
    edit: false,
    id: ''
  });

  const fetchData = async (restaurant_id) => {
    let endpoint = `/restaurants/${restaurant_id}/categories`;
    const data = await ApiService.apiGet(endpoint);
    setCategories(data);
  }

  useEffect(() => {
    fetchData(restaurant_id).catch(function (error) {
      console.log('error =>', error);
    });
  }, [restaurant_id]);

  const handleSetMode = useCallback(
    (mode, category) => {
      setMode({
        edit: mode,
        id: category.id
      });
    }, []
  )

  const handleReload = (category_data) => {
    fetchData(restaurant_id).catch(function (error) {
      console.log('error =>', error);
    });
  }

  const renderCategory = (category, index) => {
    return (
      <div key={index} className='border border-lime-600 rounded p-3'>
        {mode.edit && mode.id === category.id ? (
          <EditCategoryPage
            category={category}
            handleSetMode={handleSetMode}
            handleReload={handleReload} />
        ) : (
          <div>
            <div>{category.name}</div>
            <div className='text-slate-400'>({category.name_en})</div>

            <div className='mt-3'>
              <div className='text-slate-600'>
                {category.items_count} รายการ
              </div>
            </div>
            <div className='mt-3'>
              <div className='text-right'>
                <button onClick={() => {handleSetMode(true, category)}} className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded'>
                  แก้ไข
                </button>
                <button onClick={() => {handleSetMode(true, category)}} className='ml-3 bg-lime-500 hover:bg-lime-700 text-white font-bold p-2 rounded'>
                  จัดการเมนู
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className='bg-gray-200 border rounded p-4 my-5'>
        <h1 className='font-bold'>ประเภทเมนูอาหาร</h1>
      </div>

      <NewCategoryPage
        restaurant_id={restaurant_id}
        handleReload={handleReload} />

      <div className="grid grid-cols-3 gap-4 mt-6">
        {categories && _.map(categories, renderCategory)}
      </div>
    </div>
  );
}

export default CategoriesPage;
