import React, { useState } from 'react';
import {
  getAllPosts,
  // registerUser,
  loginUser,
  // getMyInfo,
} from '../api/api';

const Login = () => {
  const [userName, updateUsername] = useState(null);
  const [passWord, updatePassword] = useState(null);
  console.log('pw: ', passWord, 'un: ', userName);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      loginUser(userName, passWord);
      getAllPosts();
    }}
    >
      <input
        type="text"
        defaultValue="enter username here"
        onChange={(event) => {
          event.preventDefault();
          updateUsername(event.target.value);
        }}
      />
      <input
        type="text"
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
    </form>
  );
};

export default Login;
