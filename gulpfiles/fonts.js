const gulp = require("gulp");

gulp.task("fonts:clean", () => {
  const del = require("del");
  return del(["./dist/fonts"]);
});

gulp.task("fonts:watch", () => {
  gulp.watch("./src/fonts/**/*", gulp.parallel("fonts"));
});

gulp.task("fonts:compile", () => {
  return gulp.src("./src/fonts/**/*").pipe(gulp.dest("./dist/fonts"));
});

gulp.task("fonts", gulp.series("fonts:clean", "fonts:compile"));
