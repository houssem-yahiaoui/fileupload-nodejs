"use strict";
let mongoose = require('mongoose');

module.exports = (config) => {
    var dbURI = config.dev.db;
    
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
};
