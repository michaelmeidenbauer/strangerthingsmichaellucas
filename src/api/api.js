const apiPath = 'https://strangers-things.herokuapp.com/api/2104-web-pt/';

export const registerUser = async (userName, passWord) => {
  fetch(`${apiPath}users/register`, {
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
  }).then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
};

export const loginUser = async (userName, passWord) => {
  fetch(`${apiPath}users/login`, {
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
  }).then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
};

export const getMyInfo = async (token) => {
  fetch(`${apiPath}users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
};

export const getAllPosts = async () => {
  fetch('https://strangers-things.herokuapp.com/api/COHORT-NAME/posts')
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
};

export const createPost = async (title, description, price, location, willDeliver, token) => {
  fetch('https://strangers-things.herokuapp.com/api/COHORT-NAME/posts', {
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
  }).then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
};

export const fakeFunction = async () => {

};
