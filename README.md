[![tests](https://github.com/pfapi/redis-cluster-service/actions/workflows/tests.yml/badge.svg)](https://github.com/pfapi/redis-cluster-service/actions/workflows/tests.yml)

# redis-cluster-service

In many situations, we just need a redis-server service as the same way as other services: nginx, mysql and postgres that we can use systemctl to start and stop it. 

redis-cluster-service is a github action to install latest redis server and redis cluster as service for ubuntu-latest. 

In your github action, you can run

```bash
sudo systemctl start redis-cluster.service
```

The cluster nodes listen on port 7000, 7001, 7002, 7003, 7004 and 7005.

if you just want to run the redis server:

```bash
sudo systemctl start redis-server.service
```

redis server listens on the standard port 6379.

