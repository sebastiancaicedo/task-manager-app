import React, { useContext, useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { getTasks } from '../api/tasks';
import TaskFull from '../components/TaskFull';
import UserContext from './UserContext';

export default function List() {
  const { user } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadList() {
    setLoading(true);
    try {
      const response = await getTasks(user.id);
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
    return (
      <Spinner animation="border" role="status" style={{ margin: '16px auto' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {data.map(function (item) {
        return (
          <TaskFull
            key={item.id}
            id={item.id}
            description={item.description}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            completed={item.completed}
            onError={(err) => setError(err)}
          />
        );
      })}
    </>
  );
}
