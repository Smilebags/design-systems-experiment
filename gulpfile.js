const gulp = require("gulp");
const util = require("gulp-util");
const rename = require("gulp-rename");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const typescript = require("gulp-typescript");
const minify = require("gulp-minify");
const ftp = require("vinyl-ftp");
const browserSync = require("browser-sync").create();;

// scss config
const scssBuildGlobs = ["src/scss/**/[^_]*.scss"];
const scssWatchGlobs = ["src/scss/**/*.scss"];

// ts config
const tsProject = typescript.createProject("tsconfig.json");
const tsWatchGlobs = ["src/scripts/**/*.ts"];

// pug config
const pugBuildGlobs = ["src/pug/**/[^_]*.pug"];
const pugWatchGlobs = ["src/pug/**/*.pug"];

// top level tasks
gulp.task("default", () => {
    console.log("Use npm start to start development tasks");
});
gulp.task("dev-watch", ["browser-sync", "scss-dev", "ts-dev", "pug-dev"], () => {
    console.log("Building project into tmp and watching for changes");
    gulp.watch(scssWatchGlobs, ["scss-dev"], () => {});
    gulp.watch(tsWatchGlobs, ["ts-dev"], () => {});
    gulp.watch(pugWatchGlobs, ["pug-dev"], () => {});
    gulp.watch("tmp/*.html").on('change', browserSync.reload);
});
gulp.task("build", ["scss-build"], () => {
    console.log("Building project into dist");

});
gulp.task("deploy", () => {
    console.log("Deploying dist to remote");
});

// scss tasks
gulp.task("scss-dev", () => {
    return gulp.src(scssBuildGlobs)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest("tmp/css"))
        .pipe(browserSync.stream());
});

gulp.task("scss-build", () => {
    return gulp.src(scssBuildGlobs)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/css"));
});


// ts tasks
gulp.task("ts-dev", () => {
    const tsResult = tsProject.src()
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(typescript());
    return tsResult.js
        .pipe(sourcemaps.write("")) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest('tmp/scripts'));
});

gulp.task("ts-build", () => {
    const tsResult = tsProject.src()
        .pipe(typescript());
    return tsResult.js
        .pipe(minify())
        .pipe(gulp.dest('dist/scripts'));
});

// pug tasks
gulp.task("pug-dev", () => {
    return gulp.src(pugBuildGlobs)
        .pipe(pug({}))
        .pipe(gulp.dest("tmp"));
});

gulp.task("pug-build", () => {
    return gulp.src(pugBuildGlobs)
        .pipe(pug({}))
        .pipe(gulp.dest("dist"));
});

// browser sync tasks
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./tmp"
        }
    });
});