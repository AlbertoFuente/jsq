var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    babel = require("gulp-babel"),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    Server = require('karma').Server,
    testFiles = ['js/app.min.js', 'spec/test.js'],
    appFiles = ['app/*.js'],
    sassFiles = ['styles/styles.scss'];

gulp.task('default', function() {
    'use strict';

    gulp.start('js');
    gulp.start('sass');
    gulp.start('karma');
});

gulp.task('js', function() {
    'use strict';

    gulp.src(appFiles)
        .pipe(concat('app.min.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('js/'));
});

gulp.task('sass', function() {
    'use strict';

    gulp.src(sassFiles)
        .pipe(sass())
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('karma', function() {
    'use strict';

    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }).start();
});

gulp.task('watch', function() {
    'use strict';

    gulp.watch(appFiles,
        function() {
            gulp.start('js');
        });
    gulp.watch(sassFiles,
        function() {
            gulp.start('sass');
        });
    gulp.watch(testFiles, function() {
        gulp.start('karma');
    });
});
