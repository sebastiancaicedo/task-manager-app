import React from 'react';
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

function TaskFull({
  id = '',
  description = '',
  createdAt = '',
  updatedAt = '',
  completed = false,
}) {
  const navigate = useNavigate();

  return (
    <Container>
      <Card border="primary" style={{ padding: '20px' }}>
        <InputGroup>
          <InputGroup.Checkbox aria-label="Is Completed" />
          <FormControl
            placeholder="Task's description"
            aria-label="Task's description"
            value={description}
            readOnly={true}
          />
          <Button variant="info" onClick={(e) => navigate(`/tasks/${id}`)}>
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
