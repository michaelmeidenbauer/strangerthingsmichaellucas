import React, { useState, useEffect } from 'react';
import { Redirect} from 'react-router-dom';
import {
  createPost,
} from '../api/api';

const Postform = () => {
  const [title, updateTitle] = useState(null);
  const [description, updateDescription] = useState(null);
  const [price, updatePrice] = useState(null);
  const [location, updateLocation] = useState(null);
  const [willDeliver, updateWillDeliver] = useState(false);
  const [token, updateToken] = useState(null);
  const [submitSuccess, updateSubmitSuccess] = useState(false);
  const [submitFail, updateSubmitFail] = useState(false);
    useEffect(() => {
        const localToken = JSON.parse(localStorage.getItem('strangersThingsToken')) ?? null;
        updateToken(localToken);
    }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const postCreationSuccess = await createPost(
        title,
        description,
        price,
        location,
        willDeliver,
        token,
      );
      if (postCreationSuccess.success) {
        updateSubmitSuccess(true);
    } else {
      updateSubmitFail(true);
    }
    } catch (error) {
      console.error(error);
    }
  };

  if (submitSuccess) {
    return <Redirect to="/posts" />
  }

  return (
    <>
    <form onSubmit={formSubmitHandler}>
      <input
        type="text"
        defaultValue="title"
        onChange={(event) => {
          event.preventDefault();
          updateTitle(event.target.value);
        }}
      />
      <input
        type="text"
        defaultValue="description here"
        onChange={(event) => {
          event.preventDefault();
          updateDescription(event.target.value);
        }}
      />
      <input
        type="text"
        defaultValue="price"
        onChange={(event) => {
          event.preventDefault();
          updatePrice(event.target.value);
        }}
      />
      <input
        type="text"
        defaultValue="location"
        onChange={(event) => {
          event.preventDefault();
          updateLocation(event.target.value);
        }}
      />
      <div className="checkbox">
      <span>Will deliver?</span>
      <input
        type="checkbox"
        defaultValue="will deliver"
        name="willDeliver?"
        onChange={() => {
          updateWillDeliver(!willDeliver);
        }}
      />
      </div>
      <button
        type="submit"
      >
        Submit
      </button>
    </form>
    {
      submitFail && (
        <p style={{color: 'red'}}>Post submission failed. Please login or register to create posts.</p>
      )
    }
    </>
  );
};

export default Postform;
