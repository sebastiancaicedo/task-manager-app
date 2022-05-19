import { format } from 'date-fns';

import http from './http';

function transformTask(item) {
  return {
    id: item._id,
    description: item.description,
    createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm:s'),
    updatedAt: format(new Date(item.updatedAt), 'dd/MM/yyyy HH:mm:s'),
  };
}

export function getTasks() {
  return http.get('/tasks?direction=desc').then(({ data: json }) => {
    const transformData = json.data.map(function (item) {
      return transformTask(item);
    });

    return {
      data: transformData,
      meta: json.meta,
    };
  });
}

export function getTask(taskId = '') {
  console.log(taskId);
  return http
    .get(`/tasks/${taskId}`)
    .then(({ data: json }) => transformTask(json.data))
    .catch((error) => {
      console.log(error);
      throw new Error(error.response.data.message);
    });
}

export function createTask({ description, userId }) {
  return http
    .post('/tasks', { description, author: '6282c4bdfe08489c22960a9a' })
    .then(({ data: json }) => transformTask(json.data))
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
}

export function updateTask({ id, description, completed }) {
  console.log(id);
  return http
    .put(`/tasks/${id}`, {
      description,
      completed,
    })
    .then(({ data: json }) => transformTask(json.data))
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
}

export function deleteTask({ id }) {
  return http.delete(`/tasks/${id}`).catch((error) => {
    throw new Error(JSON.stringify(error));
  });
}

export function toggleCompleteTask({ taskId, completed }) {}
