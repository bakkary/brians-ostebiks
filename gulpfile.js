const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");




function html(done) {
    gulp.src("./src/html/templates/*.ejs*")
        .pipe(ejs())

        .pipe(rename(function (path) {
            if (path.basename != "index") {
                path.dirname = path.basename;
                path.basename = "index";
            }
            path.extname = ".html";
        }))

        .pipe(gulp.dest("./dist/"))
        .pipe(connect.reload());
    done();

}

function scss(done) {
    gulp.src("./src/css/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload())
    done();
}


function manifest(done) {
    gulp.src('./manifest.webmanifest')
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
    done();
}
function watchManifest(done) {
    gulp.watch('./manifest.webmanifest', { ignoreInitial: false }, manifest);
}


function js(done) {
    gulp
        .src("./src/javascript/**/*.js")
        .pipe(
            babel({
                presets: ["@babel/env"]
            })
        )
        .pipe(gulp.dest("./dist/javascript"))
        .pipe(connect.reload());
    done();
}

function Watcher(done) {
    gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false }, html);
    gulp.watch("./src/css/**/*.scss", { ignoreInitial: false }, scss);
    gulp.watch("./src/javascript/**/*.js", { ignoreInitial: false }, js);
    gulp.watch("./src/json/**/*.json", { ignoreInitial: false }, json);
    gulp.watch("./src/images/*", { ignoreInitial: false }, images);
}

function json(done) {
    gulp
        .src("./src/json/*.json")
        .pipe(gulp.dest("./dist/data"))
        .pipe(connect.reload());
    done();
}

function images(done) {
    gulp
        .src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/images"))
        .pipe(connect.reload());
}

gulp.task("dev", function (done) {
    Watcher();
    connect.server({
        livereload: true,
        root: "dist"
    });
    done();
});

gulp.task("build", function (done) {
    html(done);
    scss(done);
    javascript(done);
    json(done);
    images(done);
    manifest(done);
    done();
})