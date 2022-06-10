import React, {useState} from 'react';

import LoginSession from '../stores/LoginSession';
import ErrorMessage from '../components/ErrorMessage';

// import './LoginPage.css'

function LoginPage() {
  const [signinValues, setSigninValues] = useState({
    username: '',
    password: ''
  });

  const [error_message, setErrorMessage] = useState(0);

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
      <div className='col-md-9 mr-auto error_message_navigation'>
        {error_message && <ErrorMessage error_message={error_message}/>}
      </div>

      <div className='row'>
        <div className='col-md-8'>
          <form onSubmit={handleSubmit}>
            <div className='row form-group'>
              <div className='col-md-2 text-right'>
                <label className='my-1'>ชื่อเข้าใช้</label>
              </div>
              <div className='col-md-5'>
                <input type="text"
                   className="form-control"
                   id="username"
                   name="username"
                   placeholder="ชื่อเข้าใช้"
                   onChange={handleChange} />
              </div>
            </div>

            <div className='row form-group'>
              <div className='col-md-2 text-right'>
                <label className='my-1'>รหัสผ่าน</label>
              </div>
              <div className='col-md-5'>
                <input type="password"
                   className="form-control"
                   id="password"
                   name="password"
                   placeholder="รหัสผ่าน"
                   onChange={handleChange} />
              </div>
            </div>

            <div className='row form-group'>
              <div className='col-md-2'></div>
              <div className='col-md-5'>
                <button type='submit' className='btn btn-primary'>เข้าสู่ระบบ</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
