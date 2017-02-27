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

### Heroku Deployment
```
heroku create
git push heroku master
heroku config:set DBUSER='username'
heroku config:set DBPASSWORD='password'
heroku config:set DBHOST='database host'
heroku config:set DBPORT= database port
heroku config:set DBNAME='database name'
```

### Docker Deployment
```
docker run -d -p 80:3000 --env-file ./.env --name gis-data-catalog-server sagewall/gis-data-catalog-server
```