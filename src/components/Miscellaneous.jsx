import React from 'react';
import '../styles/Miscellaneous.scss';

function Miscellaneous({ currentWeatherData, probOfRain }) {
    return (
        <div className='miscellaneous cards'>
            <div className='misc-item'>
                <div className='other-image-container'>
                    <img src="./images/miscellaneous-icons/pressure.png" alt="" />
                </div>
                <section>
                    <p>Pressure</p>
                    <p>{currentWeatherData.main.pressure} hPa</p>
                </section>
            </div>

            <div className="misc-item">
                <div className='other-image-container'>
                    <img src="./images/miscellaneous-icons/wind.png" alt="" />
                </div>
                <section>
                    <p>Wind</p>
                    <p>{currentWeatherData.wind.speed} m/s</p>
                </section>
            </div>

            <div className="misc-item">
                <div className='other-image-container'>
                    <img src="./images/miscellaneous-icons/humidity.png" alt="" />
                </div>
                <section>
                    <p>Humidity</p>
                    <p>{currentWeatherData.main.humidity} %</p>
                </section>
            </div>
            <div className="misc-item">
                <div className='other-image-container'>
                    <img src="./images/miscellaneous-icons/visibility.png" alt="" />
                </div>
                <section>
                    <p>Visibility</p>
                    <p>{currentWeatherData.visibility / 1000} km</p>
                </section>
            </div>
            <div className="misc-item">
                <div className='other-image-container'>
                    <img src="./images/miscellaneous-icons/rain.png" alt="" />
                </div>
                <section>
                    <p>Chance of Rain</p>
                    <p>{Math.round(probOfRain * 100)} %</p>
                </section>
            </div>
        </div>
    );
}

export default Miscellaneous;