define(
    'webRtcHelper',
    ["serverConnector"],
    function( ){
        navigator.getUserMedia =  navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
        var peerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
            iceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate,
            sessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription,
            pc,
            createPc = function(stream) {
                pc = new peerConnection(null);
                pc.addStream(stream);
                pc.onIceCandidate = onIceCandidate;
            },
            onIceCandidate = function(event) {
                console.log(event);
            },
            errorHandler = function(e) { alert("something went wrong"); console.log(e); };

        return {
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
                        });
                  },
                  errorHandler,
                  { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true }}
                );
              } else {
                throw new Error("PeerConnection is not defined");
              }
            }
        };
    }
);
