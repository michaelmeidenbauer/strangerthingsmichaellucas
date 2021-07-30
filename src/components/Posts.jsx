/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import ListPost from './ListPost';
import { getAllPosts } from '../api/api';

const Posts = () => {
    const [allPosts, updateAllPosts] = useState([]);
    useEffect(async () => {
        const downloadedPosts = await getAllPosts();
        updateAllPosts(downloadedPosts);
    }, []);

    return (
        <>
            {
                allPosts.map(post => (
                        <div key={post._id}>
                            <ListPost post ={post}/> 
                        </div>
                    )
                )
            }
        </>
    )
}

export default Posts