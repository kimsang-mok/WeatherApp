import { createSlice } from '@reduxjs/toolkit';

export const createWeatherSlice = (sliceName, asyncAction) => {
    return createSlice({
        name: sliceName,
        initialState: { data: {}, status: 'idle', error: null },
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(asyncAction.pending, (state) => {
                state.status = 'loading';
            });
            builder.addCase(asyncAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            });
            builder.addCase(asyncAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        }
    });
};