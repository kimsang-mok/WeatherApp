import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// set a defualt geolocation value
const defaultGeolocation = {
    // default to Phnom Penh city
    latitude: 11.56245,
    longitude: 104.916008
};

export const fetchLocation = createAsyncThunk(
    'location/fetchLocation', () => {
        return new Promise((resolve, reject) => {
            // check if the geolocation API is supported by the browser
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                // if geolocation API is not supported
                reject(new Error("Geolocation is not supported by this browser."));
            }
        });
    });

const locationSlice = createSlice({
    name: 'location',
    initialState: { data: null, status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLocation.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchLocation.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        });
        builder.addCase(fetchLocation.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.data = defaultGeolocation;
        });
    }
});

export default locationSlice.reducer;