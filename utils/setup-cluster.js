'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path')
const { execSync } = require('child_process');
const redis_config = require('./redis-conf');
const redis_service = require('./redis-service');
const cluster_service = require('./cluster-service');

const tmpdir = os.tmpdir();

const script = `
#!/bin/bash

set -e

sudo mv ${tmpdir}/7*.conf /etc/redis

sudo mv ${tmpdir}/redis-*.service /lib/systemd/system

sudo systemctl start redis-cluster.service

redis-cli --cluster create 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 --cluster-replicas 1 --cluster-yes

redis-cli --cluster check 127.0.0.1:7000

sudo systemctl stop redis-cluster.service
`;

module.exports = () => {
    for (let port = 7000; port < 7006; port++) {
        fs.writeFileSync(path.join(tmpdir, `${port}.conf`), redis_config(port));
        fs.writeFileSync(path.join(tmpdir, `redis-${port}.service`), redis_service(port));
    }
    fs.writeFileSync(path.join(tmpdir, 'redis-cluster.service'), cluster_service);
    const script_filepath = path.join(os.tmpdir(), 'setup-cluster.sh');
    fs.writeFileSync(script_filepath, script);
    fs.chmodSync(script_filepath, '755');
    execSync(script_filepath, {stdio: 'inherit'});
    fs.unlinkSync(script_filepath);
}
