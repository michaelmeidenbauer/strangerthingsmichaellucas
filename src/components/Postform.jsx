import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {
  createPost,
} from '../api/api';


const Postform = () => {
  const [title, updateTitle] = useState(null);
  const [description, updateDescription] = useState(null);
  const [price, updatePrice] = useState(null);
  const [location, updateLocation] = useState(null);
  const [willDeliver, updateWillDeliver] = useState(false);
  const [token, updateToken] = useState(null);
  const [submitSuccess, updateSubmitSuccess] = useState(false);
  const [submitFail, updateSubmitFail] = useState(false);
  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem('strangersThingsToken')) ?? null;
    updateToken(localToken);
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const postCreationSuccess = await createPost(
        title,
        description,
        price,
        location,
        willDeliver,
        token,
      );
      if (postCreationSuccess.success) {
        updateSubmitSuccess(true);
      } else {
        updateSubmitFail(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (submitSuccess) {
    return <Redirect to="/posts" />
  }

  return (
    <Container className="mt-3">
      <Form onSubmit={formSubmitHandler}>
        <Form.Group as={Row} className="mb-3" controlId="Title">
          <Form.Label column sm={2}>
            Post Title
    </Form.Label>
          <Col sm={10}>
            <Form.Control size="lg" type="text" placeholder="Title" onChange={(event) => {
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
            <Form.Control type="text" placeholder="Price" onChange={(event) => {
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
            <Form.Control type="text" placeholder="Location" onChange={(event) => {
              event.preventDefault();
              updateLocation(event.target.value);
            }} />
          <Form.Check label="Will deliver?" type="checkbox" onChange={() => {
            updateWillDeliver(!willDeliver);
          }} />
          </Col>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={(event) => {
            event.preventDefault();
            updateDescription(event.target.value);
          }} />
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Submit Post</Button>
          </Col>
          <Col sm={{ span: 10, offset: 2 }}>
            {
              submitFail && (
                <p style={{ color: 'red' }}>Post submission failed. Please login or register to create posts.</p>
              )
            }
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Postform;
