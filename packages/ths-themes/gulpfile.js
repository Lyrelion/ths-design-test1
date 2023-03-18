'use strict';

const { series, src, dest } = require('gulp');
const sass = require("gulp-sass")(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const watch = require('gulp-watch');

/**
 * 转换并压缩样式文件
 * @description sass.sync 报错，暂未解决 https://github.com/uswds/uswds-gulp/issues/41
 */
function compile() {
  return src('./src/**/*.scss')
    .pipe(sass)
    .pipe(
      autoprefixer({
        browsers: ['ie > 11', 'last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(cssmin({ removeComments: true }))
    .pipe(dest('./lib'));
}

/**
 * 拷贝字体文件
 */
function copyfont() {
  return src('./src/fonts/**').pipe(cssmin()).pipe(dest('./lib/fonts'));
}

/**
 * 监听文件变化
 * @description sass.sync 报错，暂未解决 https://github.com/uswds/uswds-gulp/issues/41
 */
function devCompile() {
  const path = './src/**/*.scss';
  return watch(path, { verbose: true }, () => {
    src(path).pipe(sass).pipe(dest('./lib'));
  });
}

// 串行
exports.build = series(compile, copyfont);

exports.dev = devCompile;
