/* eslint-disable no-underscore-dangle */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

const Message = ({ message, postId = null, deleted = false }) =>
  // eslint-disable-next-line no-nested-ternary
  postId && deleted ? (
    <Card key={message._id} className="border">
      <Card.Body>
        <Card.Title>From {message.fromUser.username}:</Card.Title>
        <Card.Text>{message.content}</Card.Text>
        <Card.Text>Post: {message.post.title} </Card.Text>
        <Card.Text>(deleted post)</Card.Text>
      </Card.Body>
    </Card>
  ) : postId ? (
    <Card key={message._id} className="border">
      <Card.Body>
        <Card.Title>From {message.fromUser.username}:</Card.Title>
        <Card.Text>{message.content}</Card.Text>
        <Card.Text>
          <Link to={`/posts/${postId}`}>Post: {message.post.title} </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  ) : (
    <Card key={message._id} className="border">
      <Card.Body>
        <Card.Title>From {message.fromUser.username}:</Card.Title>
        <Card.Text>{message.content}</Card.Text>
      </Card.Body>
    </Card>
  );

Message.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    post: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
    fromUser: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
  postId: PropTypes.string.isRequired,
  deleted: PropTypes.bool,
};

Message.defaultProps = {
  deleted: false,
};

export default Message;
