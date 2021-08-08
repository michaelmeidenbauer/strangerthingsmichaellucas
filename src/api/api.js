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

/**
 * This function takes in a username and password and returns a success/failure
 * message, along with an authentication token upon successful login
 * @param {*} userName 
 * @param {*} passWord 
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
 * @param {*} token 
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
 * @param {*} token 
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
 * @param {*} title 
 * @param {*} description 
 * @param {*} price 
 * @param {*} location 
 * @param {*} willDeliver 
 * @param {*} token 
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

/**
 * 
 * @param {string} title Post title as updated in the EditPost component at /posts/edit/<postID>
 * @param {string} description Post description as updated in the EditPost component at /posts/edit/<postID>
 * @param {string} price Post title as updated in the EditPost component at /posts/edit/<postID>
 * @param {string} location Post title as updated in the EditPost component at /posts/edit/<postID>
 * @param {boolean} willDeliver Post title as updated in the EditPost component at /posts/edit/<postID>
 * @param {string} token Post title as updated in the EditPost component at /posts/edit/<postID>
 * @param {string} postIDPost title as updated in the EditPost component at /posts/edit/<postID>
 */
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

/**
 * 
 * @param {string} title the title of the post
 * @param {string} description the description of the post
 * @param {string} price the price of the post item
 * @param {string} location the location of the post
 * @param {boolean} willDeliver the boolean representing whether the user will deliver the item
 * @param {string} token the user's JWT
 * @param {string} postID the ID of the post to be deleted
 */
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

/**
 * 
 * @param {string} content the content of the message as entered by the user
 * @param {string} postID the ID of the post that the message should be attached to
 * @param {string} token the user's JWT
 */
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
