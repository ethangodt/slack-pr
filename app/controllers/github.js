var config =  require('../config');
import GitHubApi from 'github';
const github = new GitHubApi();

function findAllWebHooks (userOrOrg, repo, cb) {
	github.authenticate({
		type: "basic",
		username: config.githubUsername,
		password: config.githubPassword,
	});
	github.repos.getHooks({ user: userOrOrg, repo }, function (err, hooks) {
		if (err) {
			console.error(err);
		}
		cb(err, hooks);
	})
}

function addWebHook (userOrOrg, repo, cb) {
	github.authenticate({
		type: "basic",
		username: config.githubUsername,
		password: config.githubPassword,
	});

	const hookData = {
		user: userOrOrg,
		repo,
		name: 'web',
		config: {
			content_type: "json",
			insecure_ssl: "1", // does this matter at all internally?
			secret: "chimichanga",
			url: config.host + "/webhooks/github",
		},
		active: true,
	};

	github.repos.createHook(hookData, function (err, newHook) {
		if (err) {
			console.error(err);
		}
		cb(err, newHook);
	})
}

// "upsert" web hook
function upsertWebHook (userOrOrg, repo, cb) {
	findAllWebHooks(userOrOrg, repo, function (err, hooks) {
		// todo add 404 error for no permission
		const ourHook = hooks.find(hook => hook.config.url === config.host + '/webhooks/github');
		if (!ourHook) {
			addWebHook(userOrOrg, repo, function (err, newHook) {
				cb(newHook);
			})
		} else {
			cb(ourHook)
		}
	});
}

export default {
	findAllWebHooks,
	addWebHook,
	upsertWebHook,
	api: github,
}
