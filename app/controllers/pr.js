import github from './github';
import slackFormatter from '../utils/slackFormatter';
import parse from 'url-parse';

function getPRData (req, res) {
	const url = parse(req.body.text);
	const chunkedPathname = url.pathname.split('/').slice(1);
	const user = chunkedPathname[0];
	const repo = chunkedPathname[1];
	const number = chunkedPathname[3];

	github.pullRequests.get({ user, repo, number }, function (err, pullData) {
		github.issues.get({user, repo, number}, function (err, issueData) {
			res.setHeader('Content-Type', 'application/json');
			res.status(200);
			res.send(JSON.stringify({
				...slackFormatter.pr({
					author_name: pullData.user.login,
					author_icon: pullData.user.avatar_url,
					title: pullData.title,
					title_link: pullData.html_url,
					number: pullData.number,
					orgOrUser: pullData.base.user.login,
					repo: pullData.base.repo.name,
					branch: pullData.base.ref,
					labels: issueData.labels.map(issue => issue.name),
				})
			}));
		});
	});
}

export default {
	getPRData
};

