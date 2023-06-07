import express from 'express';
import 'dotenv/config';

import setup_db from './src/database.js';
import lift from './src/config.js';

import { error_handler } from './src/middlewares/error.js';

import health_router from './src/routes/healthcheck.js';
import user_router from './src/routes/user.js';
import list_router from './src/routes/list.js';
import todo_router from './src/routes/todo.js';

const app = express();
const configuration = lift();

await setup_db(configuration.database);

// Global middlewares
app.use(express.json());

// Routes
app.use('/hc', health_router);
app.use('/users', user_router);
app.use('/lists', list_router);
app.use('/todos', todo_router);

// Error handlers
app.use(error_handler);

app.listen(configuration.srv.port,  () => {
    console.log(`App started on port ${configuration.srv.port} in ${configuration.srv.env} environment`);
});

