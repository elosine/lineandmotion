//load express module
var express = require('express');
//variable to hold express application
var app = require('express')();
//path module: utilities for working with file and directory paths
var path = require('path');



//Serve static files from server to client
//.use is setting up middleware
//enable file serving from the base directory 'public'
app.use(express.static('public'));
//use res.sendFile to send html files
// __dirname is th path of the current module; however above we made
//the default directory 'public' so __dirname will refer to 'public'
//use the path utility to join __dirname (public) to 'index.html'
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});


//start http server
app.listen(4321);
