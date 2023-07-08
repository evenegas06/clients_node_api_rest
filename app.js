import express from 'express';

import router from './routes/index.js';

const app = express();

app.use('/', router);

app.listen(5000, () => {
    console.log(`Server listening on port 500 -> http://localhost:5000`);
});