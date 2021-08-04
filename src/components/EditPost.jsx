/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Loading from './Loading';
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
    const [submitFail, updateSumbitFail] = useState(false);
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
            } else {
                updateSumbitFail(true);
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

    if (updateOrDeleteSuccess) {
        return (
            <Redirect to="/posts" />
            )
    } 
    
    if (!postToEdit) {
        return (
            <Loading 
            contentType='post details'/>
        )
    }

    return (
        <Container>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group as={Row} className="mb-3" controlId="Title">
              <Form.Label column sm={2}>
                Post Title
        </Form.Label>
              <Col sm={10}>
                <Form.Control size="lg" type="text" defaultValue={postToEdit.title} onChange={(event) => {
                  event.preventDefault();
                  updateTitle(event.target.value);
                }} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="Price">
              <Form.Label column sm={2}>
                Price
        </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" defaultValue={postToEdit.price} onChange={(event) => {
                  event.preventDefault();
                  updatePrice(event.target.value);
                }} />
              </Col>
            </Form.Group>
    
            <Form.Group as={Row} className="mb-3" controlId="Location">
              <Form.Label column sm={2}>
                Location
              </Form.Label>
              <Col sm={10} className="align-items-center">
                <Form.Control type="text" defaultValue={postToEdit.location} onChange={(event) => {
                  event.preventDefault();
                  updateLocation(event.target.value);
                }} />
              <Form.Check label="Will deliver?" type="checkbox" className="w-50 mx-auto" onChange={() => {
                updateWillDeliver(!willDeliver);
              }} />
              </Col>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} defaultValue={postToEdit.description} onChange={(event) => {
                event.preventDefault();
                updateDescription(event.target.value);
              }} />
            </Form.Group>
    
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                {
                  submitFail && (
                    <p style={{ color: 'red' }}>Submission failed. Please login or register to modify posts.</p>
                  )
                }
              </Col>
              <Col sm={{ span: 10, offset: 2 }}>
               <div className="mb-2">
               <Button type="submit">Submit Edit</Button>
               </div>
               <div>
               <Button className="ml-1" type="button" variant="danger" onClick={handleDelete}>Delete Post</Button>
               </div>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      )
};

export default EditPost;
