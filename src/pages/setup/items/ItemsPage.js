import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ApiService from '../../../services/api_service';
import _ from 'lodash';

import Modal from '../../../components/Modal';

function ItemsPage() {
  let params = useParams();
  const category_id = params['category_id'];
  const restaurant_id = params['restaurant_id'];

  // const queryParams = new URLSearchParams(window.location.search);
  // const category_name = queryParams.get("category_name");

  const [showModal, setShowModal] = React.useState(false);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = `/categories/${category_id}/items`;
      const data = await ApiService.apiGet(endpoint);
      setItems(data);
      let categoryEndpoint = `/restaurants/${restaurant_id}/categories/${category_id}`;
      const categoryData = await ApiService.apiGet(categoryEndpoint);
      setCategory(categoryData);
    }

    fetchData().catch(function (error) {
      console.log('error =>', error);
    });
  }, [category_id, restaurant_id]);

  const renderItem = (item, index) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.name_en}</td>
        <td></td>
        <td></td>
        <td>
          <button className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-1 px-4 rounded'>
            Edit
          </button>
        </td>
      </tr>
    )
  }

  return (
    <div>
      <div className='my-4'>
        <div className='flex w-full'>
          <div className='w-1/2'>
            <h1 className="text-3xl font-bold">
              <span className="text-slate-400">{category.restaurant_name}/</span>{category.name}
            </h1>
          </div>
          <div className='w-1/2 text-right'>
            <Modal
              buttonName={'+ Create new item'}
              title={'Modal Component'}
              showModal={showModal}
              setShowModal={setShowModal}>
              <p>
                I always felt like I could do anything. That’s the main
                thing people are controlled by! Thoughts- their perception
                of themselves! They're slowed down by their perception of
                themselves. If you're taught you can’t do anything, you
                won’t do anything. I was taught I could do everything.
              </p>
            </Modal>
          </div>
        </div>
      </div>

      <table className="border-collapse table-auto w-full">
        <thead className='text-left'>
          <tr>
            <th className='border-b bg-gray-200 dark:border-slate-600 font-medium p-3 text-slate-600 dark:text-slate-200'>Item Name</th>
            <th className='border-b bg-gray-200 dark:border-slate-600 font-medium p-3 text-slate-600 dark:text-slate-200'>Item Name (EN)</th>
            <th className='border-b bg-gray-200 dark:border-slate-600 font-medium p-3 text-slate-600 dark:text-slate-200'>Options</th>
            <th className='border-b bg-gray-200 dark:border-slate-600 font-medium p-3 text-slate-600 dark:text-slate-200'>Image</th>
            <th className='border-b bg-gray-200 dark:border-slate-600 font-medium p-3 text-slate-600 dark:text-slate-200'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(!_.isEmpty(items)) && _.map(items, renderItem)}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsPage;
