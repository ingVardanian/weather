import React from 'react';
import './index.css'
const WeatherDayInfo = ({day, tempMax, tempMin, icon}) => (
  <div className='cardWrapper'>
    <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather icon" />
    <p className='day'>{day}</p>
    <p className='maxTemp'>max: {tempMax}°C </p>
    <p className='minTemp'>min: {tempMin}°C`</p>
  </div>
);

export default WeatherDayInfo;
