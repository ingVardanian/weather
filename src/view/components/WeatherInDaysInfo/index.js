import React from 'react';

const WeatherDayInfo = ({ day, tempMax, tempMin, icon }) => (
  <div>
    <p>{day}</p>
    <p>{tempMax}°C / {tempMin}°C</p>
    <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather icon" />
  </div>
);

export default WeatherDayInfo;
