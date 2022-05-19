import React, { useContext, useState } from 'react';
import {
  Button,
  FormControl,
  InputGroup,
  Form,
  Card,
  Accordion,
  Container,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { updateTask } from '../api/tasks';
import UserContext from '../containers/UserContext';

function TaskFull({
  id = '',
  description = '',
  createdAt = '',
  updatedAt = '',
  completed = false,
  onError = (err) => {},
}) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [_completed, setCompleted] = useState(completed);

  async function handleCompleteChecbox(event) {
    setCompleted(event.target.checked);
    try {
      await updateTask(id, {
        completed: event.target.checked,
      });
      navigate('/');
    } catch (err) {
      onError(err.message);
    }
  }

  return (
    <Container>
      <Card border="primary" style={{ padding: '20px' }}>
        <InputGroup>
          <InputGroup.Checkbox
            aria-label="Is Completed"
            checked={_completed}
            onChange={handleCompleteChecbox}
            disabled={!user}
          />
          <FormControl
            placeholder="Task's description"
            aria-label="Task's description"
            value={description}
            readOnly={!user}
          />
          <Button
            variant="info"
            onClick={(e) => navigate(`/tasks/${id}`)}
            hidden={user === null}
          >
            Edit
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
  );
}

export default TaskFull;
