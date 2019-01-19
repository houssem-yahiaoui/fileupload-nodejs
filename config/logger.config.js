const winston = require('winston');

const tsFormat = () => new Date().toLocaleTimeString();

const logger = new winston.Logger({
  transports: [
    // colorize the output to the console
    new winston.transports.Console({
      name: 'info-logger',
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new winston.transports.Console({
      name: 'error-logger',
      timestamp: tsFormat,
      colorize: true,
      level: 'error'
    })
  ]
});

module.exports = logger;
