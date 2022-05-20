import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Container,
  FormControl,
  InputGroup,
} from 'react-bootstrap';

import { createTask } from './../api/tasks';
import UserContext from '../containers/UserContext';

export default function CreateTask() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [error, setError] = useState('');
  const [description, setDescription] = useState('');

  async function createNewTask(event) {
    try {
      setError('');
      await createTask({
        description,
        userId: user.id,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Container>
      {error && <Alert variant="warning">{error}</Alert>}
      <Container>
        <Card border="primary" style={{ padding: '20px' }}>
          <InputGroup>
            <InputGroup.Checkbox aria-label="Is Completed" disabled={true} />
            <FormControl
              placeholder="Task's description"
              aria-label="Task's description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="primary" type="submit" onClick={createNewTask}>
              Create
            </Button>
          </InputGroup>
        </Card>
      </Container>
    </Container>
  );
}
