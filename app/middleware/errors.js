import slackFormatter from '../utils/slackFormatter';

// logs the errors
function logger (err, req, res, next) {
	console.error(err);
	next(err);
}

// catch all error handler
function generalHandler (err, req, res) {
	// the specific error messasge if the error has client = true
	// or some default slack error message
	const message = err.forClient && err.message;
	res.status(500).json(slackFormatter.error(message));
}

module.exports = {
	logger,
	generalHandler
};
