# gis-data-catalog-server
GIS Data Catalog Express Server and API

Requires a file named credentials.js be created at the root level with exported dbuser and dbpassword properties.
```
module.exports = {
   dbuser:'database user',
   dbpassword: 'database password'
};
```

Requires a certificate and key at the root level referenced in server.js
