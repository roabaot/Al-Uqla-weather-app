import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'dc5c9d3ef7174e67934135126232211';

const WeatherCard = ({ weatherData }) => {
  const { location, current } = weatherData;
  const { temp_c, humidity, condition } = current;
  const { text, icon } = condition;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">{location.name}</h2>
      <div className="flex items-center mb-4">
        <img
          className="mr-2"
          src={icon}
          alt="Weather Icon"
        />
        <span className="text-lg">{temp_c}°C</span>
      </div>
      <p>{text}</p>
      <p>Humidity: {humidity}%</p>
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError('Unable to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Weather App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a location / Date / Season"
          className="p-2 border border-gray-300 rounded lg:w-1/4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-2 rounded"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
};

export default App;