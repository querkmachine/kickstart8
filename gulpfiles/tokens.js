const gulp = require("gulp");
const theo = require("gulp-theo");
const rename = require("gulp-rename");

gulp.task("tokens:css", () => {
  return gulp
    .src("./tokens/tokens.yml")
    .pipe(
      theo({
        transform: { type: "web" },
        format: { type: "custom-properties.css" }
      })
    )
    .pipe(rename({ basename: "tokens", suffix: ".web" }))
    .pipe(gulp.dest("./dist/tokens"));
});

gulp.task("tokens:sass", () => {
  return gulp
    .src("./tokens/tokens.yml")
    .pipe(
      theo({
        transform: { type: "web" },
        format: { type: "scss" }
      })
    )
    .pipe(rename({ basename: "tokens", suffix: ".web" }))
    .pipe(gulp.dest("./dist/tokens"));
});

gulp.task("tokens:json", () => {
  return gulp
    .src("./tokens/tokens.yml")
    .pipe(
      theo({
        transform: { type: "web" },
        format: { type: "raw.json" }
      })
    )
    .pipe(rename({ basename: "tokens", suffix: ".web" }))
    .pipe(gulp.dest("./dist/tokens"));
});

gulp.task("tokens:android", () => {
  return gulp
    .src("./tokens/tokens.yml")
    .pipe(
      theo({
        transform: { type: "android" },
        format: { type: "android.xml" }
      })
    )
    .pipe(rename({ basename: "tokens", suffix: ".android" }))
    .pipe(gulp.dest("./dist/tokens"));
});

gulp.task("tokens:ios", () => {
  return gulp
    .src("./tokens/tokens.yml")
    .pipe(
      theo({
        transform: { type: "ios" },
        format: { type: "ios.json" }
      })
    )
    .pipe(rename({ basename: "tokens", suffix: ".ios" }))
    .pipe(gulp.dest("./dist/tokens"));
});

gulp.task("tokens:clean", () => {
  const del = require("del");
  return del(["./dist/tokens"]);
});

gulp.task("tokens:watch", () => {
  gulp.watch("./tokens/*", gulp.parallel("tokens"));
});

gulp.task(
  "tokens",
  gulp.series(
    "tokens:clean",
    gulp.parallel(
      "tokens:css",
      "tokens:sass",
      "tokens:json",
      "tokens:ios",
      "tokens:android",
      cb => cb()
    )
  )
);
