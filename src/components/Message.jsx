/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const Message = ({ message }) => (
    <Card key={message._id}>
        <Card.Body>
            <Card.Title>
                From {message.fromUser.username}:
            </Card.Title>
            <Card.Text>
                {message.content}
            </Card.Text>
        </Card.Body>
    </Card>
);

Message.propTypes = {
    message: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        fromUser: PropTypes.shape({
            username: PropTypes.string.isRequired,
        })
    }).isRequired,
};
export default Message;