import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(BASE_URL)
              .then(res => res.data);
};

const create = contactData => {
  return axios.post(BASE_URL, contactData)
              .then(res => res.data);
};

const update = contactData => {
  return axios.put(`${BASE_URL}/${contactData.id}`, contactData);
};

const deleteContact = id => {
  return axios.delete(`${BASE_URL}/${id}`);
} ;

let exports = { getAll, create, update, deleteContact };

export default exports;