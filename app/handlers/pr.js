// req handler for /commands/pr
import github from './../controllers/github';
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
		if (err) {
			const pullError = new Error('GitHub error on pull request. PR probably does not exist.')
			next(pullError);
			return;
		}

		github.api.issues.get(PRInfo, function (err, issue) {
			if (err) {
				const issueError = new Error('GitHub error on issue. Probably a really weird error.');
				next(issueError);
				return;
			}

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
		if (err) {
			const pullError = new Error('GitHub error on pull request. Could be authentication or could not exist.');
			next(pullError);
			return;
		}

		github.api.issues.get(PRInfo, function (err, issue) {
			if (err) {
				const issueError = new Error('GitHub error on issue. Probably a really weird error.');
				next(issueError);
				return;
			}

			const sub = {
				userID: req.body.user_id,
				username: req.body.user_name,
				issueID: issue.id,
			};

			subscription.upsert(sub, function (err, doc) {
				if (err) {
					const dbError = new Error('Seems like there was an internal error with the database');
					dbError.forClient = true;
					next(dbError);
					return;
				}

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
