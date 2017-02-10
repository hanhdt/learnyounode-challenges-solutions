var filePath = process.argv[2].toString();

var fs = require('fs');
var lineNumber = undefined;

function countLine(callback){
    fs.readFile(filePath, function doneReading(err, fileContents){
        lineNumber = fileContents.toString().split('\n').length - 1;
        callback();
    });
}

function logLineNumber(){
    console.log(lineNumber);
}

countLine(logLineNumber);
