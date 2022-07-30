'use strict';

const path = require('path');
const fs = require('fs');
const os = require('os');
const { execSync } = require('child_process');

const script = `
#!/bin/bash

set -e

curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update -y

sudo apt-get install redis -y

sudo sed -i 's/protected-mode yes/protected-mode no/' /etc/redis/redis.conf
`;

module.exports = () => {
    const script_filepath = path.join(os.tmpdir(), 'install-redis.sh');
    fs.writeFileSync(script_filepath, script);
    fs.chmodSync(script_filepath, '755');
    execSync(script_filepath, {stdio: 'inherit'});
    fs.unlinkSync(script_filepath);
}