import { format } from "date-fns";

import http from "./http";

function transformTask(item) {
  return {
    id: item._id,
    description: item.description,
    createdAt: format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:s"),
    updatedAt: format(new Date(item.updatedAt), "dd/MM/yyyy HH:mm:s"),
    completed: item.completed || false,
  };
}

export function getTasks(userid) {
  return http
    .get(`/tasks?direction=desc&userId=${userid}`)
    .then(({ data: json }) => {
      const transformData = json.data.map(function (item) {
        return transformTask(item);
      });

      return {
        data: transformData,
        meta: json.meta,
      };
    });
}

export function getTask(taskId) {
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
    .post("/tasks", { description, author: userId })
    .then(({ data: json }) => transformTask(json.data))
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
}

export function updateTask(id, payload) {
  return http
    .put(`/tasks/${id}`, payload)
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
