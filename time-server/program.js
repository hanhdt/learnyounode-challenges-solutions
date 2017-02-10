'use strict';
let net = require('net');

let server = null;

createRawServer(process.argv[2], responseCurrentDate);

function createRawServer(port, callback) {
    server = net.createServer(function(socket) {
        callback(socket);
    });
    server.listen(port);
}

function responseCurrentDate(socket) {
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let hour = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    let mm = month.split('');
    let dd = day.split('');
    let hh = hour.split('');
    let mmm = minutes.split('');
    socket.write(year + "-" + (mm[1] ? month : "0" + mm[0]) + "-" + (dd[1] ? day : "0" + dd[0]) + " " + (hh[1] ? hour : "0" + hh[0]) + ":" + (mmm[1] ? minutes : "0" + mmm[0]) + "\n");
    socket.end();
}