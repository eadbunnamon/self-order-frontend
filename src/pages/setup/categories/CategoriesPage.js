import React, { useState, useEffect, useCallback } from 'react';
import ApiService from '../../../services/api_service';
import _ from 'lodash';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'

import ErrorMessage from '../../../components/ErrorMessage';
import NewCategoryPage from './NewCategoryPage';
import EditCategoryPage from './EditCategoryPage';

function CategoriesPage(props) {
  const restaurant_id = props.restaurant.id;

  const [error_message, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [mode, setMode] = useState({
    edit: false,
    id: ''
  });

  const fetchData = async (restaurant_id) => {
    let endpoint = `/restaurants/${restaurant_id}/categories`;
    const data = await ApiService.apiGet(endpoint);
    await setCategories(data);
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
      const error_message = error.response.data.error.message;
      setErrorMessage(error_message);
    });
  }

  const handleDelete = (category) => {
    const deleteCategory = async () => {
      let endpoint = `/restaurants/${restaurant_id}/categories/${category.id}`;
      await ApiService.apiDelete(endpoint);

      fetchData(restaurant_id).catch(function (error) {
        const error_message = error.response.data.error.message;
        setErrorMessage(error_message);
      });
    }

    deleteCategory().catch(function (error) {
      const error_message = error.response.data.error.message;
      setErrorMessage(error_message);
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
              <div className='flex'>
                <div className='w-1/2'>

                  <TrashIcon
                    className="inline h-5 w-5 text-gray-500 hover:text-red-700"
                    onClick={() => {if(window.confirm('Delete the item?')) {handleDelete(category)}}}/>

                  <PencilIcon
                    onClick={() => {handleSetMode(true, category)}}
                    className="inline h-5 w-5 text-gray-500 hover:text-blue-700 ml-2" />
                </div>
                <div className='w-1/2 text-right'>
                  <button
                    onClick={() => {handleSetMode(true, category)}}
                    className='ml-3 bg-lime-500 hover:bg-lime-700 text-white px-2 py-1 rounded'>
                    จัดการเมนูอาหาร
                  </button>
                </div>
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

      <div>
        {error_message && <ErrorMessage error_message={error_message} />}
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
