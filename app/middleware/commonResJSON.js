// responds with everything previously added to req.response
module.exports = function (req, res, next) {
	res.json(req.response);
};
