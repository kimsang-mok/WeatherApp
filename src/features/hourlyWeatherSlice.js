import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getCommonQueryParams } from "../utils/api";
import { createWeatherSlice } from "../utils/weatherSliceCreator";

export const fetchHourlyWeather = createAsyncThunk(
    "hourlyWeather/fetchHourlyWeather",
    async (coords) => {
        const commonParams = getCommonQueryParams(coords);
        const response = await api.get(`forecast/hourly?${commonParams}`);
        return response.data;
    }
);

const hourlyWeatherSlice = createWeatherSlice("hourlyWeather", fetchHourlyWeather);

export default hourlyWeatherSlice.reducer;