require(["webRtcHelper"],
    function(webRtcHelper){
       var videoElem = document.createElement("video");
       document.body.appendChild(videoElem);
       videoElem.setAttribute("autoplay", "");
       videoElem.setAttribute("muted", "");

       webRtcHelper.captureStream({}, function(stream) {
          videoElem.src = URL.createObjectURL(stream);
       });
    }
);
