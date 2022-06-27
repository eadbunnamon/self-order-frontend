import React, { useState, useEffect } from 'react';
import ApiService from '../../../services/api_service';
import _ from 'lodash';

import NewTablePage from './NewTablePage';

function TablesPage(props) {
  const restaurant_id = props.restaurant.id;

  const [tables, setTables] = useState([]);

  const fetchData = async (restaurant_id) => {
    let endpoint = '/restaurants/' + restaurant_id + '/tables';
    const data = await ApiService.apiGet(endpoint);
    await setTables(data);
  }

  useEffect(() => {
    fetchData(restaurant_id).catch(function (error) {
      console.log('error in =>', error);
    });
  }, [restaurant_id]);

  const handleReload = () => {
    fetchData(restaurant_id).catch(function (error) {
      console.log('error in =>', error);
    });
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

      <NewTablePage
        restaurant_id={restaurant_id}
        handleReload={handleReload} />

      <div className="grid grid-cols-4 gap-4 mt-6">
        {tables && _.map(tables, renderTable)}
      </div>
    </div>
  )
}

export default TablesPage;