import parse from 'url-parse';

function chunkPRURL (url) {
	const chunkedUrl = parse(url);
	const chunkedPathname = chunkedUrl.pathname.split('/').slice(1);
	return {
		user: chunkedPathname[0],
		repo: chunkedPathname[1],
		number: chunkedPathname[3],
	}
}

export default chunkPRURL;


