import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/login';

const login = (user) => {
  const request = axios.post(`${baseUrl}`, user);
  return request.then((response) => {
    return response.data;
  });
};

export default { login };
