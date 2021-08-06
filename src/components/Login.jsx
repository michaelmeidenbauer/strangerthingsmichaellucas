import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  // getAllPosts,
  // registerUser,
  loginUser,
  // getMyInfo,
} from '../api/api';

const Login = (props) => {
  const [userName, updateUsername] = useState(null);
  const [passWord, updatePassword] = useState(null);
  const [loginFail, updateLoginFail] = useState(false);
  const [loginSuccess, updateLoginSuccess] = useState(false);
  
  const { updateIsLoggedIn } = props;

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const loginResult = await loginUser(userName, passWord);
    if (loginResult.success) {
      updateLoginFail(false);
      updateLoginSuccess(true);
      updateIsLoggedIn(true);
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
        placeholder="username"
        onChange={(event) => {
          event.preventDefault();
          updateUsername(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
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

Login.propTypes = {
  updateIsLoggedIn: PropTypes.func.isRequired,
}

export default Login;
