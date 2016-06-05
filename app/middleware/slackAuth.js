import config from '../config';

function prSlash (req, res, next) {
	if (req.body.token !== config.prSlashToken) {
		const error = new Error('The Slack token for the /pr slash command is incorrect');
		error.forClient = true;
		next(error);
	}
	next();
}

export default {
	prSlash
};
