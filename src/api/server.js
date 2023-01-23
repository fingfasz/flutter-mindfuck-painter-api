require('dotenv').config();
const express = require('express');
const server = express();
const usersRouter = require('./routes/users_router');
const relationshipsRouter = require('./routes/relationships_router');
const http = require('http');
const https = require('https');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api/users', usersRouter);
server.use('/api/relationships/', relationshipsRouter);

server.listen(process.env.API_PORT, (err) => {
    if (err) {
        console.log(`Server startup error: ${err}`);
    } else {
        console.log(`Server listening on port: ${process.env.API_PORT}`);
    }
});