import axios from "axios";
import "./Country.css";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  console.log(country);

  const api_key = import.meta.env.VITE_API_KEY;

  const languages = country.languages;
  const languageArr = Object.keys(languages).map((lang) => (
    <li key={languages[lang]}>{languages[lang]}</li>
  ));

  const capital = country.capital[0];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;
        const response = await axios.get(url);

        const data = response.data;
        console.log(`Weather Data: `, data);
        setWeather(data);
      } catch (err) {
        console.error(`Error fetching weather data: ${err}`);
      }
    };

    fetchWeatherData();
  }, [api_key, capital]);

  return (
    <div>
      <h1 className="country__name">{country.name.common}</h1>

      <div className="country__info">
        <p>
          <strong>Capital: </strong>
          {country.capital[0]}
        </p>
        <p>
          <strong>Area: </strong>
          {country.area}
        </p>
        <div>
          <strong>Languages:</strong>
          <ul>{languageArr}</ul>
        </div>
        <img
          className="country__flag"
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
        />

        {weather && (
          <div>
            <h3>Weather in {capital}</h3>
            <p>Temperature: {weather.main.temp} Celsius</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={`${weather.weather[0].description} icon`}
            />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Country;
