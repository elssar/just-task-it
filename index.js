import express from 'express';
import 'dotenv/config';

import health_router from './src/routes/healthcheck.js';
import lift from './src/config.js';

const app = express();
const configuration = lift();

// Global middlewares
app.use(express.json());

// Routes
app.use('/hc', health_router);

app.listen(configuration.srv.port,  () => {
    console.log(`App started on port ${configuration.srv.port} in ${configuration.srv.env} environment`);
});

