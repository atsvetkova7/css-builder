const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sync = require("browser-sync").create();

function styles() {
	return gulp
		.src("src/style.css", { sourcemaps: true })
		.pipe(
			postcss([
				require("postcss-import"),
				require("autoprefixer"),
				require("postcss-csso"),
			])
		)
		.pipe(gulp.dest("dist/styles", { sourcemaps: "." }))
		.pipe(sync.stream());
}

function html() {
	return gulp
		.src("src/*.html")
		// .pipe(
		// 	htmlmin({
		// 		removeComments: true,
		// 		collapseWhitespace: true,
		// 	})
		// )
		.pipe(gulp.dest("dist"))
		.pipe(sync.stream());
}

function server(cb) {
	sync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: "dist",
		},
	});
	cb();
}

function watch(cb) {
	gulp.watch('src/*.html', gulp.series(html));
	gulp.watch("src/**/*.css", gulp.series(styles));
	cb();
}

exports.build = gulp.series(
  gulp.parallel(
      html,
      styles,
  ),
);

exports.default = gulp.series(gulp.parallel(watch, server));
