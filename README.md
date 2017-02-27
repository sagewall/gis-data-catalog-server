# gis-data-catalog-server
GIS Data Catalog Express Server and API

Requires environment variables
```
DBUSER='username'
DBPASSWORD='password'
DBHOST='database host'
DBPORT='database port'
DBNAME='database name'
```

### Server Deployment 
Install node
```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install pm2
```
sudo npm install pm2 -g
pm2 start server.js
pm2 startup systemd
pm2 save
```

Forward :443 to :3443 with iptables-persistent.  May need to change network interface and ports.
```
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3443
sudo apt install iptables-persistent
```
To save or reload current iptables rules
```
sudo netfilter-persistent save
sudo netfilter-persistent reload
```