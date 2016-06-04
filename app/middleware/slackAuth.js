import config from '../config';

function prSlash (req, res, next) {
	console.log(JSON.stringify(req.query));
	if (req.body.token !== config.prSlashToken) {
		next(new Error('The /pr Slack token is incorrect'));
	}
	next();
}

export default {
	prSlash
};
