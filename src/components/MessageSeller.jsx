import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import AlertBox from './AlertBox';
import { addMessageToPost } from '../api/api';

const MessageSeller = ({ seller, postID, updateShowMessageUI }) => {
    const [token, updateToken] = useState(null);
    const [message, updateMessage] = useState('');
    const [submitFail, updateSubmitFail] = useState(false);
    const [showAlert, updateShowAlert] = useState(false);
    const alertType = submitFail ? 'warning' : 'success';

    useEffect(() => {
        const localToken = JSON.parse(localStorage.getItem('strangersThingsToken')) ?? null;
        updateToken(localToken);
    }, []);

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const messageSubmitResult = await addMessageToPost(message, postID, token);
        if (messageSubmitResult.success){
            updateShowAlert(true);
            setTimeout(() => {
                updateShowMessageUI(false);
            }, 1500);
        } else {
            updateShowAlert(true);
            updateSubmitFail(true);
        }
    };

    const handleTextAreaInput = (event) => {
        updateMessage(event.target.value);
    };

    return (
        <>
        <Card className="mt-2 w-75 mx-auto p-4">
            <Card.Title>Message to {seller}:</Card.Title>
            <Form onSubmit={handleMessageSubmit}>
            <Row>
            <textarea onChange={handleTextAreaInput}/>
            </Row>
            <Row>
            <Button type="submit">Send Message</Button>
            </Row>
            </Form>
        {
            showAlert &&
            (
                <AlertBox 
                alertType={alertType}
                />
            )
        }
        </Card>
        </>
    )
};

MessageSeller.propTypes = {
    seller: PropTypes.string.isRequired,
    postID: PropTypes.string.isRequired,
    updateShowMessageUI: PropTypes.func.isRequired,
}
export default MessageSeller;