import React, {useState} from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import RegisterFormStyles from "./registerform.module.scss";
const RegisterForm = props =>{

  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name
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
  <div className={RegisterFormStyles.loginform}>
    <div className={RegisterFormStyles.wrapper}>
    
      <form noValidate onSubmit={handleSubmit}>
        <ul className={RegisterFormStyles.wrapper}>
          <li className={RegisterFormStyles.formrow}>
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
          <li className={RegisterFormStyles.formrow}>
          <input id="password"
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </li>

           <li className={RegisterFormStyles.formrow}>
          <input id="name"
            placeholder="name"
            type="name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li className={RegisterFormStyles.formrow}>
            <button type="submit" >Register</button>
            
          </li>
        </ul>
      </form>
    
    </div>
  </div>
);
};
export default RegisterForm
