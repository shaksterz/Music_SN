var gulp = require("gulp");
require('babel-register');
//var babel = require("gulp-babel");
var eslint = require("gulp-eslint");
var jasmine = require("gulp-jasmine");
var awsPublish = require("gulp-awspublish");
var expressServer = require("gulp-live-server");
var jasmineConfig = require("./spec/support/jasmine");
var runSequence = require("run-sequence");

/**
 * "lint" - runs eslint on both the source code files and the jasmine spec test files
 */
gulp.task("lint", function () {
    return gulp.src([
            'src/**/*.js',
            'spec/**/*.js',
            '!node_modules/**'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/**
 * "es6" - runs babel to transpile the ECMAScript6 code back to ECMAScript5 and places it in the "dist" folder
 */
// gulp.task("es6", function () {
//     return gulp.src("src/**/*.js")
//         .pipe(babel())
//         .pipe(gulp.dest("dist"))
// });

// gulp.task("es6-test", function () {
//     return gulp.src("spec/**/*.js")
//         .pipe(babel())
//         .pipe(gulp.dest("dist-test"))
// });

/**
 * "jasmine" - runs jasmine tests that are located in the "spec/tests" folder
 */
gulp.task("jasmine", function () {
    return gulp.src(['src/**/*.js', 'spec/tests/**/*.js'])
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true,
            config: jasmineConfig
        }));
});

gulp.task("default", function (callback) {
    runSequence('lint', 'jasmine', callback);
});

//Experimental: Awaiting testings
gulp.task("publish", function () {
    var publisher = awsPublish.create({
        params: {
            Bucket: 'FILL_IN_HERE'
        }
    });
    return gulp.src('dist/*.js')
            //gzip files and set Content-Encoding headers
            .pipe(awsPublish.gzip({ ext: '.gz'}))
            //publish gzip file with headers
            .pipe(publisher.publish(headers))
            //create a cache for increased speed in subsequent uploads
            .pipe(publisher.cache())
            //print upload updates to console
            .pipe(awsPublish.reporter());
});
