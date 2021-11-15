const { series, parallel } = require("gulp");
const { cssClean, cssWatch, cssCompile } = require("./gulpfiles/css");
const { fontsClean, fontsWatch, fontsCompile } = require("./gulpfiles/fonts");
const {
  fractalClean,
  fractalWatch,
  fractalExport,
} = require("./gulpfiles/fractal");
const {
  imagesClean,
  imagesWatch,
  imagesCompile,
} = require("./gulpfiles/images");
const { jsClean, jsWatch, jsCompile } = require("./gulpfiles/js");

// Bundled tasks
const cleanAll = parallel(
  cssClean,
  fractalClean,
  fontsClean,
  imagesClean,
  jsClean
);
const watchAll = parallel(
  cssWatch,
  fractalWatch,
  fontsWatch,
  imagesWatch,
  jsWatch
);
const buildAll = parallel(cssCompile, fontsCompile, imagesCompile, jsCompile);

exports.clean = cleanAll;
exports.build = series(cleanAll, buildAll);
exports.serve = series(cleanAll, buildAll, watchAll);
exports.export = series(cleanAll, buildAll, fractalExport);
