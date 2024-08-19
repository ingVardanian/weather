import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function WeatherForecast() {
  const { city } = useParams();
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=YOUR_API_KEY`)
      .then(response => response.json())
      .then(data => setForecast(data.list));
  }, [city]);

  return (
    <div>
      <h2>5-Day Weather Forecast for {city}</h2>
      {forecast?.slice(0, 5).map((day, index) => (
        <div key={index}>
          <p>{new Date(day.dt * 1000).toDateString()}</p>
          <p>{day.main.temp_max}°C / {day.main.temp_min}°C</p>
          <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="Weather icon" />
          <Link to={`/forecast/${city}/${day.dt}`}>View Hourly</Link>
        </div>
      ))}
    </div>
  );
}

export default WeatherForecast;
