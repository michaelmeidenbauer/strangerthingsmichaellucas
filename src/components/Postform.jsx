import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
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
    <Container>
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
          <Form.Label column lg={2}>
            Location
          </Form.Label>
          <Col lg={8} className="align-items-center">
            <Form.Control type="text" placeholder="Location" onChange={(event) => {
              event.preventDefault();
              updateLocation(event.target.value);
            }} />
          </Col>
          <Col lg={2 }>
          <Form.Label>
            Will deliver?
          </Form.Label>
            <Form.Check type="checkbox" defaultChecked={false} onChange={(event) => {
              updateWillDeliver(event.target.checked);
            }} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Description">
          <Col lg={2}>
          <Form.Label column >Description</Form.Label>
          </Col>
          <Col lg={10}>
          <Form.Control as="textarea" onChange={(event) => {
            event.preventDefault();
            updateDescription(event.target.value);
          }} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 w-25 mx-auto">
            <Button type="submit">Submit Post</Button>
            {
              submitFail && (
                <p style={{ color: 'red' }}>Post submission failed. Please login or register to create posts.</p>
              )
            }
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Postform;
