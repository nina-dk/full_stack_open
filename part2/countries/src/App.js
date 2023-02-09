import { useEffect, useState } from "react";
import getWeatherData from "./services/weather";
import getCountries from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [ weatherData, setWeatherData ] = useState({});

  const handleCountryInput = e => {
    let countryName = e.target.value;
    getCountries(countryName)
      .then(data => setCountries(data))
      .catch(err => {
        console.log(err);
        setCountries(null);
      });
  };

    useEffect(() => {
      if (!countries) return;
      getWeatherData(countries[0].latlng[0], countries[0].latlng[1])
        .then(data => {
          setWeatherData({
            temp: data.main.temp,
            wind: data.wind.speed,
            icon: data.weather[0].icon
          });
        })
        .catch(err => console.log(err));
    }, [countries]);

  const showCountryDeets = country => setCountries([country]);

  if (!countries || countries.length > 1 || !countries.length) {
    return (
      <div>
        <Search handleCountryInput={handleCountryInput} />
        <Countries countries={countries} showCountryDeets={showCountryDeets} />
      </div>
    )
  }

  return (
    <div>
      <Search handleCountryInput={handleCountryInput} />
      <CountryDeets info={countries[0]} showCountryDeets={showCountryDeets} weatherData={weatherData} />
    </div>
  );
}

const Search = ({ handleCountryInput }) => (
  <p>
    <label htmlFor="country">Find countries: </label>
    <input type="text" onChange={handleCountryInput}></input>
  </p>
);

const Countries = ({ countries, showCountryDeets }) => {
  if (!countries) {
    return (
      <p>No matches.</p>
    );
  } else if (countries.length > 10) {
    return (
      <p>Too many matches. Specify another filter.</p>
    );
  }

  return (
    <ul>
      {countries.map(country => {
        return <Country key={country.altSpellings[0]} country={country}
                        showCountryDeets={showCountryDeets} />
      })}
    </ul>
  )
}

const Country = ({ country, showCountryDeets }) => (
  <li>
    {country.name.common}
    <button onClick={() => showCountryDeets(country)}>Show deets</button>
  </li>
);

const CountryDeets = ({ info, weatherData }) => (
  <div className="country-details">
    <CountryInfo info={info} />
    <WeatherData weatherData={weatherData} name={info.name.common} />
  </div>
);

const CountryInfo = ({ info }) => (
  <div className="country-info">
    <h1>{info.name.common}</h1>
    <p>Capital: {info.capital[0]}</p>
    <p>Area: {info.area}</p>
    <Languages languages={info.languages} />
    <img src={info.flags.png} alt={info.flags.alt}></img>
  </div>
);

const WeatherData = ({ weatherData, name }) => (
  <div className="weather-data">
    <h2>Weather in {name}</h2>
    <p>Temperature: {weatherData.temp}</p>
    <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt=""></img>
    <p>Wind: {weatherData.wind}</p>
  </div>
);

const Languages = ({ languages }) => (
  <ul>
    {Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)}
  </ul>
);

export default App;