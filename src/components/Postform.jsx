import React, { useState } from 'react';
import {
  createPost,
} from '../api/api';

const Postform = () => {
  const [title, updateTitle] = useState(null);
  const [description, updateDescription] = useState(null);
  const [price, updatePrice] = useState(null);
  const [location, updateLocation] = useState(null);
  const [willDeliver, updateWillDeliver] = useState(null);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      createPost(title, description, price, location, false, willDeliver);
    }}
    >
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
      <input
        type="text"
        defaultValue="will deliver"
        onChange={(event) => {
          event.preventDefault();
          updateWillDeliver(event.target.value);
        }}
      />
      <button
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Postform;
