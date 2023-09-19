import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import locationReducer from "../features/locationSlice";
import hourlyWeatherReducer from "../features/hourlyWeatherSlice";
import currentWeatherReducer from "../features/currentWeatherSlice";

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        location: locationReducer,
        hourlyWeather: hourlyWeatherReducer,
        currentWeather: currentWeatherReducer,
    }
});

export default store;