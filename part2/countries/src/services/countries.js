import axios from "axios";

const getCountries = name => {
  return axios.get(`https://restcountries.com/v3.1/name/${name}`)
              .then(res => res.data);
}

export default getCountries;