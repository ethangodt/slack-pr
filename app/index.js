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
app.use(bodyParser.urlencoded({ extended: true }))

app.use(sslHealthCheck);
app.use(function (req, res, next) {
	console.log(req.body);
	next();
});

app.use('/', routes);

// to wake up the sleepy free heroku dyno
app.use('/', function (req, res) {
	res.status(200).send('I\'m awake');
});

// basic error handling
app.use(error.logger);
app.use(error.generalHandler);

app.listen(config.port, function () {
	console.log(`App is listening on ${config.port}`);
});
