import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    
    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            console.log("Full: ", response);
            setError('');
        } catch (error) {
            setError('City not found. Please try again.');
            setWeatherData(null);
            console.log(error);
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData();
    };
    
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Enter city name"
            />
            <button type="submit">Get Weather</button>
        </form>
        {error && <p>{error}</p>}
        {weatherData && (
            <div>
                <h2>{weatherData.name}</h2>
                <p>Temperature: {weatherData.main.temp} °C</p>
                <p>Weather: {weatherData.weather[0].main}</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind: {weatherData.wind.speed}</p>
                {/* sunrise sunset */}
            </div>
        )}
    </div>
    );
};

export default Weather;