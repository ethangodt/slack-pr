import Subscription from '../model/subscription';

function findAllByIssue (issueID, cb) {
	Subscription.find({ issueID }, function (err, docs) {
		if (err) {
			console.error(err);
		}
		cb(err, docs);
	})
}

function upsert (subInfo, cb) {
	Subscription.findOneAndUpdate(subInfo, subInfo, { new: true, upsert: true }, function (err, doc) {
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

