import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital, lat, lon }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data//2.5/weather", {
        params: {
          lat: lat,
          lon: lon,
          units: "metric",
          appid: process.env.REACT_APP_API_KEY,
        },
      })
      .then((response) => setWeather(response.data));
  }, [lat, lon]);

  if (!weather.hasOwnProperty("weather")) {
    return;
  }

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div id="capital-weather">
      <h2>Weather in {capital}</h2>
      <div id="capital-weather-details">
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={weatherIconUrl} alt={weather.weather.description} />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default Weather;
