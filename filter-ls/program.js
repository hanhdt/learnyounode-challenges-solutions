var fs = require('fs');
var path = require('path');

var dirName = process.argv[2];
var filteredExt = process.argv[3];

function scanningDir() {
    fs.readdir(dirName, function(err, files) {
        if (err) return console.error(err);
        for (var i = 0; i < files.length; i++) {
            if (path.extname(files[i]).split('.').pop() === filteredExt) {
                printResult(files[i]);
            }
        }
    });
}

function printResult(filteredFile) {
    console.log(filteredFile);
}

scanningDir();