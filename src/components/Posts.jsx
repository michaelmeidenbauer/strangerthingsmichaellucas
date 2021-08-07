/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListPost from './ListPost';
import Loading from './Loading';
import PostSearch from './PostSearch';
import { getAllPosts } from '../api/api';

const Posts = () => {
    const [displayPosts, updateDisplayPosts] = useState([]);
    const [allPosts, updateAllPosts] = useState(null);
    
    const [token, updateToken] = useState(null);

    useEffect(async () => {
      const localToken =
        JSON.parse(localStorage.getItem("strangersThingsToken")) ?? null;

      updateToken(localToken);
      const downloadedPosts = await getAllPosts(localToken);
      updateDisplayPosts(downloadedPosts);
      updateAllPosts(downloadedPosts);
    }, []);
    

    if (!allPosts) {
        return (
            <Loading 
            contentType='posts'/>
        )
    }

    return (
        <Container className="content-align-center mx-auto mt-3">
            <PostSearch 
            allPosts={allPosts}
            updateDisplayPosts={updateDisplayPosts}
            />
            {
                token &&
                (<Link to={{
                    pathname: `/posts/add`
                }}>Add Post</Link>)

            }
            <Container>
                {
                    displayPosts.map(post => (
                        <div key={post._id}>
                            <ListPost post={post} />
                        </div>
                    ))
                }
            </Container>
        </Container>
    )
};

export default Posts