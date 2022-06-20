import React, { useState, useEffect, useCallback } from 'react';
import ApiService from '../../../services/api_service';
import _ from 'lodash';

import EditCategoryPage from './EditCategoryPage';

function CategoriesPage(props) {
  const restaurant_id = props.restaurant.id;

  const [error_message, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: '',
    name_en: ''
  });
  const [mode, setMode] = useState({
    edit: false,
    id: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = `/restaurants/${restaurant_id}/categories`;
      const data = await ApiService.apiGet(endpoint);
      setCategories(data);
    }

    fetchData().catch(function (error) {
      console.log('error =>', error);
    });
  }, [restaurant_id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { category };

    const newRecord = async () => {
      let endpoint = `/restaurants/${restaurant_id}/categories`;
      await ApiService.apiPost(endpoint, data);
      // TODO don't want to reload page
      window.location.href = `/setup/restaurants/${restaurant_id}`;
    }

    newRecord()
    .catch(function (error) {
      console.log(error)
      const error_message = error.response.data.error.message;
      setErrorMessage(error_message);
    });
  }

  const handleChange = (e) => {
    setCategory({...category, [e.target.name]: e.target.value});
    setErrorMessage('');
  }

  const handleSetMode = useCallback(
    (mode, id) => {
      console.log('mode =>', mode)
      setMode({
        edit: mode,
        id: id
      });
    }, []
  )

  const renderCategory = (category, index) => {
    return (
      <div key={index} className='border border-lime-600 rounded p-3'>
        {mode.edit && mode.id === category.id ? (
          <EditCategoryPage category={category} handleSetMode={handleSetMode} />
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
                <button onClick={() => {handleSetMode(true, category.id)}} className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded'>
                  แก้ไข
                </button>
                <button onClick={() => {handleSetMode(true, category.id)}} className='ml-3 bg-lime-500 hover:bg-lime-700 text-white font-bold p-2 rounded'>
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
        <h1>Cagegories</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className='flex'>
            <div className='w-1/3'>
              <input 
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                placeholder="ประเภทอาหาร"
                onChange={handleChange} />
            </div>
            <div className='w-1/3 ml-3'>
              <input 
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name_en"
                name="name_en"
                placeholder="ประเภทอาหาร (English)"
                onChange={handleChange} />
            </div>
            <div className='w-1/3 ml-3'>
              <div className='flex items-center justify-between'>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  เพิ่ม
                </button>
              </div>
            </div>
          </div>

          {error_message && (
            <div className='text-red-500'>{error_message}</div>
          )}
        </form>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {(!_.isEmpty(categories)) && _.map(categories, renderCategory)}
      </div>
    </div>
  );
}

export default CategoriesPage;
