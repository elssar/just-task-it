import Sequelize from 'Sequelize';

import { initialize as init_hc } from './models/healthcheck.model.js';
import { initialize as init_user } from './models/user.model.js';
import { initialize as init_token } from './models/token.model.js';
import { initialize as init_list } from './models/list.model.js';
import { initialize as init_todo } from './models/todo.model.js';

async function connect (config) {
    const sq = new Sequelize(config.name, config.creds.username, config.creds.password, {
        host: config.host,
        port: config.port,
        dialect: 'postgres',
        pool: {
            min: 1,
            max: 5,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    });

    // check the connection
    try {
        await sq.authenticate();
        console.log('Database connection authenticated');
    }
    catch (err) {
        console.error('Unable to connect to database', err);
        throw err;
    }

    init_hc(sq);
    init_user(sq);
    init_token(sq);
    init_list(sq);
    init_todo(sq);
}

export default connect;

