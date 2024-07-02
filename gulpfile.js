const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fs = require("fs");

gulp.task("html", function () {
  return gulp
    .src("./src/*.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("./dist/"));
});

gulp.task("sass", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css/"));
});

gulp.task("images", function () {
  return gulp.src("./src/images/**/*").pipe(gulp.dest("./dist/images/"));
});

gulp.task("server", function () {
  return gulp.src("./dist/").pipe(
    server({
      livereload: true,
      open: true,
      port: 3000,
    })
  );
});

gulp.task("clean", function (done) {
  if (fs.existsSync("./dist/")) {
    return gulp.src("./dist/", { read: false }).pipe(clean({ force: true }));
  }
  done();
});

gulp.task("watch", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("./src/**/*.html", gulp.parallel("html"));
  gulp.watch("./src/images/**/*", gulp.parallel("images"));
});

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("html", "sass", "images"),
    gulp.parallel("server", "watch")
  )
);
