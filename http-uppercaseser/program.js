// Requirements: 
// Write an HTTP server that receives only POST requests and coverts
// incoming POST body characters to upper-case and returns it to the client.
// The server should listen on the port provided by the first argument to your program.
'use strict';
let http = require('http');
let server = null;

createHTTPPostServer(Number(process.argv[2]), uppercaseCharacters);

// This function create the http server and listen on given port number
function createHTTPPostServer(port, callback) {
    server = http.createServer(function(req, res) {
        callback(req, res);
    });
    server.listen(port);
}

// This function process Post request and then return to uppercase its content.
function uppercaseCharacters(req, res) {
    // Process only POST requests
    if (req.method === 'POST') {
        let body = "";
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        req.on('data', function(chunk) {
            body += chunk.toString().toUpperCase();
        });
        req.on('end', function() {
            res.write(body)
            res.end();
        });
    } else {
        req.on('end', function() {
            res.writeHead(422);
            res.end("Send me a Post request\n");
        });
    }
}