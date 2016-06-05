// trims message and adds '...' to match length of chars
module.exports = function trimLength (text, length) {
	length = length || text.length;
	return text.substr(0, length - 3) + ((text.length > length - 3) ? '...' : '');
};
