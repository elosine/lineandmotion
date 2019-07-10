//load express module
var express = require('express');
//variable to hold express application
var app = require('express')();
//path module: utilities for working with file and directory paths
var path = require('path');
//Serve static files from server to client
//.use is setting up middleware
//enable file serving from the base directory 'public'
//this allows me to link my html to javascript files
//as well as serve any other files like svgs
app.use(express.static(path.join(__dirname, '/public')));
//use res.sendFile to serve files
// __dirname is th path of the current module;
//path.join is from path utility to join 2 paths
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
//start http server
app.listen(4321, function() {
  console.log('listening on *:4321');
});
