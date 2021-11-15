const config = require("../package.json");
const { dest, watch } = require("gulp");

const clean = (cb) => {
  const del = require("delete");
  return del(["./dist/js"], cb);
};

const compile = () => {
  const argv = require("yargs").argv;
  const browserify = require("browserify");
  const gulpIf = require("gulp-if");
  const sourcemaps = require("gulp-sourcemaps");
  const uglify = require("gulp-uglify");
  const vinylBuffer = require("vinyl-buffer");
  const vinylSource = require("vinyl-source-stream");

  const b = browserify({
    entries: ["./src/js/all.js"],
    standalone: config.namespace,
  });
  return b
    .transform("babelify", { presets: ["@babel/preset-env"] })
    .bundle()
    .pipe(vinylSource("all.js"))
    .pipe(vinylBuffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpIf(argv.minify, uglify()))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dist/js"));
};

exports.jsClean = clean;
exports.jsCompile = compile;
exports.jsWatch = () => {
  watch("./src/js/**/*.js", compile);
  watch("./components/**/*.js", compile);
};
