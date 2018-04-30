"use strict";
let mongoose = require('mongoose');

// activating Promises for mongoose
mongoose.Promise = global.Promise;

module.exports = (config) => {
    var dbURI = config.dev.db;
    
    // using new syntax for mongoose library
    // check the mongoose doc for more info
    mongoose.connect(dbURI)
      .then(() => {
          console.log(`[*] Connected to Database`);
      })
      .catch(err => {
          console.log(`[*] Error while connecting to DB, with error: ${err}`)
      });
};
