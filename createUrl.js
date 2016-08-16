const url = require('url');
const makeAbs = require('./utils/makeAbs');
const removeTrailingSlash = require('./utils/removeTrailingSlash');

module.exports = function(p, token, root) {
	p = makeAbs(p);
	root = removeTrailingSlash(makeAbs(root));

	return makeAbs(url.resolve(root, token + p.replace(root, '')));
};