const path = require('path');

module.exports = p => {
	if (p.indexOf('.') !== 0) {
		const begining = p[0] === path.sep ? '.' :
			p[1] === path.sep ? '.' : './';
		return begining + p;
	}
	return p;
};