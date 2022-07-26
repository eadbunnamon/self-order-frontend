import React, { useState } from 'react';
import ApiService from '../../../services/api_service';
import ErrorMessage from '../../../components/ErrorMessage';

function EditCategoryPage(props) {
  console.log('props =>', props)
  const category = props.category;

  const [error_message, setErrorMessage] = useState('');
  const [cat, setCat] = useState({
    name: category.name,
    name_en: category.name_en
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const updateData = async () => {
      let endpoint = `/restaurants/${category.restaurant_id}/categories/${category.id}`;
      const payload = { category: cat };
      await ApiService.apiPut(endpoint, payload);
      props.handleSetMode(false, category);
      props.handleReload(category);
    }

    updateData()
    .catch(function (error) {
      const error_message = error.response.data.error.message;
      setErrorMessage(error_message);
    });
  }

  const handleChange = (e) => {
    setCat({...cat, [e.target.name]: e.target.value});
    setErrorMessage('');
  }

  return (
    <div>
      <div className='mb-4'>
        {error_message && <ErrorMessage error_message={error_message} />}
      </div>

      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <div className='text-slate-400'>
            ประเภท
          </div>
          <div>
            <input 
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              value={cat.name}
              placeholder="Restaurant name"
              onChange={handleChange} />
          </div>
        </div>
        <div className='mb-4'>
          <div className='text-slate-400'>
            ประเภท (English)
          </div>
          <div>
            <input 
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name_en"
              name="name_en"
              value={cat.name_en}
              placeholder="Restaurant name"
              onChange={handleChange} />
          </div>
        </div>

        <div className='flex mt-3'>
          <div className='w-1/2 text-slate-600'>
            {category.items_count} รายการ
          </div>
          <div className='w-1/2 text-right'>
            <button type='submit' className='bg-pink-500 hover:bg-pink-700 text-white font-bold p-2 rounded'>
              บันทึก
            </button>
            <button
              onClick={()=>{props.handleSetMode(false, category)}}
              type='button'
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 rounded ml-3'>
              ยกเลิก
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditCategoryPage;