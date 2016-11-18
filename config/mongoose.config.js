"use strict";
let mongoose = require('mongoose');

module.exports = (config) => {
    var dbURI = config.dev.db;
    /*if (process.env.NODE_ENV === 'production') {
        dbURI = process.env.MONGOLAB_URI;
    }*/

    mongoose.connect(dbURI);

    // CONNECTION EVENTS
    mongoose.connection.on('connected', function() {
        console.log('Mongoose connected to ' + dbURI);
    });
    mongoose.connection.on('error', function(err) {
        console.log('Mongoose connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose disconnected');
    });
    // BRING IN YOUR SCHEMAS & MODELS
    //require('./users');
};
