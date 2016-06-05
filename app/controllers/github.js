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
		events: [
			'issue_comment',
			'pull_request_review_comment',
		],
		config: {
			content_type: "json",
			insecure_ssl: "1", // does this matter at all internally?
			secret: "chimichanga",
			url: config.host + "/webhooks/github",
		},
		active: true,
	};

	github.repos.createHook(hookData, function (err, newHook) {
		cb(err, newHook);
	})
}

// "upsert" web hook
function upsertWebHook (userOrOrg, repo, cb) {
	findAllWebHooks(userOrOrg, repo, function (err, hooks) {
		if (err) {
			cb(err, hooks);
			return;
		}

		const ourHook = hooks.find(hook => hook.config.url === config.host + '/webhooks/github');
		if (!ourHook) {
			addWebHook(userOrOrg, repo, function (err, newHook) {
				if (err) {
					cb(err, newHook);
					return;
				}

				cb(err, newHook);
			})
		} else {
			cb(err, ourHook)
		}
	});
}

export default {
	findAllWebHooks,
	addWebHook,
	upsertWebHook,
	api: github,
}
