var express = require('express');
var app = require('express')();
var path = require('path');


//Launch 'index.html'
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/webgl_gpgpu_water.html'));
});
//Set Up Static File Serving
app.use(express.static(path.join(__dirname, '/public')));

//start http server
app.listen(4321, function() {
  console.log('listening on *:4321');
});
