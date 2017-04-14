const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const api = require(path.join(__dirname, 'routes/api'));
const certbotResponse = process.env.CERTBOTRESPONSE;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/.well-known/acme-challenge/:content', (req, res) => {
  res.send(certbotResponse);
});

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => console.log(`API listening on: ${port}`));