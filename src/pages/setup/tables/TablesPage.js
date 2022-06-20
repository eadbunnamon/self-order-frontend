import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import ApiService from '../../../services/api_service';
import _ from 'lodash';

function TablesPage(props) {
  const renderTable = (table, index) => {
    return (
      <div key={index} className='border border-lime-600 rounded p-3'>
        {table.name}
      </div>
    )
  }

  return (
    <div>
      <div className='flex w-full bg-gray-100 border rounded p-4 my-5'>
        <div className='w-1/2'>
          <h1>Tables ({props.restaurant.number_of_tables})</h1>
        </div>
        <div className='w-1/2 text-right'>
          <Link to={`/setup/edit_restaurant/${props.restaurant.id}`}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            + Create new Table
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {(!_.isEmpty(props.tables)) && _.map(props.tables, renderTable)}
      </div>
    </div>
  )
}

export default TablesPage;