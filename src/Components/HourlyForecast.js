import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

function HourlyForecast() {
  const { city, date } = useParams();
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=YOUR_API_KEY`)
      .then(response => response.json())
      .then(data => {
        const selectedDayData = data.list.filter(item => new Date(item.dt * 1000).toDateString() === new Date(parseInt(date) * 1000).toDateString());
        setHourlyData(selectedDayData);
      });
  }, [city, date]);

  const chartData = {
    labels: hourlyData.map(item => new Date(item.dt * 1000).getHours() + ':00'),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: hourlyData.map(item => item.main.temp),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <h2>Hourly Forecast for {new Date(parseInt(date) * 1000).toDateString()}</h2>
      <Line data={chartData} />
      {hourlyData.map((hour, index) => (
        <div key={index}>
          <p>{new Date(hour.dt * 1000).getHours()}:00</p>
          <p>{hour.main.temp}°C</p>
          <img src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`} alt="Weather icon" />
        </div>
      ))}
    </div>
  );
}

export default HourlyForecast;
