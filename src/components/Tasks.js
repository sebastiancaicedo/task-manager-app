import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";

export default function Task({ id = "", description = "", createdAt = "" }) {
  const navigate = useNavigate();
  return (
    <Accordion.Item eventKey={id} style={{ margin: "16px 0" }}>
      <Accordion.Header>Task: {id}</Accordion.Header>
      <Accordion.Body
        onClick={function (event) {
          navigate(`/tasks/${id}`);
        }}
      >
        <p className="mb-2 text-muted">Creation date: {createdAt}</p>
        <p class="font-weight-normal text-justify">{description}</p>
      </Accordion.Body>
    </Accordion.Item>
  );
}
