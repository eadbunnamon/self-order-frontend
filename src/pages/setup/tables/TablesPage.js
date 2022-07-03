import React, { useState, useEffect, useCallback } from 'react';
import ApiService from '../../../services/api_service';
import _ from 'lodash';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'

import ErrorMessage from '../../../components/ErrorMessage';
import NewTablePage from './NewTablePage';
import EditTablePage from './EditTablePage';

function TablesPage(props) {
  const restaurant_id = props.restaurant.id;

  const [error_message, setErrorMessage] = useState('');
  const [tables, setTables] = useState([]);
  const [mode, setMode] = useState({
    edit: false,
    id: ''
  });

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

  const handleDelete = (table) => {
    const deleteTable = async () => {
      let endpoint = `/restaurants/${restaurant_id}/tables/${table.id}`;
      await ApiService.apiDelete(endpoint);

      fetchData(restaurant_id).catch(function (error) {
        const error_message = error.response.data.error.message;
        setErrorMessage(error_message);
      });
    }

    deleteTable().catch(function (error) {
      const error_message = error.response.data.error.message;
      setErrorMessage(error_message);
    });
  }

  const handleSetMode = useCallback(
    (mode, table) => {
      setMode({
        edit: mode,
        id: table.id
      });
    }, []
  )

  const renderTable = (table, index) => {
    return (
      <div key={index} className='border border-lime-600 rounded p-3'>
        {mode.edit && mode.id === table.id ? (
          <EditTablePage
            restaurant_id={restaurant_id}
            table={table}
            handleSetMode={handleSetMode}
            handleReload={handleReload} />
        ) : (
        <div>
          <div className='font-bold text-gray-500'>{table.name}</div>
          <div className='align-right'>
            <TrashIcon
              onClick={() => {if(window.confirm('Delete the item?')) {handleDelete(table)}}}
              className="inline h-5 w-5 text-gray-500 hover:text-red-700 ml-2 float-right"/>

            <PencilIcon
              onClick={()=>{handleSetMode(true, table)}}
              className="inline h-5 w-5 text-gray-500 hover:text-blue-700 float-right" />
          </div>
        </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className='bg-gray-200 border rounded p-4 my-5'>
        <h1 className='font-bold'>Tables ({props.restaurant.number_of_tables})</h1>
      </div>

      <div>
        {error_message && <ErrorMessage error_message={error_message} />}
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