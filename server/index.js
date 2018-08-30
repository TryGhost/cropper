const path = require('path');
const express = require('express');
const server = require('ghost-ignition').server;
const app = express();
const createSharpMiddleware = require('./sharp-middleware');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/transform', createSharpMiddleware());

server.start(app);
