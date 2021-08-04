/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListPost from './ListPost';
import Loading from './Loading';
import { getAllPosts } from '../api/api';

const Posts = () => {
    const [displayPosts, updateDisplayPosts] = useState([]);
    const [allPosts, updateAllPosts] = useState(null);
    const [searchTerm, updateSearchTerm] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [token, updateToken] = useState(null);
    useEffect(async () => {
        const localToken = JSON.parse(localStorage.getItem('strangersThingsToken')) ?? null;
        updateToken(localToken);
        const downloadedPosts = await getAllPosts(localToken);
        updateDisplayPosts(downloadedPosts);
        updateAllPosts(downloadedPosts);
    }, []);
    const searchHandler = (event) => {
        event.preventDefault();
                const results = allPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
                if (searchTerm) {
                    updateDisplayPosts(results);
                } else {
                    updateDisplayPosts(allPosts);
                }
    };

    if (!allPosts) {
        return (
            <Loading 
            contentType='posts'/>
        )
    }

    return (
        <Container className="content-align-center mx-auto">
            <form onSubmit={searchHandler}>
                <input type="text" onChange={event => updateSearchTerm(event.target.value)} />
                <button type="submit">Search</button>
                <button type="button" onClick={() => {
                    updateDisplayPosts(allPosts);
                    }}>Clear search</button>
            </form>
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