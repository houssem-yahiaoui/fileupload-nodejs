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
    // removing x-powered-by header for some security issues
    app.use((req, res, next) => {
      res.removeHeader('x-powered-by');
      next();
    });

    //[*]Routes Configuration
    let api = require('../routings/routing.js');
    app.use('/api', api);
};
