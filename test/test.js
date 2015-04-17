'use strict';

var assert = require('assert');
var classPrefix = require('..');
var gutil = require('gulp-util');

describe('gulp-class-prefix', function() {

  it('should prefix css classes', function(done) {
    var classPrefixStream = classPrefix('prfx-');

    var actual = 'input[disabled] .some-class {\n  color: blue;\n}\n\na {\n  text-decoration: none;\n}\n';
    var expected = 'input[disabled] .prfx-some-class {\n  color: blue;\n}\n\na {\n  text-decoration: none;\n}\n';

    classPrefixStream.once('data', function(file) {
      assert.equal(file.relative, 'default.css');
      assert.equal(withoutSourceMap(file.contents.toString()), expected);
    });

    classPrefixStream.on('end', done);

    classPrefixStream.write(new gutil.File({
      path: 'default.css',
      contents: new Buffer(actual)
    }));

    classPrefixStream.end();
  });

  it('should prefix css classes and ignore the correct selector', function(done) {
    var classPrefixStream = classPrefix('prfx-', { ignored: [/\.ng-/] });

    var actual = '.some-class {\n  color: blue;\n}\n\n.ng-thing {\n  text-decoration: none;\n}\n';
    var expected = '.prfx-some-class {\n  color: blue;\n}\n\n.ng-thing {\n  text-decoration: none;\n}\n';

    classPrefixStream.once('data', function(file) {
      assert.equal(file.relative, 'default.css');
      assert.equal(withoutSourceMap(file.contents.toString()), expected);
    });

    classPrefixStream.on('end', done);

    classPrefixStream.write(new gutil.File({
      path: 'default.css',
      contents: new Buffer(actual)
    }));

    classPrefixStream.end();
  });
});

function withoutSourceMap(str) {
  return (str || '').split('/*# sourceMappingURL')[0];
}
