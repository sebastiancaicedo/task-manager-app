import React, { useEffect, useState } from "react";
import Tasks from "../components/Tasks";
import { getTasks } from "../api/tasks";
import { Alert } from "bootstrap";
import Accordion from "react-bootstrap/Accordion";

export default function List() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadList() {
    setLoading(true);
    try {
      const response = await getTasks();
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(function () {
    loadList();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {data.map(function (item) {
        return (
          <Accordion>
            <Tasks
              key={item.id}
              id={item.id}
              createdAt={item.createdAt}
              description={item.description}
            />
          </Accordion>
        );
      })}
    </>
  );
}
