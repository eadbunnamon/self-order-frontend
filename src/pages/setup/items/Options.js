import React from 'react';
import _ from 'lodash';

import SubOptions from './SubOptions';

export default function Options(props) {
  const item = props.item;
  const options = item.options_attributes;

  const renderOption = (option, index) => {
    return (
      <div key={index} className='border border-2 mb-4 border-blue-500 rounded'>
        <div className='font-bold bg-gray-300 p-2'>{`Option #${index + 1}`}</div>

        <div className='flex bg-gray-200 p-3'>
          <div className='w-1/2'>
            <div className='mb-3'>
              <div className='text-gray-700 font-bold'>
                ชื่อตัวเลือก<span className='text-red-500 ml-1'>*</span>
              </div>
              <input type='text'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={`name_${index}`}
                name="name"
                value={option.name || ''}
                onChange={(e) => props.handleChangeOption(e, index)} />
            </div>
            <div>
              <div className='text-gray-700 font-bold'>
                ชื่อตัวเลือก (English)<span className='text-red-500 ml-1'>*</span>
              </div>
              <input type='text'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={`name_en_${index}`}
                name="name_en"
                value={option.name_en || ''}
                onChange={(e) => props.handleChangeOption(e, index)} />
            </div>
          </div>

          <div className='w-1/2 ml-5'>
            <div className='mb-3'>
              <div className='text-gray-700 font-bold'>
                Need to choose
              </div>
              <input
                type='checkbox'
                checked={option.need_to_choose}
                id={`need_to_choose_${index}`}
                name="need_to_choose"
                className='mt-3 mb-4'
                onChange={(e) => props.handleSetFlag(e, index)} />
            </div>

            <div className='flex'>
              <div className='w-1/2 mr-2'>
                <div className='mb-3'>
                  <div className='text-gray-700 font-bold'>
                    Minimum choose<span className='text-red-500 ml-1'>*</span>
                  </div>
                  <input type='integer'
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`minimum_choose_${index}`}
                    name="minimum_choose"
                    value={option.minimum_choose || 0}
                    onChange={(e) => props.handleChangeOption(e, index)} />
                </div>
              </div>
              <div className='w-1/2 ml-2'>
                <div className='mb-3'>
                  <div className='text-gray-700 font-bold'>
                    Maximum choose
                  </div>
                  <input type='integer'
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`maximum_choose_${index}`}
                    name="maximum_choose"
                    value={option.maximum_choose || ''}
                    onChange={(e) => props.handleChangeOption(e, index)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <SubOptions {...props} option={option} option_index={index} />
      </div>
    );
  }

  return (
    <div>
      <div className='mt-3'>
        <label className='font-bold text-gray-600'>Options</label>
      </div>

      {(!_.isEmpty(options)) && _.map(options, renderOption)}

      <div className='flex mt-5'>
        <div className='w-1/1'>
          <button
            onClick={() => props.handleAddOption(item)}
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white px-2 rounded">
            + Option
          </button>
        </div>
      </div>
    </div>
  )
};