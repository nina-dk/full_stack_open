import axios from "axios";

const getWeatherData = (lat, long) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
              .then(res => res.data);
};

export default getWeatherData;