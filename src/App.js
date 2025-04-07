import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import humidity from './assets/humidity.png';
import wind from './assets/wind.png';
import sunrise from './assets/sunrise.png';
import sunset from './assets/sunset.png';
import warmth from './assets/warm.png';
import cold from './assets/low-temperature.png';

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
                  <span className='temperature'>{Math.round(weatherData.main.temp)}°C</span>
                  <span className='description'>{(weatherData.weather[0].main)}</span>
                </div>             
              </div>
              <div className='lower-data'>
                  <div className='upper-block'>
                    <img title='humidity-logo' alt='humidity-logo' width="9%" src={humidity} />
                    <p className='humidity'>Humidity: {weatherData.main.humidity}%</p>
                    <img title='wind-logo' alt='wind-logo' width="9%" src={wind} />
                    <p className='wind'>Wind: {Math.round(weatherData.wind.speed * 3.6)} km/h</p>
                  </div>
                  <div className='middle-block'>
                    {/* current high and low and not for the day - need another API */}
                    <img title='warmth-logo' alt='warmth-logo' width="9%" src={warmth} />
                    <span className='high'>High: {Math.round(weatherData.main.temp_max)}°C </span>
                    <img title='cold-logo' alt='cold-logo' width="9%" src={cold} />
                    <span className='low'>Low: {Math.round(weatherData.main.temp_min)}°C </span>
                  </div>
                   <div className='lower-block'>    
                    {/* sun time * 1000 to miliseconds */}
                    {/* current time based on current time zone */}
                    <img title='sunrise-logo' alt='sunrise-logo' width="10%" src={sunrise} />
                    <p className='sunrise'>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                    <img title='sunset-logo' alt='sunset-logo' width="10%" src={sunset} />
                    <p className='sunset'>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
              </div>
          </div>
        )}
    </div>
    );
};

export default App;