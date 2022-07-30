[![tests](https://github.com/pfapi/redis-cluster-service/actions/workflows/tests.yml/badge.svg)](https://github.com/pfapi/redis-cluster-service/actions/workflows/tests.yml)

# redis-cluster-service

In many situations, we just need a redis-server service as the same way as other services: nginx, mysql and postgres that we can use systemctl to start and stop it. 

redis-cluster-service is a github action to install latest redis server and redis cluster as service for ubuntu-latest. 

## How to Use

```yaml
      - name: install redis cluster service
        uses: pfapi/redis-cluster-service@1.0.2
```

The cluster nodes listen on port 7000, 7001, 7002, 7003, 7004 and 7005.

redis server listens on the standard port 6379.

## Full Example

```yaml
name: redis cluster services

on: workflow_dispatch

jobs:
  
  test-action:

    runs-on: ubuntu-latest

    name: run redis cluster services

    steps:

      - name: install redis cluster service
        uses: pfapi/redis-cluster-service@1.0.2

      - name: start redis cluster
        run: sudo systemctl start redis-cluster

      - name: check cluster
        run: redis-cli --cluster check 127.0.0.1:7000

      - name: stop redis cluster
        run: sudo systemctl stop redis-cluster

      - name: start redis server
        run: sudo systemctl start redis-server

      - name: test redis
        run: redis-cli set key value ; redis-cli get key

      - name: stop redis server
        run: sudo systemctl stop redis-server
```

