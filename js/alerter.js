define(
    'alerter',
    ["soundController"],
    function(soundController){
      return function(el, limit) {
        var prevState = false,
            player = function() {
              var timerId,
                  play =  function() {
                    soundController.play();
                    timerId = setTimeout(function() {
                      play();
                    }, 1000);
                  };

                return {
                  play: play,
                  stop: function() {
                    clearTimeout(timerId);
                  }
              }
            },
            changeState = function(state) {
                prevState = state;
                if (state) {
                  el.innerText = "ALARM";
                  el.classList.add("alarm");
                  player.play();
                } else {
                  el.innerText = "Silent";
                  el.classList.remove("alarm");
                  player.stop();
                }
            };

        return {
            put : function(value) {
                var isMoving = (value> limit);
                if (isMoving !== prevState) {
                  changeState(isMoving);
                }
            }
        }
      }
    }
);
