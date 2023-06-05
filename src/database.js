import Sequelize from 'Sequelize';

import { initialize as init_hc } from './models/healthcheck.model.js';

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
}

export default connect;

