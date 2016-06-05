// req handler for /webhooks/pr
var config = require('../config'); // was this import just a WebStorm/Babel error?
import subscription from '../controllers/subscription';
import request from 'request';
import slackFormatter from '../utils/slackFormatter';

function notifySubscribers (req, res, next) {
	const event = (req.body.issue) ? 'issue' : 'pull_request';
	try {
		var comment = {
			issueID: req.body[event].id,
			author_name: req.body.comment.user.login,
			author_icon: req.body.comment.user.avatar_url,
			title: req.body[event].title,
			title_link: req.body[event].html_url,
			text: req.body.comment.body
		};
	} catch (err) {
		console.error(err);
		res.end();
		return;
	}

	subscription.findAllByIssue(comment.issueID, function (err, recipients) {
		if (err) {
			console.error('DB error searching for subscriptions');
			res.end();
		}

		let completedNotifications = 0;
		recipients.forEach((recipient) => {
			// todo add the json flag
			request.post(config.slackWebHookURL, { body: { ...slackFormatter.subUpdate(comment, recipient.username) }, json: true }, function (err, status) {
				console.log(status);
				if (++completedNotifications === recipients.length) {
					console.log(`Successfully relayed comments to ${recipients.length} subscribers`)
					res.status(200).end();
				}
			})
		});
	});
}

export default {
	notifySubscribers
}
