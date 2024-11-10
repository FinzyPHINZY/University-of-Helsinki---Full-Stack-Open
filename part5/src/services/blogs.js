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

const updateBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.put(`${baseUrl}/${blog._id}`, blog, config);
  return request;
};

const deleteBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${blog._id}`, config);
  return request;
};

export default { getAll, setToken, createBlog, updateBlog, deleteBlog };
