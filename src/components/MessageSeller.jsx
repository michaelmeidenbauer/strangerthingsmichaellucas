import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { addMessageToPost } from '../api/api';

const MessageSeller = ({ seller, postID, updateShowMessageUI }) => {
    const [token, updateToken] = useState(null);
    const [message, updateMessage] = useState('');
    useEffect(() => {
        const localToken = JSON.parse(localStorage.getItem('strangersThingsToken')) ?? null;
        updateToken(localToken);
    }, []);

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const messageSubmitResult = await addMessageToPost(message, postID, token);
        if (messageSubmitResult.success){
            // eslint-disable-next-line no-alert
            alert("Message sent!");
            updateShowMessageUI(false);
        } else {
            // eslint-disable-next-line no-alert
            alert("Only registered users can send messages. Please sign up or log in.");
            updateShowMessageUI(false);
        }
    };

    const handleTextAreaInput = (event) => {
        updateMessage(event.target.value);
    };

    return (
        <Card className="mt-2 w-75 mx-auto">
            <Card.Title>Message to {seller}:</Card.Title>
            <Form onSubmit={handleMessageSubmit}>
            <Row>
            <textarea onChange={handleTextAreaInput}/>
            </Row>
            <Row>
            <Button type="submit">Send Message</Button>
            </Row>
            </Form>
        </Card>
    )
};

MessageSeller.propTypes = {
    seller: PropTypes.string.isRequired,
    postID: PropTypes.string.isRequired,
    updateShowMessageUI: PropTypes.func.isRequired,
}
export default MessageSeller;