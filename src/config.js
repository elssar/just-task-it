import has from 'lodash/has.js';
import set from 'lodash/set.js';
import defaultsDeep from 'lodash/defaultsDeep.js';
import reduce from 'lodash/reduce.js';

const BASE = {
    srv: {
        port: '3000',
        env: 'development'
    },
    database: {
        creds: {
            username: '',
            password: ''
        },
        port: '8000',
        migrate: 'false'
    }
};

function lift () {
    let env_config = reduce(process.env, (result, value, key) => {
        let config_key = key.toLowerCase()
                            .split('_')
                            .join('.');

        if (has(BASE, config_key)) {
            set(result, config_key, value);
        }

        return result;
    }, {});

    return defaultsDeep(env_config, BASE);
}

export default lift;

