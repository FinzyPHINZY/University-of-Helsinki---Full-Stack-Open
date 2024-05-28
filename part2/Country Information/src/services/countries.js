import axios from "axios";
const baseUrl = " https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
  return axios.get(`${baseUrl}/all`);
};

const getCountry = (name) => {
  return axios.get(`${baseUrl}/${name}`);
};

const getWeather = () => {
  return axios.get();
};

// const create = (newObject) => {
//   return axios.post(baseUrl, newObject);
// };

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject);
// };

// const remove = (id) => {
//   return axios.delete(`${baseUrl}/${id}`);
// };

export default { getAllCountries };
// create, update, remove
