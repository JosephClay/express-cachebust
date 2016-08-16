const test = require('tape');

const makeAbs = require('../utils/makeAbs');
test('makeAbs', assert => {
	assert.equal(makeAbs('/foo'), '/foo', 'correctly formatted path is unaltered');
	assert.equal(makeAbs('foo'), '/foo', 'adds starting slash if none exists');
	assert.equal(makeAbs('./foo'), '/foo', 'normalizes .');
	assert.equal(makeAbs('../foo'), '/foo', 'normalizes ..');

	assert.end();
});

const makeRel = require('../utils/makeRel');
test('makeRel', assert => {
	assert.equal(makeRel('./bar'), './bar', 'relative path is unaltered');
	assert.equal(makeRel('/bar'), './bar', 'adds starting . if none exists');
	assert.equal(makeRel('bar'), './bar', 'adds starting ./ if none exists');

	assert.end();
});

const removeTrailingSlash = require('../utils/removeTrailingSlash');
test('removeTrailingSlash', assert => {
	assert.equal(removeTrailingSlash('/baz'), '/baz', 'correctly formatted path is unaltered');
	assert.equal(removeTrailingSlash('/baz/'), '/baz', 'removes trailing slash');

	assert.end();
});

const createUrl = require('../createUrl');
test('createUrl', assert => {
	const p = '/public/app.js';
	const token = 'wibblywobbly';
	const root = '/public';
	const expected = '/wibblywobbly/app.js';

	assert.equal(createUrl(p, token, root), expected, 'correctly creates a url');

	assert.end();
});

const createToken = require('../createToken');
test('createToken', assert => {
	const dirPath = './test/';
	const missingPath = './test/foo.txt';
	const filePath = './test/test.txt';

	assert.doesNotThrow(() => createToken(dirPath), 'passing a dir fails gracefully');
	assert.equal(createToken(dirPath), false, 'false return for dir');

	assert.doesNotThrow(() => createToken(missingPath), 'passing a missing file fails gracefully');
	assert.equal(createToken(missingPath), false, 'false return for missing file');

	assert.equal(typeof createToken(filePath) === 'string', true, 'passing a valid file creates a string');
	assert.equal(createToken(filePath).length, 32, 'string is the correct length');

	assert.end();
});