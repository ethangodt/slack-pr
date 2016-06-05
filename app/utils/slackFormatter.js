import tryprGenerator from './../utils/tryprGenerator';
import trimLength from './../utils/trimLength';

// todo refactor this so signature doesn't seem crazy
function pr ({ author_name, author_icon, title, title_link, orgOrUser, repo, branch, number, labels }) {
	return {
		response_type: 'in_channel',
		attachments: [
			{
				color: '#333',
				author_name,
				author_icon,
				title,
				title_link,
				text: `_${orgOrUser}/${repo}/${branch} #${number}_ \n \`${tryprGenerator()}\``,
				footer: labels.join(' | '),
				mrkdwn_in: ['text']
			}
		]
	}
}

function error (message = 'It looks like an error has occurred. Please double check the information you\'re providing. :sad:') {
	return {
		response_type: 'ephemeral',
		text: message
	}
}

function subSuccess (num) {
	return {
		response_type: 'ephemeral',
		text: `You\'ll be notified of new comments on #${num} going forward. :thumbsup:`
	}
}

function subUpdate (comment, recipient) {
	return {
		channel: `@${recipient}`,
		attachments: [
			{
				fallback: `${comment.author_name} just commented on ${comment.title}`,
				author_name: `${comment.author_name} commented on:`,
				color: '#333',
				author_icon: comment.author_icon,
				title: comment.title, // feat(this/thing): making it all better
				title_link: comment.title_link,
				text: trimLength(comment.text, 200)
			}
		]
	}
}

export default {
	pr,
	error,
	subSuccess,
	subUpdate
};
