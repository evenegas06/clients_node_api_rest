import express from 'express';
import mongoose from "mongoose";

import api_routes from './routes/api.js';

/* ----- Create app ----- */
const app = express();

/* ----- DB connection ----- */
mongoose.connect('mongodb://127.0.0.1:27017/node_api_rssssest')
    .then(() => console.log('Database connected'))
    .catch((error) => console.error(error));


app.use('/api', api_routes);

app.listen(5000, () => {
    console.log(`Server listening on port 500 -> http://localhost:5000`);
});