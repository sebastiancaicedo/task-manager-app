import { format } from "date-fns";

import http from "./http";

function transformTask(item) {
  return {
    id: item._id,
    description: item.description,
    createdAt: format(new Date(item.createdAt), "dd/MM/yyyy"),
  };
}

export function getTasks() {
  return http.get(`/tasks?direction=desc`).then(({ data: json }) => {
    const transformData = json.data.map(function (item) {
      return transformTask(item);
    });

    return {
      data: transformData,
      meta: json.meta,
    };
  });
}
