import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addMessageToPost } from '../api/api';

const MessageSeller = ({ seller, postID, updateShowMessageUI }) => {
    const [token, updateToken] = useState(null);
    const [message, updateMessage] = useState('');
    console.log(message);
    useEffect(() => {
        const localToken = JSON.parse(localStorage.getItem('strangersThingsToken')) ?? null;
        updateToken(localToken);
    }, []);

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const messageSubmitResult = await addMessageToPost(message, postID, token);
        console.log(messageSubmitResult);
        if (messageSubmitResult.success){
            alert("Message sent!");
            updateShowMessageUI(false);
        } else {
            alert("Only registered users can send messages. Please sign up or log in.");
            updateShowMessageUI(false);
        }
    };

    const handleTextAreaInput = (event) => {
        updateMessage(event.target.value);
    };

    return (
        <div>
            <h3>Message to {seller}:</h3>
            <form onSubmit={handleMessageSubmit}>
            <textarea onChange={handleTextAreaInput}/>
            <button type="submit">Send Message</button>
            </form>
        </div>
    )
};

MessageSeller.propTypes = {
    seller: PropTypes.string.isRequired,
    postID: PropTypes.string.isRequired,
    updateShowMessageUI: PropTypes.func.isRequired,
}
export default MessageSeller;