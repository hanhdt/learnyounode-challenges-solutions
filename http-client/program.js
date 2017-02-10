var http = require('http');

function fetchContent(url, callback) {
    http.get(url, function(res) {
        callback(null, res);
    }).on('error', function(e) { callback(e); });
}

fetchContent(process.argv[2], printResponse);

function printResponse(error, response) {
    if (error) {
        return console.error("Have errors: ", error.message);
    }
    response.setEncoding('utf8');
    response.on("data", function(data) {
        console.log(data);
    });
    response.on("error", function(error) {
        console.log(error.message);
    });
}