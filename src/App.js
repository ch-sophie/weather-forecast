import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
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

    /* const getImage = () => {
      if(!weatherData) return 'url(../assets/cloudy.jpg)'; // default 

      const description = weatherData.weather[0].main.toLowerCase();
      switch(description){
        case 'Clouds':
          return 'url(../assets/cloudy.jpg)';
          default:
            return 'url(../assets/cloudy.jpg)'; 
      }
    }
    */

    const getCountryName = (countryCode) => {
      const formatter = new Intl.DisplayNames(['en'], { type: 'region' });
      return formatter.of(countryCode);
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData();
    };
    
    return (
    <div>
      <div className='search'>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Search"
            />
            <button type="submit" className='btnSearch'>Search</button>
        </form>
      </div>
        {error && <p>{error}</p>}
        {weatherData && (
          <div className='container'>
                <div className='upper-data'>

                  <div className='weather-data'>
                  <h3 className='location'>{weatherData.name + ", " + getCountryName(weatherData.sys.country)}</h3>
                  <span className='temperature'>Temperature: {Math.round(weatherData.main.temp)}°C</span>
                  <div className='maxmin'>
                  <span>H: {Math.round(weatherData.main.temp_max)}° </span>
                  <span>L: {Math.round(weatherData.main.temp_min)}° </span>
                  </div>
                  <span>{(weatherData.weather[0].main)}</span>
                  </div>

                </div>
                <div className='lower-data'>
                  <div className='upper-block'>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind: {Math.round(weatherData.wind.speed * 3.6)} km/h</p>
                  </div>
                  <div className='lower-block'>
                    {/* sun time * 1000 to miliseconds */}
                    <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                
                {/* hourly forecast */}
                {/* 5 days forecast */}
                {/* moon ? */}
                </div>
            </div>
            
        )}
    </div>
    );
};

export default App;