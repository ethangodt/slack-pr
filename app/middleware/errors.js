// logs the errors
function logger (err, req, res, next) {
	console.error(err);
	next(err);
}

// catch all error handler
function catchAll (err, req, res) {
	res.status(500).send(err.message);
}

module.exports = {
	logger,
	catchAll
};
