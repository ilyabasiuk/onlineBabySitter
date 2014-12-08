require(["webRtcHelper", "motionDetector", "alerter", "visualizer",
    "https://rawgit.com/ilyabasiuk/streamDataAnalizer/master/streamDataAnalyzer.js"],
    function(webRtcHelper, motionDetector, createAlerter, createVisualizer){
       var videoElem = document.createElement("video"),
           analyzer = streamDataAnalizer({
                expiredTime: 1000,
                defaultValue: 0
              }),
           createVisualElem = function() {
              var el = document.createElement("canvas");

              el.setAttribute("width", 20);
              el.setAttribute("heigth", 250);
              document.body.appendChild(el);

              return el;
           };

       document.body.appendChild(videoElem);
       videoElem.setAttribute("autoplay", "");
       videoElem.setAttribute("muted", "");

       webRtcHelper.init();
       webRtcHelper.onStreamReceived(function(stream){
          var alertElem = document.createElement("div"),
              alerter = createAlerter(alertElem,1.5),       // if more than 1.5 % of screen changed will conseder that moving detected
              viser = createVisualizer(createVisualElem()),
              viserAn = createVisualizer(createVisualElem());



          alertElem.classList.add("result");
          document.body.appendChild(alertElem);
          videoElem.src = URL.createObjectURL(stream);

          motionDetector.init(stream, videoElem, {callback: function(percent) {
              var filteredValue;
              analyzer.add(percent)
              viser.set(percent);
              filteredValue = analyzer.get();
              viserAn.set(filteredValue);
              alerter.put(filteredValue);
          }});
       });
    }
);
