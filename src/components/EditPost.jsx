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
  const [shouldRedirect, updateShouldRedirect] = useState(false);
  const updateOrDeleteSuccess = updateSuccess || deleteSuccess;
  useEffect(async () => {
    const localToken = JSON.parse(localStorage.getItem('strangersThingsToken')) ?? null;
    updateToken(localToken);
    if (localToken === null) {
      updateShouldRedirect(true);
    }
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
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  const handleDelete = async () => {
    const deleteReponse = await deletePost(title, description, price, location, willDeliver, token, currentPostId);
    if (deleteReponse.success) {
      setDeleteSuccess(true);
    }
  };

  if (updateOrDeleteSuccess || shouldRedirect) {
    return (
      <Redirect to="/posts" />
    )
  }

  if (!postToEdit) {
    return (
      <Loading
        contentType='post details' />
    )
  }

  return (
    <Container className="mt-3">
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
          <Form.Label column lg={2}>
            Location
          </Form.Label>
          <Col lg={8} className="align-items-center">
            <Form.Control type="text" defaultValue={postToEdit.location} onChange={(event) => {
              event.preventDefault();
              updateLocation(event.target.value);
            }} />
          </Col>
          <Col lg={2}>
            <Form.Label>
              Will deliver?
          </Form.Label>
            <Form.Check type="checkbox" defaultChecked={postToEdit.willDeliver}onChange={(event) => {
              updateWillDeliver(event.target.checked);
            }} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Description">
          <Col lg={2}>
          <Form.Label column >Description</Form.Label>
          </Col>
          <Col lg={10}>
          <Form.Control as="textarea" defaultValue={postToEdit.description} onChange={(event) => {
            event.preventDefault();
            updateDescription(event.target.value);
          }} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 w-25 mx-auto">
            {
              submitFail && (
                <p style={{ color: 'red' }}>Submission failed. Please login or register to modify posts.</p>
              )
            }
            <div className="mb-2">
              <Button type="submit">Submit Edit</Button>
            </div>
            <div>
              <Button className="ml-1" type="button" variant="danger" onClick={handleDelete}>Delete Post</Button>
            </div>
        </Form.Group>
      </Form>
    </Container>
  )
};

export default EditPost;
