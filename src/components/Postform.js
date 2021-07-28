import React, { useState } from 'react';
import {
  createPost,
} from '../api/api';

const Postform = () => {
  const [title, updateTitle] = useState(null);
  const [description, updateDescription] = useState(null);
  const [price, updatePrice] = useState(null);
  const [location, updateLocation] = useState(null);
  const [willDeliver, updateWillDeliver] = useState(false);
  
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
