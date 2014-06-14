var express = require('express'),
    myApp = express(),
    server = require('http').createServer(myApp),
    io = require('socket.io').listen(server);

myApp.configure(function() {
    myApp.use(express.static(__dirname + '/app'));
});

io.sockets.on('connection', function(socket) {
    socket.on('ChangedFilms', function(data) {
        socket.broadcast.emit('onChangedFilms', data);
    });
});

server.listen(1337);