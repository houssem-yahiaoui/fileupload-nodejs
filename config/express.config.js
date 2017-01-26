"use strict";

const logger           = require('morgan'),
      busboyBodyParser = require('busboy-body-parser');

module.exports = (app) => {
    app.use(logger('dev'));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    app.use(busboyBodyParser({ limit: '10mb' }));  

    //[*]Routes Configuration
    let main = require('../routings/routing.js');
    app.use('/api', main);
};
