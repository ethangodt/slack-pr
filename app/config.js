module.exports = {
	dev_mode: (process.env.NODE_ENV === 'development'),
	port: process.env.PORT,
	prSlashToken: process.env.PR_SLASH_TOKEN,
	mongoURI: process.env.MONGODB_URI,
	githubUsername: process.env.GITHUB_USERNAME,
	githubPassword: process.env.GITHUB_PASSWORD,
	host: process.env.HOST,
	slackWebHookURL: process.env.SLACK_WEBHOOK_URL,
};
