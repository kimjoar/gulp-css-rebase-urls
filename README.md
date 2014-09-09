# [gulp](https://github.com/wearefractal/gulp)-css-rebase-urls

> Rebase relative image URLs 

**This is still a work in progress**

## Install

Install with npm

```
npm install gulp-css-rebase-urls --save-dev
```

## Example

```javascript
var gulp = require('gulp');
var rebaseUrls = require('gulp-css-rebase-urls');

gulp.task('default', function () {
    gulp.src('css/**/*.css')
        .pipe(rebaseUrls())
        .pipe(concat('style.css')) // <-- just an example
        .pipe(gulp.dest('./build/'));
});
```

## What it tries to solve

Let's say you have this structure:

```
.
|-- css
|   |-- some
|   |   `-- deep
|   |       |-- path
|   |       |   `-- style.css
|   |       `-- style.css
|   `-- style.css
`-- img
    |-- a.jpg
    |-- b.jpg
    `-- deeper
        `-- c.jpg
```

In `css/style.css` you might have:

```css
.sel {
    background: url('../img/deeper/c.jpg') no-repeat top left;
}
```

And in `css/some/deep/path/style.css` you might have:

```css
.item {
    background: url('../../../../img/a.jpg') no-repeat top left;
}
```

When I minify everything, for example to be in `./style.css` in
production. I want this final file for the css above:

```css
.sel {
    background: url('img/deeper/c.jpg') no-repeat top left;
}
.item {
    background: url('img/a.jpg') no-repeat top left;
}
```

## Using the 'convertToAbsolute' option

This option will prefix the rebased relative URL with a forward slash to convert it into an absolute path. This is to accommodate situations where the CSS files are being transferred into another directory (such as a temp directory for generated files) but the images aren't being relocated.

By default the option is turned off.

### Example

```javascript
var gulp = require('gulp');
var rebaseUrls = require('gulp-css-rebase-urls');

gulp.task('default', function () {
    gulp.src('css/**/*.css')
        .pipe(rebaseUrls({
            convertToAbsolute: true,
        }))
        .pipe(concat('style.css')) // <-- just an example
        .pipe(gulp.dest('./build/'));
});
```



Pull requests and use cases welcome.
