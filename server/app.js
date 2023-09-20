import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import searchRoute from "./routes/searchRoute.js";
import cors from 'cors';
import mongoose from 'mongoose';
dotenv.config();

const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI)

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error);


// Use routes
app.use('/city', searchRoute);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
