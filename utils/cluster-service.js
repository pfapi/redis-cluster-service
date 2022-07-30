module.exports = `
[Unit]
Description=Redis Cluster Service

[Service]
Type=oneshot
ExecStart=systemctl start redis-7000 ; systemctl start redis-7001 ; systemctl start redis-7002 ; systemctl start redis-7003 ; systemctl start redis-7004 ; systemctl start redis-7005
Restart=systemctl restart redis-7000 ; systemctl restart redis-7001 ; systemctl restart redis-7002 ; systemctl restart redis-7003 ; systemctl restart redis-7004 ; systemctl restart redis-7005
ExecStop=systemctl stop redis-7000 ; systemctl stop redis-7001 ; systemctl stop redis-7002 ; systemctl stop redis-7003 ; systemctl stop redis-7004 ; systemctl stop redis-7005
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
`;