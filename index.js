import express from 'express';
import 'dotenv/config';

import setup_db from './src/database.js';
import health_router from './src/routes/healthcheck.js';
import lift from './src/config.js';

const app = express();
const configuration = lift();

await setup_db(configuration.database);

// Global middlewares
app.use(express.json());

// Routes
app.use('/hc', health_router);

app.listen(configuration.srv.port,  () => {
    console.log(`App started on port ${configuration.srv.port} in ${configuration.srv.env} environment`);
});

