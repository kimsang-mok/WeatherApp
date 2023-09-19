import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getCommonQueryParams } from "../utils/api";
import { createWeatherSlice } from "../utils/weatherSliceCreator";

export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (coords) => {
        const commonParams = getCommonQueryParams(coords);
        const response = await api.get(`forecast/daily?${commonParams}`);
        return response.data;
    }
);

const weatherSlice = createWeatherSlice("weather", fetchWeather);

export default weatherSlice.reducer;