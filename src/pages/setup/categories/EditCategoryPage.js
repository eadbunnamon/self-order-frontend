import React, { useState, useEffect } from 'react';

function EditCategoryPage(props) {
  console.log('props =>', props)
  const category = props.category;

  const handleSetMode = (mode, id) => {
    props.handleSetMode(mode, id);
  }

  return (
    <div>
      <div>{category.name}</div>
      <div className='text-slate-400'>({category.name_en})</div>

      <div className='flex mt-3'>
        <div className='w-1/2 text-slate-600'>
          {category.items_count} รายการ
        </div>
        <div className='w-1/2 text-right'>
          <button onClick={() => {handleSetMode(false, category.id)}} className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded'>
            บันทึก
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditCategoryPage;