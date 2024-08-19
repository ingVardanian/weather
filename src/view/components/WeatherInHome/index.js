import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../../../constants';
import WeatherDayInfo from '../WeatherInDaysInfo';

const WeatherHome = () => {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('Yerevan');

  const getForecast = () => {
    fetch(`${API_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`)

      .then(response => response.json())
      .then(data => {
        setForecast(data.list);
        console.log(data);
      });
  };

  useEffect(() => {
    getForecast();
  }, [city]);

  return (
    <div>
      <h1>Weather in {city}</h1>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name" 
      />
      <button onClick={getForecast}>Get Forecast</button>
      <div>
        {forecast?.slice(0, 5).map((day, index) => (
          <WeatherDayInfo
            key={index}
            day={new Date(day.dt * 1000).toDateString()}
            tempMax={day.main.temp_max}
            tempMin={day.main.temp_min}
            icon={day.weather[0].icon}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherHome;
