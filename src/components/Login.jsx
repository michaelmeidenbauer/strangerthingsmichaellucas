import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  // getAllPosts,
  // registerUser,
  loginUser,
  // getMyInfo,
} from '../api/api';

const Login = () => {
  const [userName, updateUsername] = useState(null);
  const [passWord, updatePassword] = useState(null);
  const [loginFail, updateLoginFail] = useState(false);
  const [loginSuccess, updateLoginSuccess] = useState(false);
  console.log('un: ', userName, 'pw: ', passWord);

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const loginResult = await loginUser(userName, passWord);
    console.log(loginResult);
    if (loginResult.success) {
      updateLoginFail(false);
      updateLoginSuccess(true);
      const { data: { token } } = loginResult;
      const stringToken = JSON.stringify(token);
      localStorage.setItem('strangersThingsToken', stringToken);
    } else {
      updateLoginSuccess(false);
      updateLoginFail(true);
    }
  };

  return (
    <form onSubmit={loginSubmitHandler}>
      <input
        type="text"
        defaultValue="enter username here"
        onChange={(event) => {
          event.preventDefault();
          updateUsername(event.target.value);
        }}
      />
      <input
        type="password"
        defaultValue="enter password here"
        onChange={(event) => {
          event.preventDefault();
          updatePassword(event.target.value);
        }}
      />
      <button
        type="submit"
      >
        Login
      </button>
      {
        loginFail && (
            <div className="loginFail">
              <p style={{ color: 'red' }}>Incorrect username/password. Please try again.</p>
            </div>
          )
      }
      {
        loginSuccess && (
          <Redirect to="/" />
          )
      }
    </form>
  );
};

export default Login;
