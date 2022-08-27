import React, { useState, useEffect } from 'react';
import ApiService from '../../../services/api_service';
import ErrorMessage from '../../../components/ErrorMessage';
import _ from 'lodash';

import Options from './Options';

export default function ItemForm(props) {
  const editItem = props.editItem;
  const category_id = editItem.category_id;
  const [error_message, setErrorMessage] = useState('');

  const default_option = [
    {
      name: '',
      name_en: '',
      need_to_choose: false,
      minimum_choose: 0,
      maximum_choose: '',
      sub_options_attributes: [
        { name: '', name_en: '', additional_price: 0 }
      ]
    }
  ]

  const default_sub_option = [
    { name: '', name_en: '', additional_price: 0 }
  ]

  const editOption = () => {
    const option_obj = editItem.options.map(option => {
      const sub_options = option.sub_options.map(sub_option => {
        return {
          name: sub_option.name,
          name_en: sub_option.name_en, 
          additional_price: sub_option.additional_price
        }
      });

      return {
        name: option.name,
        name_en: option.name_en,
        need_to_choose: option.need_to_choose,
        minimum_choose: option.minimum_choose,
        maximum_choose: option.maximum_choose,
        sub_options_attributes: sub_options
      }
    });
    return option_obj;
  }

  const [item, setItem] = useState({
    id: editItem.id || '',
    name: editItem.name || '',
    price: editItem.price || '',
    name_en: editItem.name_en || '',
    image_attributes: {
      file: ''
    },
    options_attributes: _.isEmpty(editItem.options) ? [] : editOption()
  });

  const handleSubmit = (event) => {
    console.log('handleSubmit')
    event.preventDefault();

    const updateData = async () => {
      let endpoint = `/categories/${category_id}/items`;
      let method = 'post';
      if (!_.isEmpty(editItem)) {
        endpoint = `/categories/${category_id}/items/${editItem.id}`;
        method = 'put';
      }

      const payload = { item: item };
      await ApiService.request(endpoint, method, payload);
      props.setShowModal(false);
    }

    updateData().catch(function (error) {
      const error_message = error.response.data.error.message;
      setErrorMessage(error_message);
    });
  }

  const handleChange = (e) => {
    setItem({...item, [e.target.name]: e.target.value});
    setErrorMessage('');
  }

  const handleAddOption = (item) => {
    const options = _.concat(item.options_attributes, default_option[0]);
    setItem({...item, 'options_attributes': options});
  }

  const handleChangeOption = (event, index) => {
    const updateOption = item.options_attributes.map((obj, inx) => {
      if (inx === index) {
        return {...obj, [event.target.name]: event.target.value};
      }
      // otherwise return object as is
      return obj;
    });
    setItem({...item, 'options_attributes': updateOption});
  }

  const handleAddSubOption = (option, option_index) => {
    const updateOption = item.options_attributes.map((option_obj, inx) => {
      if (option_index === inx) {
        const sub_options = _.concat(option_obj.sub_options_attributes, default_sub_option[0]);
        return {...option_obj, 'sub_options_attributes': sub_options};
      }
      // otherwise return object as is
      return option_obj;
    });
    setItem({...item, 'options_attributes': updateOption});
  }

  const handleChangeSubOption = (event, option_index, index) => {
    const updateSubOption = item.options_attributes.map((option_obj, inx) => {
      if (inx === option_index) {
        option_obj.sub_options_attributes.map((sub_option_obj, i) => {
          if (i === index) {
            const sub_obj = {...sub_option_obj, [event.target.name]: event.target.value};
            return {...option_obj, 'sub_options_attributes': sub_obj};
          }
        });
      }
      // otherwise return object as is
      return option_obj;
    });
    setItem({...item, 'options_attributes': updateSubOption});
  }

  const handleSetFlag = (event, index) => {
    console.log(event.target.name)
    const updateOption = item.options_attributes.map((obj, inx) => {
      if (inx === index) {
        return {...obj, [event.target.name]: true};
      } else {
        return {...obj, [event.target.name]: false};
      }
    });
    setItem({...item, 'options_attributes': updateOption});
  }

  return (
    <>
      {/*body*/}
      <form onSubmit={handleSubmit}>
        <div className="relative p-6 flex-auto text-left">
          <div className="text-slate-500 text-lg leading-relaxed">
            <div>
              {error_message && <ErrorMessage error_message={error_message} />}
            </div>

            <div className='flex'>
              <div className='w-1/2 mr-5'>
                <div className='text-gray-700 font-bold'>
                  ชื่อเมนู<span className='text-red-500 ml-1'>*</span>
                </div>
                <input 
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="name"
                  value={item.name || ''}
                  onChange={handleChange} />
              </div>
              <div className='w-1/2'>
                <div className='text-gray-700 font-bold'>
                  ชื่อเมนู (English)<span className='text-red-500 ml-1'>*</span>
                </div>
                <input 
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name_en"
                  name="name_en"
                  value={item.name_en || ''}
                  onChange={handleChange} />
              </div>
            </div>

            <Options
              item={item}
              handleAddOption={handleAddOption}
              handleChangeOption={handleChangeOption}
              handleAddSubOption={handleAddSubOption}
              handleChangeSubOption={handleChangeSubOption}
              handleSetFlag={handleSetFlag} />
          </div>
        </div>
        {/*footer*/}
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          {<button
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit">
            Save Changes
          </button>}
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => props.setShowModal(false)}>
            Close
          </button>
        </div>
      </form>
    </>
  );
}