/* eslint-disable no-underscore-dangle */
export const fakeFunc = () => {

}
export const getPostByID = (posts, id) => {
    let returnPost = {};
    posts.forEach(post => {
        if (post._id === id){
            returnPost = {...post};
        }
    });
    return returnPost;
};

