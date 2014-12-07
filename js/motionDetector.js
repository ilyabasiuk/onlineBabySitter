define(
    'motionDetector',
    [],
    function(){
      var currentStream,
          canvas,
          video,
          prevImage,
          processImage = function() {
              if (currentStream) {
                var width = canvas.width,
                    height = canvas.height;

                ctx.drawImage(video, 0, 0);
                var image = ctx.getImageData(0,0,canvas.width,canvas.height);
                var resImage =  ctx.createImageData(width,height);

                if (prevImage) {
                    var isFarFrom = function(a,b) {
                       return Math.abs(a-b) > 20;
                    };
                    var countPix = image.data.length/4,
                        countChangedPix = 0;

                    for (var i=0;i<image.data.length;i+=4){
                      var red = i, green = 1+i, blue = 2+i, alpha = 3+i;
                        if (isFarFrom(image.data[red],prevImage.data[red])
                            || isFarFrom(image.data[green],prevImage.data[green])
                            || isFarFrom(image.data[blue], prevImage.data[blue])
                            || isFarFrom(image.data[alpha], prevImage.data[alpha])) {
                        resImage.data[alpha] = 255;
                        countChangedPix++;
                        } else {

                          resImage.data[red] = 255;
                          resImage.data[green] = 255;
                          resImage.data[blue] = 255;
                          resImage.data[alpha] = 255;
                        }
                    }
                    var percent = countChangedPix/countPix * 100;
                  //  analizer.add(percent)
                  //  viz.set(percent);
                  //  var filteredValue = analizer.get();
                  //  vizAn.set(filteredValue);
                  //  alerter.put(filteredValue);
                    ctx.putImageData(resImage,0,0);
                }
                prevImage = image;
              };
          },
          step = function() {
            processImage();
            requestAnimationFrame(step);
          };
      return {
          init: function(stream, videoElem, config) {
             var defaultOptions = {},
                 options = defaultOptions;
              if (options.canvas) {
                  canvas = options.canvas;
              } else {
                  canvas = document.createElement("canvas");
                  document.body.appendChild(canvas);
              }
              video = videoElem;
              canvas = document.querySelector('canvas');
              canvas.setAttribute("height", 480);
              canvas.setAttribute("width", 640);
              ctx = canvas.getContext('2d');
              currentStream = stream;
              step();
          }
      }
    }
);
