define(
    'serverConnector',
    ["/socket.io/socket.io.js"],
    function(io){
      var socket = io.connect('', {port: 3000}),
          handler;

      socket.on('message', function (message){
          handler && handler(message);
      });

      return {
        send: function(message) {
          socket.emit('message', message);
        },
        setHandler : function(onMessage) {
          handler = onMessage;
        }
      }
    }
);
