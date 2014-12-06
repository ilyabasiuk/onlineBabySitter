var express = require("express"),
    app = express(),
    http = require('http').Server(app);

app.use(express.static(__dirname));
http.listen(3000, function(){
  console.log('listening on *:3000');
});
