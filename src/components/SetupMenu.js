import { Link } from 'react-router-dom';

const SetupMenu = () => {
  return (
    <div className='inline ml-10'>
      <Link to='/setup/restaurants' className='text-slate-600 hover:text-sky-500 mr-10'>Restaurants</Link>
      <Link to='/setup/restaurants' className='text-slate-600 hover:text-sky-500'>Contact Us</Link>
    </div>
  );
}

export default SetupMenu;
