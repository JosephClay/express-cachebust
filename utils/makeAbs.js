module.exports = p => {
	p = p.indexOf('..') === 0 ? p.substr(2) :
		p.indexOf('.') === 0 ? p.substr(1) :
		p;

	return p.indexOf('/') !== 0 ? `/${p}` : p;
};