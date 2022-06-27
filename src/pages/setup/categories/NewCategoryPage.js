import React, { useState } from 'react';
import ApiService from '../../../services/api_service';
import ErrorMessage from '../../../components/ErrorMessage';

function NewCategoryPage(props) {
  const [error_message, setErrorMessage] = useState('');
  const [category, setCategory] = useState({
    name: '',
    name_en: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { category };
    const newRecord = async () => {
      let endpoint = `/restaurants/${props.restaurant_id}/categories`;
      await ApiService.apiPost(endpoint, data);
      setCategory({ name: '', name_en: '' });
      props.handleReload(category);
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

  return (
    <div className='mx-4'>
      <form onSubmit={handleSubmit}>
        <div className='flex'>
          <div className='w-1/3'>
            <input 
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              value={category.name || ''}
              placeholder="ประเภทอาหาร"
              onChange={handleChange} />
          </div>
          <div className='w-1/3 ml-3'>
            <input 
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name_en"
              name="name_en"
              value={category.name_en || ''}
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

        <div>
          {error_message && <ErrorMessage error_message={error_message} />}
        </div>
      </form>
    </div>
  )
}

export default NewCategoryPage;