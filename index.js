var through     = require('through2'),
    rework      = require('rework'),
    classPrefix = require('rework-class-prefix');

module.exports = function(prefix, options) {
  options = options || {};

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (!file.isBuffer()) {
      cb();
    }

    var src = file.contents.toString();
    var css = rework(src, { source: file.path })
                .use(classPrefix(prefix, options)).toString({ sourcemap: true });

    file.contents = new Buffer(css);
    cb(null, file);
  });
};
