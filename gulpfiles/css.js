const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const postcssPresetEnv = require("postcss-preset-env");
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
        outputStyle: argv.minify ? "compressed" : "expanded",
        includePaths: ["./node_modules"]
      }).on("error", sass.logError)
    )
    .pipe(
      postcss([
        postcssPresetEnv({
          features: ["logical-properties-and-values"]
        })
      ])
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("css", gulp.series("css:clean", "css:compile"));
