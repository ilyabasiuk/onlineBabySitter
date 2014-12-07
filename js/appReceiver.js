require(["webRtcHelper", "motionDetector", "alerter"],
    function(webRtcHelper, motionDetector, createAlerter){
       var videoElem = document.createElement("video");
       document.body.appendChild(videoElem);
       videoElem.setAttribute("autoplay", "");
       videoElem.setAttribute("muted", "");

       webRtcHelper.init();
       webRtcHelper.onStreamReceived(function(stream){
          var alertElem = document.createElement("div"),
              alerter = createAlerter(alertElem,1.5);       // if more than 1.5 % of screen changed will conseder that moving detected
          alertElem.classList.add("result");
          document.body.appendChild(alertElem);
          videoElem.src = URL.createObjectURL(stream);
          motionDetector.init(stream, videoElem, {callback: function(k) {
            console.log(k);
              alerter.put(k);
          }});
       });
    }
);
