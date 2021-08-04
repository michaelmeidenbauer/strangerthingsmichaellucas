/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../api/api';
import MessageSeller from './MessageSeller';
import Loading from './Loading';

const SinglePost = ({ match }) => {
    const [singlePost, updateSinglePost] = useState(null);
    const [showMessageUI, updateShowMessageUI] = useState(false);
    const currentPostId = match.params.postID;
    useEffect(async () => {
        const localToken = JSON.parse(localStorage.getItem('strangersThingsToken')) ?? null;
        const downloadedPosts = await getAllPosts(localToken);
        const singledOutPost = downloadedPosts.filter(post => post._id === currentPostId)[0];
        updateSinglePost(singledOutPost);
    }, []);
    console.log('post deets: ', singlePost);

    if (!singlePost) {
        return (
            <Loading 
            contentType='post details'/>
        )
    }

    return (
        <>
            <div className="single-post">
                <h1>{singlePost.title}</h1>
                <h3 >Seller: {singlePost.author.username} Location: {singlePost.location}</h3>
                <h2 style={{ color: 'red' }}>Price: {singlePost.price}</h2>
                <p>{singlePost.description}</p>
                {
                    singlePost.messages.length > 0 &&
                    (
                        <>
                            <h3>Messages about this post:</h3>
                            {
                                singlePost.messages.map(message => (
                                    <div key={message._id}>
                                        <p><strong>From {message.fromUser.username}</strong>: {message.content}</p>
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
        {
    singlePost.isAuthor &&
        (
            <Link to={{
                pathname: `/posts/edit/${singlePost._id}`
            }}>Edit/Delete Post</Link>
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