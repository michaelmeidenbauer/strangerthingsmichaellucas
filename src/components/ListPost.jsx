/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const ListPosts = ({ post }) => (
    // <div key={post._id} className="list-post">
    // <Link to={{
    //     pathname: `/posts/${post._id}`
    // }}>
    //     <h1>{post.title}</h1>
    // </Link>
    //     <h4>Asking price: {post.price}</h4>
    //     <p>{post.description}</p>
    // </div>
    <Card key={post._id} className='border'>
        <Card.Body>
            <Link to={{
                pathname: `/posts/${post._id}`
            }}>
                <Card.Title><h3>{post.title}</h3></Card.Title>
            </Link>
            <Card.Text>
                <h4>Asking price: {post.price}</h4>
            </Card.Text>
            <Card.Text>
                {post.description}
            </Card.Text>
        </Card.Body>
    </Card>
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