// Requirements: Write an HTTP server tat serves JSON data when it receives a GET request
// to the path '/api/parsetime/'. Expect the request to contain a query string with
// a key 'iso' and an ISO-format time as the value.
// For example: /api/parsetime?iso=2013-08-10T12:10:15.474Z
//
// The JSON response should contain only 'hour', 'minute' and 'second' properties.
// For example: { "hour": 14, "minute": 23, "second": 15 }
//
// Add second endpoint for path '/api/unixtime' which accepts the same query string
// but return UNIX epoch time in milliseconds (the number of milliseconds since 1 Jan 1970 00:00:00 UTC)
// under the property 'unixtime'. E.g. { "unixtime": 1376136615474 }
//
// Server should listen on the port provided by the first argument to the program
'use strict';

let http = require('http');
let url = require('url');

let server = null;

createHTTPServer(Number(process.argv[2]), processRoutes);

function createHTTPServer(port, callback) {
    server = http.createServer(function(req, res) {
        callback(req, res);
    });
    server.listen(port);
}

function processRoutes(req, res) {
    let urlContents = url.parse(req.url, true);
    let requestTime = urlContents.query['iso'];
    if (urlContents.pathname === '/api/parsetime') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        let date = new Date(requestTime);
        let data = {
            "hour": date.getHours(),
            "minute": date.getMinutes(),
            "second": date.getSeconds()
        };
        res.write(JSON.stringify(data));
        res.end();
    } else if (urlContents.pathname === '/api/unixtime') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        let date = new Date(requestTime);
        let data = { "unixtime": date.getTime() }
        res.write(JSON.stringify(data));
        res.end();
    } else {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end("Not implemented.")
    }
}