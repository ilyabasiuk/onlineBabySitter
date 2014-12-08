require(["peer"],
    function(webRtcHelper){
       var videoElem = document.createElement("video");
       document.body.appendChild(videoElem);
       videoElem.setAttribute("autoplay", "");
       videoElem.setAttribute("muted", "");


      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      var peer = new Peer({key: 'rnaw2gwjnj1exw29'});

      navigator.getUserMedia({video: true, audio: true}, function(stream) {
        var call = peer.call('wersdfxcv', stream);
        videoElem.src = URL.createObjectURL(stream);
        // call.on('stream', function(remoteStream) {
        //   // Show stream in some video/canvas element.
        // });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });

      //  webRtcHelper.init();
      //  webRtcHelper.captureStream({}, function(stream) {
      //     videoElem.src = URL.createObjectURL(stream);
      //     webRtcHelper.createOffer();
      //  });
    }
);
