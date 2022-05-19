import http from './http';

export async function signUp({ firstName, lastName, email, password }) {
  return http
    .post(`/users`, { firstName, lastName, email, password })
    .then(({ data: json }) => console.log(json.data));
}
export async function signIn({ email, password }) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/signin`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }
  );
  const json = await response.json();
  return json;
}
