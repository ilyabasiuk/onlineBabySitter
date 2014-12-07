var express = require("express"),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(express.static(__dirname));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected 1');
  socket.on('message', function(msg){
    console.log('message: ' + msg);
    socket.broadcast.emit('message', msg);
  });
});
