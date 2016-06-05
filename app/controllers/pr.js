import github from './github';
import subscription from './../controllers/subscription';
import slackFormatter from '../utils/slackFormatter';
import chunkPRUrl from '../utils/chunkPRUrl';

function skipToSubChain (req, res, next) {
	const args = req.body.text.split(' ');
	if (args.includes('sub')) {
		next('route');
	} else {
		next();
	}
}

function getPRData (req, res, next) {
	const PRInfo = chunkPRUrl(req.body.text);
	github.api.pullRequests.get(PRInfo, function (err, pull) {
		github.api.issues.get(PRInfo, function (err, issue) {
			res.json({
				...slackFormatter.pr({
					author_name: pull.user.login,
					author_icon: pull.user.avatar_url,
					title: pull.title,
					title_link: pull.html_url,
					number: pull.number,
					orgOrUser: pull.base.user.login,
					repo: pull.base.repo.name,
					branch: pull.base.ref,
					labels: issue.labels.map(issue => issue.name),
				})
			});
		});
	});
}

function setupSubscription (req, res, next) {
	const url = req.body.text.split(' ')[1];
	const PRInfo = chunkPRUrl(url);
	github.upsertWebHook(PRInfo.user, PRInfo.repo, function (err, hook) {
		github.api.issues.get(PRInfo, function (err, issue) {
			const sub = {
				userID: 12345,
				username: 'ethangodt',
				issueID: issue.id,
			};
			subscription.upsert(sub, function (err, doc) {
				res.json({
					...slackFormatter.subSuccess(issue.number)
				})
			})
		});
	});
}

export default {
	getPRData,
	skipToSubChain,
	setupSubscription,
};
