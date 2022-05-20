import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Accordion,
  Alert,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';

import { updateTask, deleteTask, getTask } from './../api/tasks';
import UserContext from '../containers/UserContext';

export default function EditTask() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [completed, setCompleted] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadTask() {
    setLoading(true);
    try {
      setId(params.id);
      const response = await getTask(params.id);

      setDescription(response.description);
      setCreatedAt(response.createdAt);
      setUpdatedAt(response.updatedAt);
      setCompleted(response.completed);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(function () {
    loadTask();
  }, []);

  async function _updateTask(event) {
    try {
      setError('');
      await updateTask(id, {
        description,
        completed,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  async function _deleteTask(event) {
    try {
      setError('');
      await deleteTask({ id });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      {error && <Alert variant="warning">{error}</Alert>}
      <Container>
        <Card border="primary" style={{ padding: '20px' }}>
          <InputGroup>
            <InputGroup.Checkbox
              disabled={!user}
              checked={completed}
              aria-label="Is Completed"
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <FormControl
              placeholder="Task's description"
              aria-label="Task's description"
              readOnly={!user}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={_updateTask}
              disabled={!user}
              hidden={!user}
            >
              Update
            </Button>
            <Button
              variant="danger"
              onClick={_deleteTask}
              disabled={!user}
              hidden={!user}
            >
              Delete
            </Button>
          </InputGroup>

          <Accordion>
            <Accordion.Item>
              <Accordion.Header>Details</Accordion.Header>
              <Accordion.Body>
                <div>
                  <Form.Label>Id:</Form.Label>
                  <Form.Text>{id}</Form.Text>
                </div>
                <div>
                  <Form.Label>Created At:</Form.Label>
                  <Form.Text>{createdAt}</Form.Text>
                </div>
                <div>
                  <Form.Label>Updated At:</Form.Label>
                  <Form.Text>{updatedAt}</Form.Text>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card>
      </Container>
    </Container>
  );
}
