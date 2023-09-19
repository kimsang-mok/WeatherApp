import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/HourlyForecast.scss';
import { unixTimestampToHour } from '../utils/timestampToHour';

function HourlyForecast({ fiveHoursForecast, timezone }) {
    const [isScreenLarge, setIsScreenLarge] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenLarge(window.innerWidth >= 896);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='hourly-forecast cards'>
            {fiveHoursForecast.map((forecast, index) => (
                <React.Fragment key={index}>
                    {isScreenLarge ? (
                        <div className='hourly-lg'>
                            <div className='hourly-image-container'>
                                <img src={`./images/weather-icons/${forecast.weather[0].icon}.svg`} alt="" />
                            </div>
                            <section>
                                <p><strong>{Math.round(forecast.main.temp)}°</strong></p>
                                <p>{unixTimestampToHour(forecast.dt, timezone)}</p>
                            </section>

                        </div>

                    ) : (
                        <div className='hourly-sm'>
                            <p><strong>{Math.round(forecast.main.temp)}°</strong></p>
                            <div className='hourly-image-container'>
                                <img src={`./images/weather-icons/${forecast.weather[0].icon}.svg`} alt="" />
                            </div>
                            <p>{unixTimestampToHour(forecast.dt, timezone)}</p>
                        </div>

                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

export default HourlyForecast;