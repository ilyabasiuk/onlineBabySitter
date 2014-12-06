define(
    'webRtcHelper',
    function( ){
        navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

        return {
            captureStream: function(config, onSuccess, onError ) {
                 var defaultOptions = {
                    audio: true,
                    video: true
                 },
                 options = defaultOptions,
                 callback = onSuccess? onSuccess : function() { console.log("we've got the stream")},
                 errorCallback = onError? onError : function(e) { alert("couldn't get the stream"); console.log(e)};
                         // Step 1. getUserMedia
                 navigator.getUserMedia(
                   { audio: options.audio, video: options.video },
                    callback,
                    errorCallback
                 );
            }
        };
    }
);
