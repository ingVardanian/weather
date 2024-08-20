import React, { useState, useEffect, useCallback } from 'react';
import { API_URL, API_KEY } from '../../../constants';
import WeatherInDaysInfo from '../WeatherInDaysInfo';
import './index.css';

const WeatherInHome = () => {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const getForecastByCity = useCallback(() => {
    fetch(`${API_URL}/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json())
      .then((jsonData) => {
        const groupedForecast = groupByDay(jsonData.list);
        setForecast(groupedForecast.slice(0, 5));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [city]);

  const groupByDay = (list) => {
    const dailyData = [];
    list.forEach((entry) => {
      const date = new Date(entry.dt_txt).toDateString();
      if (!dailyData.some((d) => new Date(d.dt_txt).toDateString() === date)) {
        dailyData.push(entry);
      }
    });
    return dailyData;
  };

  useEffect(() => {
    getForecastByCity();
  }, [getForecastByCity]);

  const handleCityChange = (e) => {
    setCity(e.target.value.trim());
  };

  return (
    <div className='container'>
      <h1 className='headline'>Weather in {city}</h1>
      <div className='inputButtonWrapper'>
        <input 
          type="text" 
          value={city} 
          onChange={handleCityChange} 
          placeholder="Enter city name" 
          className='inputField'
        />
        <button onClick={getForecastByCity} className='button'>Get Forecast</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '20px' }}>
        {forecast.map((day, index) => (
          <div key={index} className='weatherCards'>
            <WeatherInDaysInfo
              day={new Date(day.dt * 1000).toDateString()}
              tempMax={day.main.temp_max}
              tempMin={day.main.temp_min}
              icon={day.weather[0].icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherInHome;
