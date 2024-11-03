import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(`${baseUrl}`, config);
  return request.then((response) => response.data);
};

const createBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(`${baseUrl}`, blog, config);
  return request;
};

export default { getAll, setToken, createBlog };
