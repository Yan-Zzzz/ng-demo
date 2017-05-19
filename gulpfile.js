var gulp = require('gulp');
var vendor = require('./src/vendor/vendor'); //依赖路径
var $ = require('gulp-load-plugins')();
var open = require('open');


var app = {
    srcPath: 'src/',//源代码
    devPath: 'build/',//整合后，开发
    distPath: 'dist/'//生产，部署
}

gulp.task('lib', function () {
    return gulp.src(vendor.packages)
        .pipe(gulp.dest(app.devPath + 'vendor/js'))
        .pipe(gulp.dest(app.distPath + 'vendor/js'))

});

gulp.task('html', function () {
    return gulp.src(app.srcPath + '**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.distPath))
         .pipe($.connect.reload());
        
})
gulp.task('json', function () {
    return gulp.src(app.srcPath + 'data/**/*.json')
        .pipe(gulp.dest(app.devPath + 'data'))
        .pipe(gulp.dest(app.distPath + 'data'))
        .pipe($.connect.reload());
})

gulp.task('less', function () {
    return gulp.src(app.srcPath + 'css/app.less')
        .pipe($.less())//编译
        .pipe(gulp.dest(app.devPath + 'css'))
        .pipe($.cssmin())//压缩
        .pipe(gulp.dest(app.distPath + 'css'))
        .pipe($.connect.reload());
})

gulp.task('js', function () {
    return gulp.src(app.srcPath + '**/*.js')
// .pipe($.concat('script/app.js'))//合并
        .pipe(gulp.dest(app.devPath))
       .pipe($.uglify())//压缩
        .pipe(gulp.dest(app.distPath))
        .pipe($.connect.reload());

})

gulp.task('images', function () {
    return gulp.src(app.srcPath + 'images/**/*')
        .pipe(gulp.dest(app.devPath + 'images'))
        .pipe($.imagemin())//图片压缩
        .pipe(gulp.dest(app.distPath + 'images'))
        .pipe($.connect.reload());
})
//清空文件夹
gulp.task('clean', function () {
    return gulp.src([app.devPath, app.distPath])
        .pipe($.clean());
})

gulp.task('server', function () {
    $.connect.server({
        // root: 'dist',
        root: [app.devPath],
        port: 2000,
        livereload: {
            port: 12345//参数
        }
    });
   open('http://localhost:2000')
})

gulp.task('watch', function () {
    gulp.watch(app.srcPath + '**/*.html', ['html'])
    gulp.watch(app.srcPath + 'data/**/*.json', ['json'])
    gulp.watch(app.srcPath + 'css/*.less', ['less'])
    gulp.watch(app.srcPath + '**/*.js', ['js'])
    gulp.watch(app.srcPath + 'images/**/*', ['images'])
})

gulp.task('dev', ['lib', 'html', 'json', 'less', 'js', 'images', 'server','watch']);
gulp.task('start',['dev'])