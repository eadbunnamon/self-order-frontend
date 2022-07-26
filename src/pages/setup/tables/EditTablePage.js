import React, { useState } from 'react';
import ApiService from '../../../services/api_service';
import ErrorMessage from '../../../components/ErrorMessage';

function EditTablePage(props) {
  const restaurant_id = props.restaurant_id;

  const [error_message, setErrorMessage] = useState('');
  const [table, setTable] = useState({
    name: props.table.name || ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { table };
    const updateData = async () => {
      let endpoint = `/restaurants/${restaurant_id}/tables/${props.table.id}`;
      await ApiService.apiPut(endpoint, data);
      props.handleSetMode(false, props.table);
      props.handleReload(props.table);
    }

    updateData().catch(function (error) {
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
        <div>
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
        <div className='mt-3'>
          <button type='submit' className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'>
            บันทึก
          </button>
          <button
            onClick={()=>{props.handleSetMode(false, table)}}
            type='button'
            className='bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 rounded ml-3'>
            ยกเลิก
          </button>
        </div>

        <div>
          {error_message && <ErrorMessage error_message={error_message} />}
        </div>
      </form>
    </div>
  )
}

export default EditTablePage;
