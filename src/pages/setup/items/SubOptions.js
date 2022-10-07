import React from 'react';
import _ from 'lodash';
import { TrashIcon } from '@heroicons/react/solid';

// import { ChevronDoubleRightIcon } from '@heroicons/react/solid';

export default function SubOptions(props) {
  const option = props.option;
  const sub_options = option.sub_options_attributes;

  const renderSubOption = (sub_option, index) => {
    return (
      <div key={index} className={`${sub_option._destroy && 'hidden'}`}>
        <div className='flex mb-3'>
          <div className='w-1/3 mr-3'>
            <input type='text'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`name_${index}`}
              name="name"
              value={sub_option.name || ''}
              onChange={(e) => props.handleChangeSubOption(e, props.option_index, index)} />
          </div>
          <div className='w-1/3 mr-3'>
            <input type='text'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`name_en_${index}`}
              name="name_en"
              value={sub_option.name_en || ''}
              onChange={(e) => props.handleChangeSubOption(e, props.option_index, index)} />
          </div>
          <div className='w-1/3 mr-3'>
            <div className='flex'>
              <div className='w-1/2 mr-3'>
                <input type='integer'
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`additional_price_${index}`}
                  name="additional_price"
                  value={sub_option.additional_price || ''}
                  onChange={(e) => props.handleChangeSubOption(e, props.option_index, index)} />
              </div>
              <div className='w-1/2 mr-3'>
                <TrashIcon
                  onClick={() => { props.handleDeleteSubOption(option, props.option_index, sub_option, index) }}
                  className='h-5 w-5 mt-3 ml-6 text-gray-500 hover:text-gray-700' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <div>
        <label className='font-bold text-gray-600'>
          Sub Options
        </label>
      </div>

      <div className='flex text-gray-500 mb-3'>
        <div className='w-1/3 mr-3 font-bold'>Name</div>
        <div className='w-1/3 mr-3 font-bold'>Name EN</div>
        <div className='w-1/3 font-bold'>Additional Price</div>
      </div>

      {(!_.isEmpty(sub_options)) && _.map(sub_options, renderSubOption)}

      <div className='flex mt-5'>
        <div className='w-1/1'>
          <button
            onClick={() => props.handleAddSubOption(option, props.option_index)}
            type="button"
            className="bg-gray-400 hover:bg-gray-600 text-white px-2 rounded">
            + Sub Option
          </button>
        </div>
      </div>
    </div>
  )
};