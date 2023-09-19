import React from 'react';
import '../styles/FiveDaysForecast.scss';

function FiveDaysForecast({ dayOfWeek, forecastItem }) {
    return (
        <>
            <h2>{dayOfWeek}</h2>
            <div className='sm-image-container'>
                <img src={`./images/weather-icons/${forecastItem.weather[0].icon}.svg`} alt="" />
            </div>
            <section>
                <span id='high-temp'>{Math.round(forecastItem.temp.max)}°</span>
                <span id='low-temp'>{Math.round(forecastItem.temp.min)}°</span>
                <p>{forecastItem.weather[0].description.charAt(0).toUpperCase() + forecastItem.weather[0].description.slice(1)}</p>
            </section>
        </>
    );
}

export default FiveDaysForecast;