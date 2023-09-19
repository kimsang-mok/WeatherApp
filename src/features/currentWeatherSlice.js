import { createAsyncThunk } from "@reduxjs/toolkit";
import {api, getCommonQueryParams} from "../utils/api";
import { createWeatherSlice } from "../utils/weatherSliceCreator";

export const fetchCurrentWeather = createAsyncThunk(
    "currentWeather/fetchCurrentWeather",
    async (coords) => {
        const commonParams = getCommonQueryParams(coords);
        const response = await api.get(`weather?${commonParams}`);
        return response.data;
    }
);

const currentWeatherSlice = createWeatherSlice("currentWeather", fetchCurrentWeather);

export default currentWeatherSlice.reducer;