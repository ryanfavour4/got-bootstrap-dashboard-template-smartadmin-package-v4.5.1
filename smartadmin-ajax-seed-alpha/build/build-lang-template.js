const gulp = require('gulp');
const { src, dest } = require("gulp");
const through = require("through2");
const build = require('./build');

// gulp task
function json() {
  return src(build.config.path.src + '/nav.json')
    .pipe(
      through.obj((file, enc, cb) => {
        // get content of json file
        const rawJSON = file.contents.toString();

        // parse raw json into javscript object
        const parsed = JSON.parse(rawJSON);

        // transform json into desired shape
        const transformed = transformJson(parsed);

        // make string from javascript obj
        const stringified = JSON.stringify(transformed, null, 2);

        // make bufer from string and attach it as current file content
        file.contents = Buffer.from(stringified);

        // pass transformed file into next gulp pipe
        cb(null, file);
      })
    )
    .pipe(dest("dest"));
}

// transformation
function transformJson(input) {
  const result = { nav: {} };

  // read json field by field
  Object.keys(input).forEach(topLevelKey => {
    // current object
    const topLevelItem = input[topLevelKey];

    // in your design topLevelItems are arrays
    topLevelItem.forEach(menuItem => {
      if (menuItem.title) {
        // make url either from item href or title
        const itemUrl = makeUrl(menuItem.href || menuItem.title);
        result.nav[itemUrl] = menuItem.title;
      }

      // prcoess children
      if (menuItem.items) {
        menuItem.items
          .filter(child => !!child.title) // process only child items with title
          .forEach(child => {
            const childUrl = makeUrl(child.href || child.title);
            result.nav[childUrl] = child.title;
          });
      }
    });
  });

  return result;
}

// helper func
function makeUrl(href) {
  return href
    .toLowerCase()
    .replace(/\.html$/, "")
    .replace(/\s/g, "_");
}

// export for use in command line
exports.json = json;

gulp.task('build-lang', function (done) {
  json();
  done();
});
