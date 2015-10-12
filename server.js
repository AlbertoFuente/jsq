'use strict';

var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    mimeTypes = {
        'js': 'text/javascript',
        'html': 'text/html',
        'css': 'text/css'
    },
    port = 3000;

http.createServer(function(req, res) {
    var path = (url.parse(req.url).pathname === '/') ? './index.html' : url.parse(req.url).pathname,
        ext = path.split('.').pop(),
        mime_type = mimeTypes[ext];

    fs.exists(path, function(exists) {
        if (exists) {
            fs.readFile(path, function(err, data) {
                if (err) {
                    res.writeHead(500, 'text/plain');
                    res.end('Internal Error.');
                } else {
                    res.writeHead(200, {
                        'Content-Type': mime_type
                    });
                    res.write(data, 'utf-8');
                    res.end();
                }
            });
        } else {
            res.writeHead(404, 'text/plain');
            res.end('Error 404. The link dont exists.');
        }
    });
}).listen(port, '127.0.0.1', function() {
    console.log('***** The server is working correctly in http://localhost:' + port + ' *****');
});
