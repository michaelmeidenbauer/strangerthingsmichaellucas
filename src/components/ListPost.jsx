/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListPosts = ({ post }) => (
    <div key={post._id}>
        <h1>Title</h1>
        <p>{post.title}</p>
        <h1>Description</h1>
        <p>{post.description}</p>
        <Link to={{
            pathname: `/posts/${post._id}`
        }}>See full posting</Link>
    </div>
)

ListPosts.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};

export default ListPosts