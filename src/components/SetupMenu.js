import { Link } from 'react-router-dom';

const SetupMenu = () => {
  return (
    <div className='w-1/5'>
      <table className="w-full border-separate border-spacing-2 border border-slate-400 text-center">
        <thead>
          <tr>
            <th className="border border-slate-300">Menus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-300">
              <Link to='/setup/restaurants' className='hover:text-sky-500'>Restaurants</Link>
            </td>
          </tr>
          <tr>
            <td className="border border-slate-300 hover:text-sky-500">Contact Us</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SetupMenu;
