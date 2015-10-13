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

http.createServer((req, res) => {
    let path = (url.parse(req.url).pathname === '/') ? './index.html' : url.parse(req.url).pathname,
        ext = path.split('.').pop(),
        mime_type = mimeTypes[ext];

    fs.exists(path, (exists) => {
        if (exists) {
            fs.readFile(path, (err, data) => {
                if (err) {
                    res.writeHead(500, mimeTypes['txt']);
                    res.end(error500);
                } else {
                    res.writeHead(200, {
                        'Content-Type': mime_type
                    });
                    res.write(data, 'utf-8');
                    res.end();
                }
            });
        } else {
            res.writeHead(404, mimeTypes['txt']);
            res.end(error404);
        }
    });
}).listen(port, '127.0.0.1', () => {
    console.log(chalk.cyan('***** The server is working correctly in http://localhost:' + port + ' *****'));
});
