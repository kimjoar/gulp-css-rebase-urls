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

Pull requests and use cases welcome.
