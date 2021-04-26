// Logic
const mongoose = require('mongoose');

module.exports = (config, logger) => {
    // using new syntax for mongoose library
    // check the mongoose doc for more info
    mongoose.Promise = global.Promise;
	mongoose.set('useCreateIndex', true);
    mongoose.set('debug', config.debug); // for dev needs, help you understand executed db quiries.
    const options = {
        useNewUrlParser: true,
        keepAlive: 30000,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
    mongoose.connect(config.db, options);

    // CONNECTION EVENTS
	mongoose.connection.on('open', () => {
		logger.info(`[*] Establishing Database Connection.`);
	});
	mongoose.connection.on('connected', () => {
		logger.info(`[*] Database Connected.`);
	});
	mongoose.connection.on('error', (err) => {
		logger.error(`[*] Database connection error: ${err}`);
		mongoose.connect(config.db, options);
	});
	mongoose.connection.on('disconnected', () => {
		logger.warn('[*] Database Disconnected.');
		mongoose.connect(config.db, options);
	});
};
