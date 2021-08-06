/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../api/api';
import MessageSeller from './MessageSeller';
import Loading from './Loading';
import Message from './Message';

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

    if (!singlePost) {
        return (
            <Loading
                contentType='post details' />
        )
    }

    return (
        <>
            <Container>
                <Row>
                    <h1>{singlePost.title}</h1>
                </Row>
                <Row className="d.flex flex-row justify-content-center w-50 mx-auto">
                    <h4 >Seller: {singlePost.author.username}</h4>
                </Row>
                <Row className="d.flex flex-row justify-content-center w-50 mx-auto">
                    <h4>Location: {singlePost.location} ({singlePost.willDeliver ? 'Seller will deliver' : 'Seller will not deliver'})</h4>
                </Row>
                <Row>
                        <h4 style={{ color: 'red' }}>Price: {singlePost.price}</h4>
                </Row>
                <Row>
                    <h5>Item Description:</h5>
                    <p>{singlePost.description}</p>
                </Row>

                {
                    singlePost.messages.length > 0
                        &&
                        (
                            <>
                                <Row className="w-50 mx-auto">
                                    <h4>You have received {singlePost.messages.length} {singlePost.messages.length > 1 ? 'messages' : 'message'} about this post:</h4>
                                    {
                                        singlePost.messages.map(message => (
                                            <Message
                                                message={message}
                                            />
                                        ))
                                    }
                                </Row>
                            </>
                        )
                }
                <Row>
                    <Link to={{
                        pathname: `/posts`
                    }}>Back to all posts</Link>
                </Row>
                {
                    singlePost.isAuthor
                    ?
                    (
                        <Row>
                            <Link to={{
                                pathname: `/posts/edit/${singlePost._id}`
                            }}>Edit/Delete Post</Link>
                        </Row>

                    )
                    :
                    (
                    <>
                        <Row className="w-25 mx-auto mt-2">
                            <Button type="button" onClick={() => updateShowMessageUI(!showMessageUI)}>Message seller</Button>
                        </Row>
                            {
                                showMessageUI &&
                                (
                                    <Row>
                                        <MessageSeller
                                            seller={singlePost.author.username}
                                            postID={singlePost._id}
                                            updateShowMessageUI={updateShowMessageUI}
                                        />
                                    </Row>
                                )
                            }
                    </>
                    )
                }
            </Container>
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