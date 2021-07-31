/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../api/api';

const SinglePost = ({ match }) => {
    const [singlePost, updateSinglePost] = useState(null);
    const currentPostId = match.params.postID;
    useEffect(async () => {
        const downloadedPosts = await getAllPosts();
        const singledOutPost = downloadedPosts.filter(post => post._id === currentPostId)[0];
        updateSinglePost(singledOutPost);
    }, []);
    return (
        <>
            {
                singlePost &&
                (
                    <div className="single-post">
                        <h1>{singlePost.title}</h1>
                        <h3 >Seller: {singlePost.author.username} Location: {singlePost.location}</h3>
                        <h2 style={{ color: 'red' }}>{singlePost.price}</h2>
                        <p>{singlePost.description}</p>
                        <Link to={{
                            pathname: `/posts`
                        }}>Back to all posts</Link>
                    </div>
                )
            }
        </>
    )
};

// SinglePost.propTypes = {
//     match: PropTypes.shape({
//         params: PropTypes.shape({
//             postID: PropTypes.string.isRequired,
//         })
//     }).isRequired,
// };
export default SinglePost;