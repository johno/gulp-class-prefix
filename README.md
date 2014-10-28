# Gulp Class Prefix

Gulp plugin to prefix classes in a CSS file.

## Installation

```
npm install --save gulp-class-prefix
```

## Usage

```js
var gulp        = require('gulp'),
    classPrefix = require('gulp-class-prefix');

gulp.task('prefix', function() {
  return gulp.src('my-file.css')
    .pipe(classPrefix('my-class-prefix-'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['prefix']);
```

## License

MIT

## Acknowledgements

Gulp wrapper for <https://github.com/johnotander/rework-class-prefix>.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).