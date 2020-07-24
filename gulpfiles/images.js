const gulp = require("gulp");
const gulplog = require("gulplog");
const newer = require("gulp-newer");
const imagemin = require("gulp-imagemin");

gulp.task("images:clean", () => {
	const del = require("del");
	return del(["./dist/images"]);
});

gulp.task("images:watch", () => {
	gulp.watch("./src/images/**/*", gulp.parallel("images"));
});

gulp.task("images:minify", () => {
	return gulp
		.src("./src/images/**/*")
		.pipe(newer("./dist/images"))
		.pipe(
			imagemin([
				imagemin.jpegtran({
					progressive: true
				}),
				imagemin.optipng({
					optimizationLevel: 5
				}),
				imagemin.gifsicle({
					interlaced: true
				}),
				imagemin.svgo({
					multipass: true,
					plugins: [
						{ convertShapeToPath: false },
						{ removeViewBox: false },
						{ removeDimensions: true },
						{ cleanupIDs: false }
					]
				})
			])
		)
		.on("error", ex => {
			gulplog.error(ex);
			this.emit("end");
		})
		.pipe(gulp.dest("./dist/images"));
});

gulp.task("images", gulp.series("images:clean", "images:minify"));
