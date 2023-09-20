import mongoose from "mongoose";
import { Schema } from "mongoose";

const citySchema = new Schema({
    name: String,
    country_name: String,
    coord: {
        lon: Number,
        lat: Number,
    },
});

const City = mongoose.model('City', citySchema);

export default City;