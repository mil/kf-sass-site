#!/usr/bin/env node

var sass = require("sass");
var Fiber = require("fibers");

var file = process.argv[2];
sass.render({
  file: file,
  importer: function(url, prev, done) {
    console.log(url)
    // ...
  },
  fiber: Fiber
}, function(err, result) {
  console.log(result);
  // ...
});
