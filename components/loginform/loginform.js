import React, {useState} from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import LoginFormStyles from "./loginform.module.scss";
const LoginForm = props =>{

  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, {expires: 2});
          Router.push('/');
        }
      }
    );
  }
return (
  <div className={LoginFormStyles.loginform}>
    <div className={LoginFormStyles.wrapper}>
    
      <form noValidate onSubmit={handleSubmit}>
        <ul className={LoginFormStyles.wrapper}>
          <li className={LoginFormStyles.formrow}>
          <input
            id="email"
            placeholder="Email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </li>
          <li className={LoginFormStyles.formrow}>
          <input id="password"
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li className={LoginFormStyles.formrow}>
            <button type="submit" >Login</button>
            
          </li>
        </ul>
      </form>
    
    </div>
  </div>
);
};
export default LoginForm
