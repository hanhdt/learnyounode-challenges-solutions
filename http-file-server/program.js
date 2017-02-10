// Write an HTTP server that serves the same text file for each request it receives
// Your server should listen on the port provided by the first argument to your program.
// You will be provided with the location of the file to serve as the second command-line argument.
// You must use the fs.createReadStream() method to stream the file content to the response.
'use strict';
let fs = require('fs');
let http = require('http');
let server = null;

createHTTPServer(Number(process.argv[2]), readStreamFile);

function createHTTPServer(port, callback) {
    // This line create a http server, it also take a callback 
    // that is called once for each connection received by the server.
    server = http.createServer(function(request, response) {
        response.writeHead(200, { 'content-type': 'text/plain' });
        callback(process.argv[3], response);
    });
    // This line assign server to listen on specific port
    server.listen(port);
}

function readStreamFile(filePath, response) {
    // Opens the file as a readable stream with utf8 encoding
    let readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    // This will wait until we know the readable stream is actually valid before piping
    readStream.on('open', function() {
        readStream.pipe(response);
    });

    // This caches any errors that happend while creating the readable stream (usually invalid name)
    readStream.on('error', function(err) {
        response.end(err);
    });
}