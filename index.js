'use strict';

const { execSync } = require('child_process');
const install_redis = require('./utils/install-redis');
const setup_cluster = require('./utils/setup-cluster');

(async() => {
    try {
        install_redis();
        setup_cluster();
        execSync('redis-server -v', {stdio: 'inherit'});
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
})();