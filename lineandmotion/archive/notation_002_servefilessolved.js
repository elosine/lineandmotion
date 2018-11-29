var socket = io();
socket.on('oscmsg',
  function(msg) {
    let tn = document.createTextNode(msg);
    document.body.appendChild(tn);
    console.log('fdsaf');
  });
