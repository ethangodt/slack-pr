// handle the period slack sslHealthPings...
module.exports = function (req, res, next) {
	if (req.query.ssl_check) {
		res.status(200).end();
	} else {
		next();
	}
};
