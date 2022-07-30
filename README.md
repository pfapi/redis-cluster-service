# redis-cluster-service

a github action to install redis server and redis cluster as service for ubuntu-latest.

It installs the latest redis server service and setup redis cluster for ubuntu-latest.

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

