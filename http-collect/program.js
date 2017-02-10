'use strict';

var http = require('http');

// Raw data collected
let rawData = '';

// collect streaming data function
function collectData(url, callback) {
    http.get(url, function(response) {
        response.setEncoding('utf8');
        response.on("data", function(data) {
            rawData += data;
        });
        response.on("end", () => {
            callback(null, rawData);
        });
    }).on('error', function(error) {
        callback(error);
    });
}

// callback function for printing results
function printResults(error, raw) {
    if (error) {
        return console.error("Have errors: ", error.message);
    }
    console.log(raw.length);
    console.log(raw);
}


collectData(process.argv[2], printResults);