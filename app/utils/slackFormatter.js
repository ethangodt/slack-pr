import tryprGenerator from './tryprGenerator';

// todo refactor this so signature doesn't seem crazy
function pr ({ author_name, author_icon, title, title_link, orgOrUser, repo, branch, number, labels }) {
	return {
		response_type: 'in_channel',
		attachments: [
			{
				fallback: 'A PR link',
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

function error (message) {
	return {
		text: 'I\'m sorry. It looks like an error has occurred. Please double check the information you\'re providing.',
	}
}

function subSuccess (num) {
	return {
		response_type: 'ephemeral',
		text: `You\'ll be notified of new comments on #${num} going forward. :thumbsup:`
	}
}

function subUpdate () {
	return {
		response_type: 'in_channel',
		attachments: [
			{
				fallback: 'A PR link',
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

module.exports = {
	pr,
	error,
	subSuccess,
	subUpdate
};
