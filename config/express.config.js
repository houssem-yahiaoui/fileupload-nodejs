"use strict";

let bodyParser = require('body-parser'),
    logger = require('morgan'),
    busboyBodyParser = require('busboy-body-parser'),
    express = require('express'),
    path = require('path');

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(busboyBodyParser({ limit: '5mb' }));
    app.use(logger('dev'));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    //[*]Routes Configuration
    let main = require('../routings/routing.js');
    app.use('/api', main);
};
