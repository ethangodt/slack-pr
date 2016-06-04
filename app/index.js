import express from 'express';
import morgan from 'morgan';
import config from './config';
import routes from './routes';
import bodyParser from 'body-parser';
import error from './middleware/errors';
import sslHealthCheck from './middleware/sslHealthCheck';

const app = express();

if (config.dev_mode) {
	app.use(morgan('tiny'));
}

app.use(bodyParser.json());
app.use(sslHealthCheck);
app.use(function (req, res, next) {
	console.log('from config', config.prSlashToken);
	console.log('from header', req.get('token'));
	console.log('from body', req.body.token);
	next();
});

app.use('/', routes);
// catch-all for testing
app.use('/', function (req, res) {
	res.status(200).send('I\'m awake');
});

// basic error handling
app.use(error.logger);
app.use(error.catchAll);

app.listen(config.port, function () {
	console.log(`App is listening on ${config.port}`);
});
