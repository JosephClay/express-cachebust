const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const makeRel = require('./utils/makeRel');

const attempt = fn => {
	try {
		return fn();
	} catch(err) {
		return err;
	}
};

const isError = obj => Object.prototype.toString.call(obj) === '[object Error]';

module.exports = function(p) {
	const ext = path.extname(p);
	const filePath = path.resolve(path.normalize(makeRel(p)));

	if (!ext) {
		console.error('cachebust: cannot inline a directory', p);
		return false;
	}

	const file = attempt(() => fs.readFileSync(filePath));
	if (isError(file)) {
		console.error('cachebust: missing file at', p);
		return false;
	}

	return crypto.createHash('md5')
		.update(file.toString())
		.digest('hex');
};