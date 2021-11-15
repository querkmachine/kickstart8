const { src, dest, watch } = require("gulp");

const clean = (cb) => {
  const del = require("delete");
  return del(["./dist/css"], cb);
};

const compile = () => {
  const sourcemaps = require("gulp-sourcemaps");
  const postcss = require("gulp-postcss");
  const postcssPresetEnv = require("postcss-preset-env");
  const postcssNano = require("cssnano");
  const sass = require("gulp-dart-sass");
  const argv = require("yargs").argv;

  const postcssPlugins = [
    postcssPresetEnv({
      features: {
        "logical-properties-and-values": {
          dir: argv.dir || "ltr",
        },
      },
    }),
  ];

  if (argv.minify) {
    postcssPlugins.push(postcssNano());
  }

  return src("./src/sass/**/*.{sass,scss}")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ["./node_modules", "./components"],
      }).on("error", sass.logError)
    )
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dist/css"));
};

exports.cssClean = clean;
exports.cssCompile = compile;
exports.cssWatch = () => {
  watch("./src/scss/**/*", compile);
  watch("./components/**/*", compile);
};
