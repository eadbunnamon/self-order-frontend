import React, { useState } from 'react';
import ApiService from '../../../services/api_service';
import ErrorMessage from '../../../components/ErrorMessage';

function NewTablePage(props) {
  const restaurant_id = props.restaurant_id;

  const [error_message, setErrorMessage] = useState('');
  const [table, setTable] = useState({
    name: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { table };
    const newRecord = async () => {
      let endpoint = `/restaurants/${restaurant_id}/tables`;
      await ApiService.apiPost(endpoint, data);
      setTable({ name: '' });
      props.handleReload();
    }

    newRecord().catch(function (error) {
      console.log('error_message =>', error);
      const error_message = error.response.data.error.message;
      setErrorMessage(error_message);
    });
  }

  const handleChange = (e) => {
    setTable({...table, [e.target.name]: e.target.value});
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
              value={table.name || ''}
              placeholder="ชื่อโต๊ะ"
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

export default NewTablePage;