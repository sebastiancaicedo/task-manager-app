import React from "react";
import { Button, Form } from "react-bootstrap";

export default function Create() {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Task
      </Button>
    </Form>
  );
}
