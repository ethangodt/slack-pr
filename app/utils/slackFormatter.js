import tryprGenerator from './tryprGenerator';

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

module.exports = {
	pr,
	error
};
