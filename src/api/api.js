const apiPath = 'https://strangers-things.herokuapp.com/api/2104-web-pt/';

/**
 * This function takes in a users creds and gives back a users token
 * @param {string} userName 
 * @param {string} passWord 
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

/**
 * This function takes in a username and password and returns a success/failure
 * message, along with an authentication token upon successful login
 * @param {string} userName 
 * @param {string} passWord 
 * @returns 
 */
export const loginUser = async (userName, passWord) => {
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

  const fetchResult = await fetch(`${apiPath}users/login`, config);
  const json = await fetchResult.json();
  return json;
}

/**
 * This function takes in an authentication token and returns a user object,
 * which contains a 'posts' array of post objects, a 'messages' array of message
 * objects, the unique user '_id', and  the 'username'.
 * @param {string} token 
 * @returns 
 */
export const getMyInfo = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchResult = await fetch(`${apiPath}users/me`, config);
  const json = await fetchResult.json();
  return json;
};

/**
 * This functions takes in an authentication token and returns 'posts'
 * array of post objects. This includes all posts.
 * @param {string} token 
 * @returns 
 */
export const getAllPosts = async (token) => {
  // If token exists, add authorization to fetch body, else skip
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const fetchResult = await fetch(`${apiPath}posts`, config);
  const json = await fetchResult.json();
  return json.data.posts;
};
/**
 * This function takes in a title, description, price, location, willDeliver boolean,
 * and an authentication token. It returns a post object, which includes
 * a post _id, author object, description, isAuthor boolean, location,
 * message (array of message objects), price, title, willDeliver boolean,
 * active boolean, and createdAt and updatedAt time stamps.
 * @param {string} title 
 * @param {string} description 
 * @param {string} price 
 * @param {string} location 
 * @param {boolean} willDeliver 
 * @param {string} token 
 * @returns 
 */
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
