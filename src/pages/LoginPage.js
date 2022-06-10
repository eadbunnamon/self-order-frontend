import React, {useState} from 'react';

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
    <div id='LoginPage'>
      <div>
        {error_message && <ErrorMessage error_message={error_message}/>}
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>ชื่อเข้าใช้</label>
            </div>
            <div>
              <input type="text"
                 className="form-control"
                 id="username"
                 name="username"
                 placeholder="ชื่อเข้าใช้"
                 onChange={handleChange} />
            </div>
          </div>

          <div>
            <div>
              <label>รหัสผ่าน</label>
            </div>
            <div>
              <input type="password"
                 className="form-control"
                 id="password"
                 name="password"
                 placeholder="รหัสผ่าน"
                 onChange={handleChange} />
            </div>
          </div>

          <div>
            <button type='submit' className='btn btn-primary'>เข้าสู่ระบบ</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;
