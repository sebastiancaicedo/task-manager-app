import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

import Task from "../components/Tasks";
import { getTask } from "../api/tasks";

export default function SingleTask() {
  const params = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadTask() {
    setLoading(true);
    try {
      const response = await getTask({
        id: params.id,
      });
      setData(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(function () {
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status" style={{ margin: "16px auto" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {error && <p>{error.message}</p>}
      <Accordion defaultActiveKey={data.id}>
        <Task
          key={data.id}
          id={data.id}
          createdAt={data.createdAt}
          description={data.description}
        />
      </Accordion>
    </>
  );
}
