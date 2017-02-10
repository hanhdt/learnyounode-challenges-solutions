'use strict';

let http = require('http');
let rawData = [];
let count = 0;

for (var i = 0; i < 3; i++) {
    collectData(i, printData);
}

function collectData(index, callback) {
    rawData[index] = '';
    http.get(process.argv[2 + index], function(response) {
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            rawData[index] += chunk;
        });
        response.on('end', function() {
            count++;
            if (count === 3) {
                callback(null);
            }
        });
    }).on('error', function(error) {
        callback(error);
    });
}

function printData(error) {
    if (error) {
        return console.error("There are errors: " + error.message);
    }
    for (var i = 0; i < 3; i++) {
        console.log(rawData[i]);
    }
}