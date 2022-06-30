import React, { useState } from 'react';
import ApiService from '../../../services/api_service';
import ErrorMessage from '../../../components/ErrorMessage';

function NewTablePage(props) {
  const restaurant_id = props.restaurant_id;

  const [error_message, setErrorMessage] = useState('');
  const [table, setTable] = useState({
    name: '',
    amount: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { table };
    const newRecord = async () => {
      let endpoint = `/restaurants/${restaurant_id}/tables`;
      await ApiService.apiPost(endpoint, data);
      setTable({ name: '', amount: '' });
      props.handleReload();
    }

    newRecord().catch(function (error) {
      const error_message = error.response.data.error.message;
      setErrorMessage(error_message);
    });
  }

  const handleChange = (e) => {
    setTable({...table, [e.target.name]: e.target.value});
    setErrorMessage('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <div className='text-blue-500 text-sm mb-3'>
          <p>* ถ้าระบุ <b className='text-blue-600'>จำนวนโต๊ะ</b> จะได้ <b className='text-blue-600'>ชื่อโต๊ะ + ลำดับ</b> เช่น "ชื่อโต๊ะ 1", "ชื่อโต๊ะ 2", ...</p>
          <p>* ถ้าไม่ระบุ <b className='text-blue-600'>จำนวนโต๊ะ</b> จะได้ชื่อโต๊ะตามที่ระบุ</p>
        </div>
        <div className='flex'>
          <div className='w-2/6'>
            <div className='text-gray-500'>
              ชื่อโต๊ะ<span className='text-red-500 ml-1'>*</span>
            </div>
            <input 
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              value={table.name || ''}
              onChange={handleChange} />
          </div>
          <div className='w-1/6 ml-3'>
            <div className='text-gray-500'>
              จำนวนโต๊ะ
            </div>
            <input 
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              name="amount"
              value={table.amount}
              onChange={handleChange} />
          </div>
          <div className='w-2/3 ml-3 mt-6'>
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