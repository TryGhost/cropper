const express = require('express');
const app = express();
const createSharpMiddleware = require('./sharp-middleware');

app.use(express.static('public'));

app.get('/transform', createSharpMiddleware());

app.listen(8080);
