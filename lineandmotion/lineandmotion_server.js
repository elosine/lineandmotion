var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Set Up http server
app.use(express.static('public'));

app.get('/vln1', function(request, response) {
  response.sendFile(__dirname + '/public/violin1.html');
});
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

http.listen(4321, function() {
  console.log('listening on *:4321');
});

//Set Up websockets
io.on('connection', function(socket) {
  console.log('a user connected ' + socket.id);
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

//Set Up OSC
var osc = require("osc");
//listening port
var udpPort = new osc.UDPPort({
  localAddress: "127.0.0.1",
  localPort: 12321,
});
//////////////////////////////////////////////////////////////
//WEB SOCKET OSC MESSAGE FORWARDING /////////////////////////
//////////////////////////////////////////////////////////////
udpPort.on("message", function(msg) {

  //mkcirc
  if (msg.address == '/mkcirc') {
    io.emit('mkcirc', msg.args);
  }

  //newtime
  if (msg.address == '/newtime') {
    io.emit('newtime', msg.args);
  }

});

udpPort.open();
