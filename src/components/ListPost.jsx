/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListPosts = ({ post }) => (
    <div key={post._id} className="list-post">
        <Link to={{
            pathname: `/posts/${post._id}`
        }}>
            <h1>{post.title}</h1>
        </Link>
        <h4>Asking price: {post.price}</h4>
        <p>{post.description}</p>
    </div>
)

ListPosts.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
    }).isRequired,
};

export default ListPosts