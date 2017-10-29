const pathCache = Object.create(null);
const tokenCache = Object.create(null);
const reversePathCache = Object.create(null);

const makeAbs = require('./utils/makeAbs');
const removeTrailingSlash = require('./utils/removeTrailingSlash');

const createToken = require('./createToken');
const createUrl = require('./createUrl');

const middleware = root => {
	root = removeTrailingSlash(makeAbs(root));

	return (req, res, next) => {
		const reroutePath = reversePathCache[req.url];
		if (!reroutePath) return next();

		req.url = reroutePath;
		next('route');
	};
};

module.exports = Object.assign(middleware, {
	tokenize(root = './') {
		return function(p) {
			if (pathCache[p]) return pathCache[p];

			// create a token from the file
			const token = createToken(p);
			// if we fail, return back the original path
			if (token === false) { return p; }
			tokenCache[p] = token;

			const path = pathCache[p] = createUrl(p, token, root);
			reversePathCache[path] = p;
			return path;
		};
	}
});