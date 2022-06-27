import React, { useState, useEffect } from 'react';
import ApiService from '../../../services/api_service';
import _ from 'lodash';

function TablesPage(props) {
  const restaurant_id = props.restaurant.id;

  const [error_message, setErrorMessage] = useState('');
  const [tables, setTables] = useState();
  const [table, setTable] = useState({
    name: ''
  });

  const fetchData = async (restaurant_id) => {
    let endpoint = '/restaurants/' + restaurant_id + '/tables';
    const data = await ApiService.apiGet(endpoint);
    setTables(data);
  }

  useEffect(() => {
    fetchData(restaurant_id).catch(function (error) {
      console.log('error in =>', error);
    });
  }, [restaurant_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { table };
    const newRecord = async () => {
      let endpoint = `/restaurants/${restaurant_id}/tables`;
      await ApiService.apiPost(endpoint, data);
      setTable({ name: '' });

      fetchData(restaurant_id).catch(function (error) {
        console.log('error =>', error);
      });
    }

    newRecord()
    .catch(function (error) {
      console.log(error)
      const error_message = error.response.data.error.message;
      setErrorMessage(error_message);
    });
  }

  const handleChange = (e) => {
    setTable({...table, [e.target.name]: e.target.value});
    setErrorMessage('');
  }

  const renderTable = (table, index) => {
    return (
      <div key={index} className='border border-lime-600 rounded p-3'>
        {table.name}
      </div>
    )
  }

  return (
    <div>
      <div className='bg-gray-200 border rounded p-4 my-5'>
        <h1 className='font-bold'>Tables ({props.restaurant.number_of_tables})</h1>
      </div>

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

          {error_message && (
            <div className='text-red-500'>{error_message}</div>
          )}
        </form>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {tables && _.map(tables, renderTable)}
      </div>
    </div>
  )
}

export default TablesPage;