import { Link } from 'react-router-dom';

const SetupMenu = () => {
  return (
    <div className='pl-5 w-1/5'>
      <ul className='text-base'>
        <li className='mb-3'>
          <Link to='/setup/restaurants' className='text-slate-600 hover:text-sky-500'>Restaurants</Link>
        </li>
        <li className='text-slate-600'>Contact Us</li>
      </ul>
    </div>
  );
}

export default SetupMenu;
