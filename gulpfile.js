const gulp = require("gulp"); //gulpプラグインの読み込み
const sass = require("gulp-sass")(require("sass")); // Sassをコンパイルするプラグインの読み込み
const autoprefixer = require("gulp-autoprefixer"); //ベンダープレフィックスの付与
const rename = require("gulp-rename"); //ファイル名変更
const ejs = require("gulp-ejs"); //ejs
const browserSync = require("browser-sync");
const replace = require("gulp-replace");
const webpack = require("webpack"); // webpackの類
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");
// const { watch } = require("gulp");

//ベンダープレフィックスを付与する条件
const TARGET_BROWSERS = [
  "last 2 versions", //各ブラウザの2世代前までのバージョンを担保
  "ie >= 11", //IE11を担保
];

// style.scssをタスクを作成する
gulp.task("sass", () => {
  // style.scssファイルを取得
  return gulp
    .src("./sources/sass/**/*.scss") //コンパイル対象のSassファイル
    .pipe(sass({ outputStyle: "expanded" })) // Sassのコンパイルを実行
    .pipe(autoprefixer(TARGET_BROWSERS))
    .pipe(gulp.dest("./public/assets/css")); //出力
});

// ejs
gulp.task("ejs", () => {
  return (
    gulp
      .src(["sources/ejs/**/*.ejs", "!" + "sources/ejs/**/_*.ejs"])
      .pipe(ejs({ ext: ".html" }))
      .pipe(rename({ extname: ".html" }))
      .pipe(replace(/^[ \t]*\n/gim, ""))
      // .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, '$1'))
      .pipe(gulp.dest("./public"))
  );
});

// webpack
gulp.task("webpack", () => {
  // webpackStreamの第2引数にwebpackを渡す
  return (
    webpackStream(webpackConfig, webpack)
      .on("error", function (e) {
        this.emit("end");
      })
      // .src(["sources/script/**/*.js", "!" + "sources/script/**/_*.js"])
      // .pipe(gulp.dest("./public/assets/script"));
      .pipe(gulp.dest("."))
  );
});

// img
gulp.task("img", (done) => {
  gulp
    .src(["sources/*.{jpg,png,svg,gif}", "sources/img/**"], { base: "sources" })
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("model", (done) => {
  gulp
    .src(["sources/*.{glb}", "sources/model/**"], { base: "sources" })
    .pipe(gulp.dest("./public/assets"));
  done();
});

// リロードするhtml
const reloadFile = (done) => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html",
      directory: true,
    },
  });
  done();
};

// web server
gulp.task("browser-sync", (done) => {
  browserSync.init({
    server: { baseDir: "./public" },
    port: 8080,
    reloadOnRestart: true,
    notify: false,
  });
  done();
});

// browser-sync reload
gulp.task("reload", (done) => {
  browserSync.reload();
  done();
});

// build, watch
gulp.task("build", gulp.series("sass", "ejs", "img", "model")); //構築の際に行うことを記述

gulp.task("watch", (done) => {
  gulp.watch(["./sources/sass/**/*.scss"], gulp.series("sass", "reload"));
  gulp.watch(["./sources/ejs/**/*.ejs"], gulp.series("ejs", "reload"));
  //gulp.watch(["./sources/script/**/*.js"], gulp.series("webpack", "reload"));
  gulp.watch(
    ["./sources/img/*.{jpg,png,svg,gif}", "./sources/img/**/*"],
    gulp.series("img", "reload")
  );
  gulp.watch(
    ["sources/*.{glb}", "sources/model/**"],
    gulp.series("model", "reload")
  );
  done();
});

gulp.task("default", gulp.series("build", "browser-sync", "watch")); //構築、監視、ブラウザシンクの呼び出し　, 'browser-sync'
