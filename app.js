// loading modules
const express = require('express');
const config = require('./config/config');
var app = express();

// Express conf !
require('./config/express.config')(app);
// Mongoose Conf !
require('./config/mongoose.config')(config);


// using express.static for loading the static files
const publicPath = `${__dirname}/public`;
app.use(express.static(publicPath));

app.listen(config.dev.port, () => {
  console.log(`Listening on localhost:${config.dev.port}`);
});
