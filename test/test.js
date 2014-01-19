var fs = require('fs');
var path = require('path');
var assert = require('assert');
var gutil = require('gulp-util');
var cssRebaseUrls = require('../index');

var testPath = path.join(path.resolve('.'), 'css');

var read = function(name) {
    return fs.readFileSync(path.join(__dirname, name));
}

it('when root is not specified', function(cb) {
    var stream = cssRebaseUrls();

    stream.on('data', function(file) {
        assert.equal(file.contents.toString('utf8'), read('1-expected.css').toString('utf-8'));
        cb();
    });

    stream.write(new gutil.File({
        base: testPath,
        path: testPath + '/style.css',
        contents: read('1-test.css')
    }));

    stream.end();
});


it('when root is specified', function(cb) {
    var stream = cssRebaseUrls({ root: './css' });

    stream.on('data', function(file) {
        assert.equal(file.contents.toString('utf8'), read('2-expected.css').toString('utf-8'));
        cb();
    });

    stream.write(new gutil.File({
        base: testPath,
        path: testPath + '/style.css',
        contents: read('2-test.css')
    }));

    stream.end();
});

