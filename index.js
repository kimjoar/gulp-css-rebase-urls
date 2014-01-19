var es = require('event-stream');
var rework = require('rework');
var path = require('path');
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
            return path.relative(options.root, absolutePath);
        }))
        .toString()
}

module.exports = function(options) {
    options = options || {};
    var root = options.root || '.';

    return es.map(function(file, cb) {
        var css = rebaseUrls(file.contents.toString(), {
            currentDir: path.dirname(file.path),
            root: path.join(file.cwd, root)
        });

        file.contents = new Buffer(css);

        cb(null, file);
    });
}
