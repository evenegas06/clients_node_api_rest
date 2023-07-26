import express from 'express';
import mongoose from "mongoose";
import cors from "cors";

import client_routes from './routes/api/clientRoutes.js';
import product_routes from './routes/api/productRoutes.js';
import order_routes from './routes/api/orderRoutes.js';

/* ----- Create app ----- */
const app = express();

/* ----- DB connection ----- */
mongoose.connect('mongodb://127.0.0.1:27017/node_api_rest')
    .then(() => console.log('Database connected'))
    .catch((error) => console.error(error));

/* ----- Enable read form data and application json ----- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ----- Cors ----- */
app.use(cors());

/* ----- Routing ----- */
app.use('/api', [client_routes, product_routes, order_routes]);

/* ----- Port and init server ----- */
app.listen(5000, () => {
    console.log(`Server listening on port 5000 -> http://localhost:5000`);
});