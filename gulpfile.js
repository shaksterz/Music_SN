var gulp = require("gulp");
var babel = require("gulp-babel");
var jasmine = require("gulp-jasmine");

gulp.task("es6", function () {
    return gulp.src("src/app.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"))
});

gulp.task("jasmine", function () {
    return gulp.src('src/**/*.js')
        .pipe(jasmine());
});

gulp.task("default", ['es6', 'jasmine']);
