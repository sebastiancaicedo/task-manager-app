import React from "react";
import Accordion from "react-bootstrap/Accordion";

export default function Task({ id = "", description = "", createdAt = "" }) {
  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header>Task: {id}</Accordion.Header>
      <Accordion.Body>
        <p className="mb-2 text-muted">Creation date: {createdAt}</p>
        <p class="font-weight-normal text-justify">{description}</p>
      </Accordion.Body>
    </Accordion.Item>
  );
}
