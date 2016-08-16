module.exports = p => {
	return p[p.length - 1] === '/' ? p.substr(0, p.length - 1) : p;
};
