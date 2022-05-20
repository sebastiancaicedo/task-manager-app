import http from './http';

export async function signUp({ firstName, lastName, email, password }) {
  return http
    .post(`/users`, { firstName, lastName, email, password })
    .catch((err) => {
      throw new Error(JSON.stringify(err));
    });
}

export async function signIn({ email, password }) {
  return http
    .post(`/users/signin`, { email, password })
    .then(({ data: json }) => json)
    .catch((err) => {
      throw new Error(JSON.stringify(err));
    });
}
