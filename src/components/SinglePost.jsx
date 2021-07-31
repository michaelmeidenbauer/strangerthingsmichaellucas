/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../api/api';
import MessageSeller from './MessageSeller';

const SinglePost = ({ match }) => {
    const [singlePost, updateSinglePost] = useState(null);
    const [showMessageUI, updateShowMessageUI] = useState(false);
    const currentPostId = match.params.postID;
    useEffect(async () => {
        const downloadedPosts = await getAllPosts();
        const singledOutPost = downloadedPosts.filter(post => post._id === currentPostId)[0];
        updateSinglePost(singledOutPost);    
    }, []);
    console.log(singlePost);
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
                        {
                            singlePost.messages.length > 0 &&
                            (
                                <>
                                <h4>Comments on this post:</h4>
                                {
                                singlePost.messages.map(message => (
                                    <div key={message._id}>
                                    <p>{message.content}</p>
                                    </div>
                                ))
                                }
                                </>
                            )
                        }
                        <Link to={{
                            pathname: `/posts`
                        }}>Back to all posts</Link>
                        <button type="button" onClick={() => updateShowMessageUI(!showMessageUI)}>Message seller</button>
                        {
                            showMessageUI &&
                            <MessageSeller
                            seller={singlePost.author.username}
                            postID={singlePost._id}
                            updateShowMessageUI={updateShowMessageUI}
                            />
                        }
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