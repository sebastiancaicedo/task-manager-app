import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/users';

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const { name, lastname, email, password } = event.target.elements;
    const userData = {
      firstName: name.value,
      lastName: lastname.value,
      email: email.value,
      password: password.value,
    };
    try {
      setError('');
      await signUp(userData);
      navigate(`/signIn`);
    } catch (err) {
      setError(err);
    }
  }
  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            required={true}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lastname"
            required={true}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required={true}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </>
  );
}
