const apiPath = 'https://strangers-things.herokuapp.com/api/2104-web-pt/';

/**
 * This function takes in a users creds and gives back a users token
 * @param {*} userName 
 * @param {*} passWord 
 * @returns 
 */
export const registerUser = async (userName, passWord) => {
  const body = {
    user: {
      username: userName,
      password: passWord,
    },
  };

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const fetchResult = await fetch(`${apiPath}users/register`, config);
  const json = await fetchResult.json();
  return json;
};

export const loginUser = async (userName, passWord) => {
  const fetchResult = await fetch(`${apiPath}users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await fetchResult.json();
  return json;
};

export const getAllPosts = async (token) => {
  // If token exists, add authorization to fetch body, else skip

  const fetchResult = await fetch(`${apiPath}posts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await fetchResult.json();
  return json.data.posts;
};

export const createPost = async (title, description, price, location, willDeliver, token) => {

  const body = {
    post: {
      title,
      description,
      price,
      location,
      willDeliver,
    },
  };

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };
  
  const fetchResult = await fetch(`${apiPath}posts`, config);
  const json = await fetchResult.json();
  return json;
};

export const editPost = async (title, description, price, location, willDeliver, token, postID) => {

  const body = {
    post: {
      title,
      description,
      price,
      location,
      willDeliver,
    },
  };

  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  const fetchResult = await fetch(`${apiPath}posts/${postID}`, config);
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
  const body = {
    post: {
      title,
      description,
      price,
      location,
      willDeliver,
    },
  };

  const config = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };



  const fetchResult = await fetch(`${apiPath}posts/${postID}`, config);
  const json = await fetchResult.json();
  return json;
};

export const addMessageToPost = async (content, postID, token) => {
  const body = {
    message: {
      content,
    },
  };

  const config = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };


  const fetchResult = await fetch(`${apiPath}posts/${postID}/messages`, config);
  const json = await fetchResult.json();
  return json;
};
