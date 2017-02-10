var readFilePath = process.argv[2].toString();

var fs = require('fs');

var fileContents = fs.readFileSync(readFilePath, 'utf8');

var linesArray = fileContents.split('\n');

console.log(linesArray.length - 1);
