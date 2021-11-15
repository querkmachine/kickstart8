const { src, dest, watch } = require("gulp");

const clean = (cb) => {
  const del = require("delete");
  return del(["./dist/fonts"], cb);
};

const compile = () => {
  return src("./src/fonts/**/*").pipe(dest("./dist/fonts"));
};

exports.fontsClean = clean;
exports.fontsCompile = compile;
exports.fontsWatch = () => {
  watch("./src/fonts/**/*", compile);
};
