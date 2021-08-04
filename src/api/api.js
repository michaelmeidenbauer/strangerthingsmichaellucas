const apiPath = 'https://strangers-things.herokuapp.com/api/2104-web-pt/';

export const registerUser = async (userName, passWord) => {
  const fetchResult = await fetch(`${apiPath}users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username: userName,
        password: passWord,
      },
    }),
  });
  const json = await fetchResult.json();
  return json;
};

export const loginUser = async (userName, passWord) => {
  const fetchResult = await fetch(`${apiPath}users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username: userName,
        password: passWord,
      },
    }),
  });
  const json = await fetchResult.json();
  return json;
};

export const getMyInfo = async (token) => {
  const fetchResult = await fetch(`${apiPath}users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await fetchResult.json();
  return json;
};

export const getAllPosts = async (token) => {
  const fetchResult = await fetch(`${apiPath}posts`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await fetchResult.json();
  console.log('posts: ',json.data.posts);
  return json.data.posts;
};

export const createPost = async (title, description, price, location, willDeliver, token) => {
  const fetchResult = await fetch(`${apiPath}posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title,
        description,
        price,
        location,
        willDeliver,
      },
    }),
  });
  const json = await fetchResult.json();
  return json;
};

export const editPost = async (title, description, price, location, willDeliver, token, postID) => {
  const fetchResult = await fetch(`${apiPath}posts/${postID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title,
        description,
        price,
        location,
        willDeliver,
      },
    }),
  });
  const json = await fetchResult.json();
  return json;
};

export const deletePost = async (title,
  description,
  price,
  location,
  willDeliver,
  token,
  postID) => {
  const fetchResult = await fetch(`${apiPath}posts/${postID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title,
        description,
        price,
        location,
        willDeliver,
      },
    }),
  });
  const json = await fetchResult.json();
  return json;
};

export const addMessageToPost = async (content, postID, token) => {
  const fetchResult = await fetch(`${apiPath}posts/${postID}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: {
        content,
      },
    }),
  });
  const json = await fetchResult.json();
  return json;
};
