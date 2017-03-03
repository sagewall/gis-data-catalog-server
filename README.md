# gis-data-catalog-server
GIS Data Catalog Express Server and API

Requires environment variables
```
DBUSER=username
DBPASSWORD=password
DBHOST=database host
DBPORT=database port
DBNAME=database name
CERTBOTRESPONSE=certbot acme response
```

### Heroku Deployment
```
heroku create
git push heroku master
heroku config:set DBUSER=username
heroku config:set DBPASSWORD=password
heroku config:set DBHOST=database host
heroku config:set DBPORT=database port
heroku config:set DBNAME=database name
heroku config:set CERTBOTRESPONSE=certbot acme response
```

### Docker Deployment
```
docker run -d -p 80:3000 -e DBUSER='database user' -e DBPASSWORD='database password' -e DBHOST='host name' -e DBPORT=port -e DBNAME='database name' gis-data-catalog-server
```