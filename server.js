const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require(path.join(__dirname, 'routes/api'));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const httpPort = process.env.PORT || '3000';
const httpServer = http.createServer(app);
httpServer.listen(httpPort, () => console.log(`API http on:${httpPort}`));


const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'selfsigned.key')),
  cert: fs.readFileSync(path.join(__dirname, 'selfsigned.crt')),
  ciphers: [
    "ECDHE-RSA-AES256-SHA384",
    "DHE-RSA-AES256-SHA384",
    "ECDHE-RSA-AES256-SHA256",
    "DHE-RSA-AES256-SHA256",
    "ECDHE-RSA-AES128-SHA256",
    "DHE-RSA-AES128-SHA256",
    "HIGH",
    "!aNULL",
    "!eNULL",
    "!EXPORT",
    "!DES",
    "!RC4",
    "!MD5",
    "!PSK",
    "!SRP",
    "!CAMELLIA"
  ].join(':'),
  honorCipherOrder: true
};
const httpsPort = '3443';
const httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(httpsPort, () => console.log(`API https on: ${httpsPort}`));