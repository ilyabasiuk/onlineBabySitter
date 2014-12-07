define(
    'webRtcHelper',
    ["serverConnector"],
    function(con){
        navigator.getUserMedia =  navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
        var peerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
            iceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate,
            sessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription,
            pc,
            createPc = function(stream) {
                pc = new peerConnection(null);
                stream && pc.addStream(stream);
                pc.onicecandidate = onIceCandidate;
                pc.onaddstream = function(event) {
                    streamReceived && streamReceived(event.stream);
                };
            },
            onIceCandidate = function(event) {
               if (event.candidate) {
                   con.send({
                     type: 'candidate',
                     label: event.candidate.sdpMLineIndex,
                     id: event.candidate.sdpMid,
                     candidate: event.candidate.candidate
                   });
               }
            },
            createAnswer = function() {
                pc.createAnswer(
                  function(answer) {
                      pc.setLocalDescription(answer, function() {
                          // send the answer to the remote connection
                          con.send(answer);
                      });
                  },
                  function(error) { console.log(error) },
                  {'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } }
                );
            },
            streamReceived,
            errorHandler = function(e) { alert("something went wrong"); console.log(e); };

        return {
            init: function() {
              con.setHandler(function(message) {
                  if (pc) {
                      if (message.type === 'offer') {
                         pc.setRemoteDescription(new sessionDescription(message));
                         createAnswer();
                      } else if (message.type === 'answer') {
                         pc.setRemoteDescription(new sessionDescription(message));
                      } else if (message.type === 'candidate') {
                         var candidate = new iceCandidate({sdpMLineIndex: message.label, candidate: message.candidate});
                         pc.addIceCandidate(candidate);
                      }
                  }
              });
            },
            captureStream: function(config, onSuccess, onError ) {
                 var defaultOptions = {
                    audio: true,
                    video: true,
                    createPc: true
                 },
                 options = defaultOptions,
                 callback = onSuccess? onSuccess : function() { console.log("we've got the stream")},
                 errorCallback = onError? onError : errorHandler;

                 navigator.getUserMedia(
                   { audio: options.audio, video: options.video },
                    function(stream) {
                      options.createPc && createPc(stream);
                      callback && callback(stream);
                    },
                    errorCallback
                 );
            },
            setPc: function(connection) {
              pc = connection;
            },
            createOffer : function() {
              if (pc) {
                  pc.createOffer(
                      function(desc) {
                        console.log("Oh, he he got local descriptor", desc);
                        pc.setLocalDescription(desc, function() {
                            // send the offer to a server that can negotiate with a remote client
                            con.send(desc);
                        });
                  },
                  errorHandler,
                  { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true }}
                );
              } else {
                throw new Error("PeerConnection is not defined");
              }
            },
            onStreamReceived : function(callback) {
               createPc(null);
               streamReceived = callback;
            }
        };
    }
);
