import React from 'react';
import _ from 'lodash';

export default function Options(props) {
  const item = props.item;
  const options = item.options_attributes;

  const renderOption = (option, index) => {
    return (
      <div key={index} className='flex mb-3'>
        <div className='w-1/3'>
          <input type='text'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`size_${index}`}
            name="size"
            value={option.size || ''}
            onChange={(e) => props.handleChangeOption(e, index)} />
        </div>
        <div className='w-1/3 px-3'>
          <input type='text'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`price_${index}`}
            name="price"
            value={option.price || ''}
            onChange={(e) => props.handleChangeOption(e, index)} />
        </div>
        <div className='w-1/3'>
          <input
            type='radio'
            checked={option.is_default}
            id={`is_default_${index}`}
            name="is_default"
            onChange={(e) => props.handleSetDefault(e, index)} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='mt-3'>
        <label className='font-bold text-gray-600'>Options</label>
      </div>
      <div className='flex text-gray-500 mb-3'>
        <div className='w-1/3 font-bold'>Size</div>
        <div className='w-1/3 px-3 font-bold'>Price</div>
        <div className='w-1/3 font-bold'>Is default</div>
      </div>

      {(!_.isEmpty(options)) && _.map(options, renderOption)}

      <div className='flex mt-3'>
        <div className='w-1/1'>
          <button
            onClick={() => props.handleAddOption(item)}
            type="button"
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold px-2 rounded">
            + Option
          </button>
        </div>
      </div>
    </div>
  )
};