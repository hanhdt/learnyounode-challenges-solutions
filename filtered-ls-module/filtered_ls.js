var fs = require('fs');
var path = require('path');

// Export function for reading files in the directory with specific ext.
module.exports = function(dirname, ext, callback) {
    fs.readdir(dirname, function(err, files) {
        if (err) {
            return callback(err);
        }
        files = files.filter(function(file) {
            return path.extname(file).split('.').pop() === ext
        });
        callback(null, files);
    });
}