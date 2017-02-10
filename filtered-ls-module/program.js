var filteredLS = require('./filtered_ls.js');

filteredLS(process.argv[2], process.argv[3], printResult);

function printResult(err, filteredFiles) {
    if (err) {
        return console.error('There are errors: ', err);
    }
    filteredFiles.forEach(function(file) {
        console.log(file);
    });
}