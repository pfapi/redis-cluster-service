'use strict';

const { execSync } = require('child_process');
const core = require('@actions/core');
const install_redis = require('./utils/install-redis');
const setup_cluster = require('./utils/setup-cluster');

(async() => {
    try {
        let cluster = true;
        if (core.getInput('cluster') === 'false') cluster = false;
        console.log('install redis', {cluster});
        install_redis();
        if (cluster) {
            console.log('setup redis-cluster');
            setup_cluster();
        }
        execSync('redis-server -v', {stdio: 'inherit'});
    } catch (error) {
        core.setFailed(error.message);
    }
})();