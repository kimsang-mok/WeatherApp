import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../features/weatherSlice';
import { useEffect } from 'react';
import { formatAllDaysOfWeek } from '../utils/dateConverter';
import { fetchCurrentWeather } from '../features/currentWeatherSlice';
import { fetchHourlyWeather } from '../features/hourlyWeatherSlice';
import { extractFiveDayForcast } from '../utils/extractFiveDays';
import SearchCities from './SearchCities';
import { fetchLocation } from '../features/locationSlice';
import { extractFiveHoursForcast } from '../utils/fiveConsecutiveHours';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import Miscellaneous from './Miscellaneous';
import FiveDaysForecast from './FiveDaysForecast';
import ErrorMessage from './ErrorMessage';
import ClipLoader from "react-spinners/ClipLoader";
import '../styles/DisplayWeather.scss';

function WeatherDisplay() {
    const dispatch = useDispatch();

    // main data
    const {
        data: weatherData,
        status: weatherStatus,
        error: weatherError,
    } = useSelector((state) => state.weather);

    const {
        data: currentWeatherData,
        status: currentWeatherStatus,
        error: currentWeatherError,
    } = useSelector((state) => state.currentWeather);

    const {
        data: hourlyWeatherData,
        status: hourlyWeatherStatus,
        error: hourlyWeatherError,
    } = useSelector((state) => state.hourlyWeather);

    const {
        data: locationData,
        status: locationStatus,
    } = useSelector((state) => state.location);

    // other states
    const [nextForecasts, setNextForecasts] = useState([]);
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [dayOfWeekArray, setDayOfWeekArray] = useState([]);
    const [fiveHoursForecast, setFiveHoursForecast] = useState([]);

    const dataStatus = [weatherStatus, currentWeatherStatus, hourlyWeatherStatus, locationStatus]
    const isLoading = dataStatus.some(status => status === 'loading');

    const hasError = !!(
        weatherError ||
        currentWeatherError ||
        hourlyWeatherError
    );

    const handleFetchWeather = (coords) => {
        dispatch(fetchWeather(coords));
    };

    const handleFetchHourlyWeather = (coords) => {
        dispatch(fetchHourlyWeather(coords));
    };

    const handleFetchCurrentWeather = (coords) => {
        dispatch(fetchCurrentWeather(coords));
    };

    const getCoordinate = (lat, lon) => {
        setLatitude(lat);
        setLongitude(lon);
    };

    useEffect(() => {
        if (locationData) {
            setLongitude(locationData.longitude);
            setLatitude(locationData.latitude);
        }
    }, [locationData]);

    useEffect(() => {
        if (latitude && longitude) {
            handleFetchCurrentWeather({ latitude, longitude });
            handleFetchHourlyWeather({ latitude, longitude });
            handleFetchWeather({ latitude, longitude });
        }
    }, [latitude, longitude]);

    useEffect(() => {
        if (weatherData && weatherData.list) {
            const nextForecasts = extractFiveDayForcast(weatherData.list);
            setNextForecasts(nextForecasts);
            setDayOfWeekArray(formatAllDaysOfWeek(nextForecasts));
        }
    }, [weatherData]);

    useEffect(() => {
        if (hourlyWeatherData && hourlyWeatherData.list) {
            setFiveHoursForecast(extractFiveHoursForcast(hourlyWeatherData));
        }
    }, [hourlyWeatherData]);

    useEffect(() => {
        dispatch(fetchLocation());
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className='loader-container'>
                    <ClipLoader
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /></div>

            ) : (

                <>
                    {hasError ? (
                        // display error message if any of the data slices has an error
                        <ErrorMessage message="An error occurred while fetching data." />
                    ) : (
                        <>
                            <SearchCities
                                getCoordinate={getCoordinate}
                            />

                            {currentWeatherData?.main && nextForecasts[0]?.temp &&
                                <CurrentWeather
                                    currentWeatherData={currentWeatherData}
                                    max_temp={nextForecasts[0].temp.max}
                                    min_temp={nextForecasts[0].temp.min}
                                />
                            }

                            {fiveHoursForecast &&
                                <HourlyForecast
                                    fiveHoursForecast={fiveHoursForecast}
                                    timezone={currentWeatherData.timezone}
                                />
                            }

                            {currentWeatherData?.main && fiveHoursForecast && (fiveHoursForecast[0]?.pop !== undefined) &&
                                <Miscellaneous
                                    currentWeatherData={currentWeatherData}
                                    probOfRain={fiveHoursForecast[0].pop}
                                />
                            }

                            <div className='five-day-forecast cards'>
                                {nextForecasts &&
                                    nextForecasts.map((forecastItem, index) => (
                                        <div className='forecast' key={index}>
                                            <FiveDaysForecast
                                                dayOfWeek={dayOfWeekArray[index]}
                                                forecastItem={forecastItem}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )}
                </>

            )}

        </div>
    );
}

export default WeatherDisplay;