import React from 'react';
import '../styles/CurrentWeather.scss';

function CurrentWeather({ currentWeatherData, max_temp, min_temp }) {
    return (
        <div className='current-weather'>
            <h2>{currentWeatherData.name}</h2>
            <div className='image-container'>
                <img src={`./images/weather-icons/${currentWeatherData.weather[0].icon}.svg`} alt="" />
            </div>
            <h1>{Math.round(currentWeatherData.main.temp)}°</h1>
            <p>{currentWeatherData.weather[0].description.charAt(0).toUpperCase() + currentWeatherData.weather[0].description.slice(1)}</p>
            <section>
                <span>H: {Math.round(max_temp)}°</span>
                <span> L: {Math.round(min_temp)}°</span>
            </section>
        </div>
    );
}

export default CurrentWeather;