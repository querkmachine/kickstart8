const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-dart-sass");
const argv = require("yargs").argv;

gulp.task("css:clean", () => {
  const del = require("del");
  return del(["./dist/css"]);
});

gulp.task("css:watch", () => {
  gulp.watch("./src/sass/**/*", gulp.parallel("css:compile"));
  gulp.watch("./components/**/*.{sass,scss}", gulp.parallel("css:compile"));
});

gulp.task("css:compile", () => {
  return gulp
    .src("./src/sass/**/*.{sass,scss}")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: argv.minify ? "compressed" : "expanded"
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("css", gulp.series("css:clean", "css:compile"));
