/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

const ListPosts = ({ post }) => (
    <div key={post._id}>
        <h1>Title</h1>
        <p>{post.title}</p>
        <h1>Description</h1>
        <p>{post.description}</p>
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