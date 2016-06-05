// bootstrap thingz
require('babel-register');
require('babel-polyfill');
require('dotenv').config({ silent: true });
var config = require('./app/config');

// start the app
var mongoose = require('mongoose');
mongoose.connect(config.mongoURI);
require('./app/');
