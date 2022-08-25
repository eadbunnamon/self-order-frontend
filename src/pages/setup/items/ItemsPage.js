import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ApiService from '../../../services/api_service';
import _ from 'lodash';

import Modal from '../../../components/Modal';
import ItemForm from './ItemForm';

function ItemsPage() {
  let params = useParams();
  const category_id = params['category_id'];
  const restaurant_id = params['restaurant_id'];

  // const queryParams = new URLSearchParams(window.location.search);
  // const category_name = queryParams.get("category_name");

  const [showModal, setShowModal] = React.useState(false);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState({});
  const [editItem, setEditItem] = useState({});

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
          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => openItemForm(item)}>
            Edit
          </button>
        </td>
      </tr>
    )
  }

  const openItemForm = (item = {}) => {
    const fetchItem = async () => {
      let endpoint = `/categories/${category_id}/items/${item.id}`;
      const data = await ApiService.apiGet(endpoint);
      setEditItem(data);
      setShowModal(true);
    }

    fetchItem().catch(function (error) {
      console.log('error =>', error);
    });
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
            <button
              className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => openItemForm()}>
              {'+ Create new item'}
            </button>
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

      <Modal
        title={'Modal Component'}
        showModal={showModal}
        setShowModal={setShowModal}>
        <ItemForm
          category_id={category_id}
          editItem={editItem}
          setShowModal={setShowModal} />
      </Modal>
    </div>
  );
};

export default ItemsPage;
