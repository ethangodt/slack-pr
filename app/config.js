module.exports = {
	dev_mode: (process.env.NODE_ENV === 'development'),
	port: process.env.PORT,
	prSlashToken: process.env.PR_SLASH_TOKEN,
};
