import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const api = axios.create({
    baseURL: "https://pro.openweathermap.org/data/2.5/",
    timeout: 5000,
    params: {
        units: "metric",
        appid: apiKey,
    }
});

function getCommonQueryParams(coords) {
    return `lat=${coords.latitude}&lon=${coords.longitude}`;
}

export { api, getCommonQueryParams };