import axios from 'axios';

const instance = axios.create({
<<<<<<< HEAD
  baseURL: process.env.REACT_APP_API_URL,
=======
  baseURL: `${process.env.REACT_APP_API_URL}`, 
>>>>>>> e6c1c61 (login author)
});

export default instance;
