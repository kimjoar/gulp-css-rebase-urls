var rework = require('rework');
var path = require('path');
var through = require('through2');
var validator = require('validator');

var isAbsolute = function(p) {
    var normal = path.normalize(p);
    var absolute = path.resolve(p);
    return normal == absolute;
}

var rebaseUrls = function(css, options) {
    return rework(css)
        .use(rework.url(function(url){
            if (isAbsolute(url) && validator.isURL(url)) {
                return url;
            }
            var absolutePath = path.join(options.currentDir, url)
            var p = path.relative(options.root, absolutePath);

            if (process.platform === 'win32') {
                p = p.replace(/\\/g, '/');
            }

            return p;
        }))
        .toString()
}

module.exports = function(options) {
    options = options || {};
    var root = options.root || '.';

    return through.obj(function(file, enc, cb) {
        var css = rebaseUrls(file.contents.toString(), {
            currentDir: path.dirname(file.path),
            root: path.join(file.cwd, root)
        });

        file.contents = new Buffer(css);

        this.push(file);
        cb();
    });
}
