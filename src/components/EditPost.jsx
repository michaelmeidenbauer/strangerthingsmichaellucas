/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
    getAllPosts,
    editPost,
    deletePost
} from '../api/api';

const EditPost = ({ match }) => {
    const [title, updateTitle] = useState(null);
    const [description, updateDescription] = useState(null);
    const [price, updatePrice] = useState(null);
    const [location, updateLocation] = useState(null);
    const [willDeliver, updateWillDeliver] = useState(false);
    const [token, updateToken] = useState(null);
    const [postToEdit, updatePostToEdit] = useState(null);
    const currentPostId = match.params.postID;
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const updateOrDeleteSuccess = updateSuccess || deleteSuccess;
    console.log(currentPostId);
    useEffect(async () => {
        const localToken = JSON.parse(localStorage.getItem('strangersThingsToken')) ?? null;
        updateToken(localToken);
        const downloadedPosts = await getAllPosts();
        // eslint-disable-next-line no-underscore-dangle
        const singledOutPost = downloadedPosts.filter(post => post._id === currentPostId)[0];
        updatePostToEdit(singledOutPost);
        updateTitle(singledOutPost.title);
        updateDescription(singledOutPost.description);
        updatePrice(singledOutPost.price);
        updateLocation(singledOutPost.location);
        updateWillDeliver(singledOutPost.willDeliver);
        updateTitle(singledOutPost.title);
    }, []);
    console.log(willDeliver);
    const formSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const editPostReponse = await editPost(
                title,
                description,
                price,
                location,
                willDeliver,
                token,
                currentPostId
            );
            if (editPostReponse.success) {
                setUpdateSuccess(true);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async () => {
        const deleteReponse = await deletePost(title, description, price, location, willDeliver, token, currentPostId);
        console.log(deleteReponse);
        if (deleteReponse.success) {
            setDeleteSuccess(true);
        }
    };
    const editFormStyle = {
        display: 'grid',
        gridTemplateColumns: '1 / 100%',
        gridTemplateRows: 'repeat(5, 1fr)',
        gridRow: '1 / 6',
        textAlign: 'center'
    };

    if (updateOrDeleteSuccess) {
        return (
            <Redirect to="/posts" />
            )
    }

    return (
        <>
        {
            postToEdit &&
            (
        <form
            onSubmit={formSubmitHandler}
            style={editFormStyle}>
            <input
                type="text"
                defaultValue={postToEdit.title}
                onChange={(event) => {
                    event.preventDefault();
                    updateTitle(event.target.value);
                }}
                style={
                    {
                        gridRow: '1 / span 1',
                        textAlign: 'center',
                    }}
            />
            <input
                type="text"
                defaultValue={postToEdit.description}
                onChange={(event) => {
                    event.preventDefault();
                    updateDescription(event.target.value);
                }}
                style={
                    {
                        gridRow: '2 / span 1',
                        textAlign: 'center',
                    }}
            />
            <input
                type="text"
                defaultValue={postToEdit.price}
                onChange={(event) => {
                    event.preventDefault();
                    updatePrice(event.target.value);
                }}
                style={
                    {
                        gridRow: '3 / span 1',
                        textAlign: 'center',
                    }}
            />
            <input
                type="text"
                defaultValue={postToEdit.location}
                onChange={(event) => {
                    event.preventDefault();
                    updateLocation(event.target.value);
                }}
                style={
                    {
                        gridRow: '4 / span 1',
                        textAlign: 'center',
                    }}
            />
            <div className="checkbox">
                <span>Will deliver?</span>
                <input
                    type="checkbox"
                    defaultValue="will deliver"
                    name="willDeliver?"
                    onClick={(event) => {
                        updateWillDeliver(event.target.checked);
                    }}
                    style={
                        {
                            gridRow: '5 / span 1',
                            textAlign: 'center',
                        }}
                    defaultChecked={postToEdit.willDeliver}
                />
            </div>
            <button
                type="submit"
            >
                Submit Edit
      </button>
      <button type="button" onClick={handleDelete}>Delete Post</button>
        </form>
    )
        }
        </>
    );
};

export default EditPost;
