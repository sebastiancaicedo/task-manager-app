import http from './http';

import { setSession } from '../auth';

export async function signUp({ firstName, lastName, email, password }) {
  return http
    .post(`/users`, { firstName, lastName, email, password })
    .then(({ data: json }) => console.log(json.data));
}
export async function signIn({ email, password }) {
  return http
    .post(`/users/signin`, { email, password })
    .then(({ data: json }) => {
      setSession(json.meta.token);

      return json;
    });
}
