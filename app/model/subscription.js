import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
	userID: String, // Slack userID
	username: String, // Slack username
	pullRequestURL: String, // Github PR/issue ID
});

export default mongoose.model('subscription', subscriptionSchema);
