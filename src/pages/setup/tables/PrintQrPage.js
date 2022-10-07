import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import _ from 'lodash';
import ApiService from '../../../services/api_service';
import config from '../../../config';

function PrintQrPage(props) {
  let params = useParams();
  const restaurant_id = params['id'];
  const table_id = params['table_id'] || '';

  const [tables, setTables] = useState([]);

  const fetchData = async (restaurant_id, table_id) => {
    const endpoint = `/restaurants/${restaurant_id}/tables?filter[table_id]=${table_id}`;
    const data = await ApiService.apiGet(endpoint);
    await setTables(data);
  }

  useEffect(() => {
    fetchData(restaurant_id, table_id).catch(function (error) {
      console.log('error in =>', error);
    });
  }, [restaurant_id, table_id]);

  const renderTableQRCode = (table, index) => {
    const url = `${config.baseUrl}/self-order/${restaurant_id}/table_id/${table.id}/orders`;
    return (
      <div key={index} className='border border-lime-600 rounded p-3 text-center'>
        <div className='font-bold mb-5'>{table.name}</div>
        <div className='flex'>
          <div className='ml-auto mr-auto mb-5'>
            <QRCode value={url} />
          </div>
        </div>
        <div className='text-center'>
          <p>Wifi: xxxx</p>
          <p>Wifi Password: xxxx-1</p>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 gap-4 mt-6'>
      {tables && _.map(tables, renderTableQRCode)}
    </div>
  )
}

export default PrintQrPage;
