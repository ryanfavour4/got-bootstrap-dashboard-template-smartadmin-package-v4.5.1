"use strict";

const gulp = require("gulp");
const dirTree = require('dir-tree-creator')

/*dirTree('some/dir', { label: 'custom label' }, (err, tr) => {
  if (err) return console.error(err)
  console.log(tr)
})
*/
gulp.task("dirTree", function (done) {
	console.log('==================> Generating diretoryTreeToObj...');
	dirTree('./src/', { label: 'SmartAdmin Source' }, (err, tr) => {
	  if (err) return console.error(err)
	  console.log(tr)
	})
	done();
}); 