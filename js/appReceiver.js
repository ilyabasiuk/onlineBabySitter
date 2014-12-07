require(["webRtcHelper", "motionDetector"],
    function(webRtcHelper, motionDetector){
       var videoElem = document.createElement("video");
       document.body.appendChild(videoElem);
       videoElem.setAttribute("autoplay", "");
       videoElem.setAttribute("muted", "");

       webRtcHelper.init();
       webRtcHelper.onStreamReceived(function(stream){
          videoElem.src = URL.createObjectURL(stream);
          motionDetector.init(stream, videoElem, {});
       });
    }
);
