import React, {useState} from 'react';
import { adminApi } from '../../../api';

import ErrorMessage from '../../../components/ErrorMessage';

function RestaurantForm() {
  const [restaurantValues, setRestaurantValues] = useState({
    name: '',
    name_en: '',
    open_time: '',
    close_time: '',
    day_off_description: '',
    day_off_description_en: '',
    // restaurant_type_id: ''
  });

  const [error_message, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: restaurantValues.name,
      name_en: restaurantValues.name_en,
      open_time: restaurantValues.open_time,
      close_time: restaurantValues.close_time,
      day_off_description: restaurantValues.day_off_description,
      day_off_description_en: restaurantValues.day_off_description_en
    };

    adminApi.request({
      method: 'post',
      url: '/restaurants',
      data: { restaurant: data }
    }).then(function (response) {
      console.log(response);
      window.location.href = '/setup/restaurants';
    })
    .catch(function (error) {
      console.log(error);
      const error_message = error.response.data.error.message;
      setErrorMessage(error_message);
    });
  }

  const handleChange = (e) => {
    setRestaurantValues({...restaurantValues, [e.target.name]: e.target.value});
    setErrorMessage('');
  }

  return (
    <div>
      <div className='mb-4'>
        <h1 className="text-3xl font-bold underline">+ Create new restaurant</h1>
      </div>

      <div>
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            {error_message && <ErrorMessage error_message={error_message} />}
          </div>

          <form onSubmit={handleSubmit}>
            {/*<div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                ประเภท *
              </label>
              <input 
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                placeholder="ชื่อร้าน"
                onChange={handleChange} />
            </div> <-- No this feature at the moment -->*/}

            <div  className='flex'>
              <div className='w-1/2 mr-5'>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    ชื่อร้าน *
                  </label>
                  <input 
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    placeholder="ชื่อร้าน"
                    onChange={handleChange} />
                </div>
              </div>
              <div className='w-1/2'>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name_en">
                    ชื่อร้าน (ภาษาอังกฤษ) *
                  </label>
                  <input 
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name_en"
                    name="name_en"
                    placeholder="Restaurant name"
                    onChange={handleChange} />
                </div>
              </div>
            </div>

            <div  className='flex'>
              <div className='w-1/2 mr-5'>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="open_time">
                    เวลาร้านเปิด
                  </label>
                  <input 
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="open_time"
                    name="open_time"
                    placeholder="เวลาร้านเปิด เช่น จันทร์-ศุกร์ เปิด 09:00 น. เสาร์-อาทิตย์ 10:00 น."
                    onChange={handleChange} />
                </div>
              </div>
              <div className='w-1/2'>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="close_time">
                    เวลาร้านเปิด
                  </label>
                  <input 
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="close_time"
                    name="close_time"
                    placeholder="เวลาร้านปิด เช่น จันทร์-ศุกร์ เปิด 21:00 น. เสาร์-อาทิตย์ 23:00 น."
                    onChange={handleChange} />
                </div>
              </div>
            </div>

            <div  className='flex'>
              <div className='w-1/2 mr-5'>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="day_off_description">
                    ข้อมูลวันหยุด
                  </label>
                  <input 
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="day_off_description"
                    name="day_off_description"
                    placeholder="วันหยุด เช่น หยุดทุกวันจันทร์"
                    onChange={handleChange} />
                </div>
              </div>
              <div className='w-1/2'>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="day_off_description_en">
                    Day off description
                  </label>
                  <input 
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="day_off_description_en"
                    name="day_off_description_en"
                    placeholder="Day off e.g. close every Monday"
                    onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>บันทึก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RestaurantForm;
