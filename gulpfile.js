'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    eslint = require('gulp-eslint'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    devServer = require('gulp-develop-server'),
    browserSync = require('browser-sync'),
    Server = require('karma').Server,
    // Files
    testFiles = ['js/*.min.js', 'spec/*.js'],
    testJsFiles = ['spec/*.js'],
    appFiles = ['app/*.js', 'index.js'],
    sassFiles = ['styles/*.scss'],
    // Develop Server
    options = {
        server: {
            path: 'index.js',
            execArgv: ['--harmony']
        },
        bs: {
            proxy: 'http://localhost:3000'
        }
    };

gulp.task('default', function() {
    'use strict';

    gulp.start([
        'js',
        'sass',
        'eslint',
        'eslintTestFiles',
        'karma',
        'server:start'
    ]);
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
        /*eslint-disable */
        configFile: __dirname + '/karma.conf.js',
        /*eslint-enable */
        singleRun: true
    }).start();
});

gulp.task('eslint', function() {
    'use strict';

    gulp.src(appFiles)
        .pipe(eslint('.eslintrc'))
        .pipe(eslint.format());
});

gulp.task('eslintTestFiles', function() {
    'use strict';

    gulp.src(testJsFiles)
        .pipe(eslint('.eslintrc'))
        .pipe(eslint.format());
});

gulp.task('server:start', function() {
    'use strict';

    devServer.listen(options.server, function(error) {
        if (!error) devServer(options.bs);
    });
});

gulp.task('server:restart', function() {
    'use strict';

    devServer.restart(function(error) {
        if (!error) devServer.reload();
    });
});

gulp.task('watch', function() {
    'use strict';

    gulp.watch(appFiles, function() {
        gulp.start([
            'eslint',
            'server:restart',
            'js'
        ]);
    });

    gulp.watch(sassFiles, function() {
        gulp.start([
            'sass',
            'server:restart'
        ]);
    });

    gulp.watch(testFiles, function() {
        gulp.start([
            'eslintTestFiles',
            'karma'
        ]);
    });
});
