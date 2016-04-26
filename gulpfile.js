var gulp = require("gulp");
var jasmine = require("gulp-jasmine");
var awsPublish = require("gulp-awspublish");
var jasmineConfig = require("./spec/support/jasmine");
var runSequence = require("run-sequence");
var typescriptCompiler = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");

var project = typescriptCompiler.createProject("tsconfig.json");

// gulp.task("ts-lint", function () {
//     return gulp.src("src/**/*.ts")
//             .pipe(tslint())
//             .pipe(tslint.report("prose"));
// });

gulp.task("ts-compile", function () {
    var sourceTSFiles = [
        "**/*.ts",
        "*.ts",
        "typings/main/**/*.d.ts",
        "typings/main.d.ts",
        "!node_modules/**/*.*"
    ];
    var tsCompilation = gulp.src(sourceTSFiles)
                            .pipe(sourcemaps.init())
                            .pipe(typescriptCompiler({
                                project: project,
                                module: "commonjs",
                                outDir: "dist"
                            }));
    tsCompilation.dts.pipe(gulp.dest("dist"));
    return tsCompilation.js.pipe(sourcemaps.write("."))
                            .pipe(gulp.dest("dist"));
});

/**
 * "jasmine" - runs jasmine tests that are located in the "spec/tests" folder
 */
gulp.task("jasmine", function () {
    return gulp.src(['dist/spec/tests/**/*.js'])
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true,
            config: jasmineConfig
        }));
});

gulp.task("default", function (callback) {
    runSequence("ts-compile", "jasmine", callback);
});

//Experimental: Awaiting testing of this function
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
            //.pipe(publisher.publish(headers))
            //create a cache for increased speed in subsequent uploads
            .pipe(publisher.cache())
            //print upload updates to console
            .pipe(awsPublish.reporter());
});
