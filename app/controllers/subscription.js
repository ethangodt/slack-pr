import Subscription from '../model/subscription';

function findAllByIssue (pullRequestURL, cb) {
	Subscription.find({ pullRequestURL }, function (err, docs) {
		if (err) {
			console.error(err);
		}
		cb(err, docs);
	})
}

function upsert (sub, cb) {
	Subscription.findOneAndUpdate(sub, sub, { new: true, upsert: true }, function (err, doc) {
		if (err) {
			console.error(err);
		}
		cb(err, doc);
	})
}

function remove () {

}

export default {
	findAllByIssue,
	upsert,
}

