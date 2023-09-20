import express from 'express';
import * as dotenv from 'dotenv';
import searchRoute from "./routes/searchRoute.js";
import cors from 'cors';
import mongoose from 'mongoose';
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error);

app.use('/city', searchRoute);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
