(function() {
    'use strict';

    let http = require('http'),
        url = require('url'),
        fs = require('fs'),
        chalk = require('chalk'),
        mimeTypes = {
            'js': 'text/javascript',
            'html': 'text/html',
            'css': 'text/css',
            'txt': 'text/plain'
        },
        port = 3000,
        error500 = 'Error 500: Internal Error.',
        error404 = 'Error 404. The link dont exists.';

    /*eslint-disable */
    function getDate(path) {
        let date = new Date(),
            seconds = date.getSeconds(),
            minutes = date.getMinutes(),
            hour = date.getHours(),
            day = date.getDay();

        if (path) {
            /*eslint-disable */
            return console.log(chalk.green(
                chalk.cyan(`Path:`) + ` ${path} ` +
                chalk.cyan(`Time:`) + ` ${hour}:${minutes}:${seconds} ` +
                chalk.cyan(`Day:`) + ` ${day}`
            ));
            /*eslint-enable */
        } else {
            /*eslint-disable */
            return console.log(chalk.red(`Path: ${path} Time: ${hour}:${minutes}:${seconds} Day: ${day}`));
            /*eslint-enable */
        }
    }
    /*eslint-enable */

    function getPaths(url) {
        let paths = {
            '/': './index.html',
            '/css/styles.min.css': './css/styles.min.css',
            '/node_modules/requirejs/require.js': './node_modules/requirejs/require.js',
            '/app/config.js': './app/config.js',
            '/app/app.js': './app/app.js',
            '/app/utils.js': './app/utils.js',
            '/app/consts.js': './app/consts.js',
            '/app/buttons.js': './app/buttons.js',
            '/app/events.js': './app/events.js',
            '/app/components.js': './app/components.js',
            '/node_modules/jquery/dist/jquery.min.js': './node_modules/jquery/dist/jquery.min.js',
            '/node_modules/jquery/dist/jquery.min.map': './node_modules/jquery/dist/jquery.min.map'
        };
        // Uncomment the following line if you are loading the server with 'node index.js'
        // Show per console if dependencies loaded correctly, this method does not work with gulp
        // getDate(paths[url]);
        return (paths[url]) ? paths[url] : '';
    }

    http.createServer((req, res) => {
        let path = getPaths(url.parse(req.url).pathname),
            ext = (path) ? path.split('.').pop() : null,
            mimeType = mimeTypes[ext];

        fs.exists(path, (exists) => {
            if (exists) {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        res.writeHead(500, mimeTypes['txt']);
                        /*eslint-disable */
                        console.log(chalk.red(error500));
                        /*eslint-enable */
                        res.write(error500);
                        res.end();
                    } else {
                        res.writeHead(200, {
                            'Content-Type': mimeType
                        });
                        res.write(data, 'utf-8');
                        res.end();
                    }
                });
            } else {
                res.writeHead(404, mimeTypes['txt']);
                /*eslint-disable */
                console.log(chalk.red(error404));
                /*eslint-enable */
                res.write(error404);
                res.end();
            }
        });
    }).listen(port, '127.0.0.1', () => {
        /*eslint-disable */
        console.log(chalk.cyan('********************************************************************'));
        console.log(chalk.cyan(`***** The server is working correctly in http://localhost: ${port} *****`));
        console.log(chalk.cyan('********************************************************************'));
        /*eslint-enable */
    });
}());
