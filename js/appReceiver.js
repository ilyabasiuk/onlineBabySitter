require(["webRtcHelper", "motionDetector", "alerter", "visualizer"],
    function(webRtcHelper, motionDetector, createAlerter, createVisualizer){
       var videoElem = document.createElement("video");
       document.body.appendChild(videoElem);
       videoElem.setAttribute("autoplay", "");
       videoElem.setAttribute("muted", "");

       webRtcHelper.init();
       webRtcHelper.onStreamReceived(function(stream){
          var alertElem = document.createElement("div"),
              alerter = createAlerter(alertElem,1.5),       // if more than 1.5 % of screen changed will conseder that moving detected
              visElem = document.createElement("canvas"),
              viser = createVisualizer(visElem);
              
          visElem.setAttribute("width", 20);
          visElem.setAttribute("heigth", 250);
          document.body.appendChild(visElem);

          alertElem.classList.add("result");
          document.body.appendChild(alertElem);
          videoElem.src = URL.createObjectURL(stream);

          motionDetector.init(stream, videoElem, {callback: function(k) {
              alerter.put(k);
              viser.set(k);
          }});
       });
    }
);
