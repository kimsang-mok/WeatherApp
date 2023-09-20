import mongoose from "mongoose";
import { importCityData } from "./controllers/cityController.js";
import * as dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI)

async function main() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await importCityData()

        console.log('Data imported successfully');
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        mongoose.disconnect();
    }
}

main();