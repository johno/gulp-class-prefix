var through     = require('through2'),
    furtivework = require('rework'),
    classPrefix = require('rework-class-prefix');

module.exports = function(prefix) {
  return through.obj(function(file, encoding, callback) {
    if (!file.isBuffer()) {
      callback();
    }

    var src = file.contents.toString();
    var css = rework(src, {})
                .use(classPrefix(prefix));

    file.contents = new Buffer(css);
    this.push(file);
    callback();
  });
};
