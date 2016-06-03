import express from 'express';
import morgan from 'morgan';
const app = express();

app.use(morgan('tiny'));

app.use(function (req, res) {
	res.status(200).send('It\'s working');
});

app.listen((process.env.PORT || 3000), function () {
	console.log('App is listening on 3000');
});
