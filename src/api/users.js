import http from "./http";

export async function signUp({ firstName, lastName, email, password }) {
  return http
    .post(`/users`, { firstName, lastName, email, password })
    .then(({ data: json }) => console.log(json.data));
}
