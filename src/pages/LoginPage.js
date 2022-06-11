import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import LoginSession from '../stores/LoginSession';
import ErrorMessage from '../components/ErrorMessage';

// import './LoginPage.css'

function LoginPage() {
  const [signinValues, setSigninValues] = useState({
    username: '',
    password: ''
  });

  const [error_message, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    LoginSession.login(signinValues.username, signinValues.password).then(()=> {
      window.location.href = '/';
    }, function(error) {
      var error_message = error.response.data.errors[0];
      setErrorMessage(error_message);
    })
  }

  const handleChange = (e) => {
    setSigninValues({...signinValues, [e.target.name]: e.target.value});
    setErrorMessage('');
  }

  return (
    <div>
      <header className='py-4 sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent py-4'>
        <div className='flex w-full'>
          <div className='w-1/3 mx-4'>
            <Link to='/' className='hover:text-sky-500 dark:hover:text-sky-400'>Logo</Link>
          </div>
          <div className='w-1/3 mx-4 text-center mr-auto'><h1>Self-Order</h1></div>
        </div>
      </header>
      <div id='LoginPage' className='flex flex-wrap pt-6'>
        <div class="w-1/3 ml-auto mr-auto">
          <div>
            {error_message && <ErrorMessage error_message={error_message}/>}
          </div>

          <div className='w-full'>
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                  ชื่อเข้าใช้
                </label>
                <input 
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  name="username"
                  placeholder="ชื่อเข้าใช้"
                  onChange={handleChange} />
              </div>

              <div className='mb-4'>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                    รหัสผ่าน
                  </label>
                </div>
                <div>
                  <input type="password"
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     id="password"
                     name="password"
                     placeholder="รหัสผ่าน"
                     onChange={handleChange} />
                  {/*<p class="text-red-500 text-xs italic">Please choose a password.</p>*/}
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>เข้าสู่ระบบ</button>
                <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
