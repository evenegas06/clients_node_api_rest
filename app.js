import express from 'express';
import mongoose from "mongoose";

import client_routes from './routes/api/clientRoutes.js';

/* ----- Create app ----- */
const app = express();

/* ----- Enable read form data and application json ----- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ----- DB connection ----- */
mongoose.connect('mongodb://127.0.0.1:27017/node_api_rest')
    .then(() => console.log('Database connected'))
    .catch((error) => console.error(error));


app.use('/api', client_routes);

app.listen(5000, () => {
    console.log(`Server listening on port 500 -> http://localhost:5000`);
});