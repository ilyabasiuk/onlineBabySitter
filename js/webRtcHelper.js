define(
    'webRtcHelper',
    function( ){
        navigator.getUserMedia =  navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
        var peerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
            iceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate,
            sessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription,
            pc,
            createPc = function(stream) {
                pc = new peerConnection(null);
                pc.addStream(stream);
                console.log("peer connection created",pc);
            };

        return {
            captureStream: function(config, onSuccess, onError ) {
                 var defaultOptions = {
                    audio: true,
                    video: true,
                    createPc: true
                 },
                 options = defaultOptions,
                 callback = onSuccess? onSuccess : function() { console.log("we've got the stream")},
                 errorCallback = onError? onError : function(e) { alert("couldn't get the stream"); console.log(e)};

                 navigator.getUserMedia(
                   { audio: options.audio, video: options.video },
                    function(stream) {
                      callback && callback(stream);
                      options.createPc && createPc(stream);
                    },
                    errorCallback
                 );
            }
        };
    }
);
