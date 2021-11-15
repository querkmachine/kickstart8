const { src, dest, watch } = require("gulp");

const clean = (cb) => {
  const del = require("delete");
  return del(["./dist/images"], cb);
};

const compile = () => {
  const imagemin = require("gulp-imagemin");
  const log = require("gulplog");
  const newer = require("gulp-newer");
  return src("./src/images/**/*.{gif,jpeg,jpg,png,svg}")
    .pipe(newer("./dist/images"))
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true,
        }),
        imagemin.mozjpeg({
          quality: 75,
          progressive: true,
        }),
        imagemin.optipng({
          optimizationLevel: 5,
        }),
        imagemin.svgo({
          multipass: true,
          plugins: [
            { convertShapeToPath: false },
            { removeViewBox: false },
            { removeDimensions: true },
            { cleanupIDs: false },
          ],
        }),
      ])
    )
    .on("error", (ex) => {
      log.error(ex);
      this.emit("end");
    })
    .pipe(dest("./dist/images"));
};

exports.imagesClean = clean;
exports.imagesCompile = compile;
exports.imagesWatch = () => {
  watch("./src/images/**/*.{gif,jpeg,jpg,png,svg}", compile);
};
