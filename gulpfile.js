
const gulp = require('gulp');
const gulpLess = require('gulp-less');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync');


gulp.task('style',()=>{
    //执行任务
    gulp.src(['./src/styles/*.less','!./src/styles/_demo.less'])
        .pipe(gulpLess()).pipe(cssnano()).pipe(gulp.dest('./dist/styles'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('script',()=>{
    gulp.src('./src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('image',()=>{
    gulp.src('./src/images/*.{jpg,png}')
        .pipe(gulp.dest('./dist/images'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('html',()=>{
    gulp.src('./src/index.html')
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('run',()=>{
    browserSync({
        server:{
            baseDir: ['dist'],
            proxy: "http://localhost:3306"
        }
    });
    gulp.watch('./src/styles/*.less',['style']);
    gulp.watch('./src/scripts/*.js',['script']);
    gulp.watch('./src/images/*.{png,jpg}',['image']);
    gulp.watch('./src/index.html',['html']);
});