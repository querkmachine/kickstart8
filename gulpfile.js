const gulp = require("gulp");
const requireDir = require("require-dir");

// Load in more tasks
requireDir("./gulpfiles");

// Bundled tasks
gulp.task(
  "clean",
  gulp.parallel(
    "images:clean",
    "js:clean",
    "css:clean",
    "fonts:clean",
    "fractal:clean"
  )
);

gulp.task(
  "watch",
  gulp.parallel(
    "images:watch",
    "js:watch",
    "css:watch",
    "fonts:watch",
    "fractal:watch"
  )
);

gulp.task(
  "build",
  gulp.parallel("images", "js", "css", "fonts", (cb) => cb())
);

gulp.task("export", gulp.series("build", "fractal"));

gulp.task("default", gulp.series("build", "watch"));
