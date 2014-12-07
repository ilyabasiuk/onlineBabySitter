define(
    'alerter',
    [],
    function(){
      return function(el, limit) {
        var prevState = false,
            changeState = function(state) {
                prevState = state;
                if (state) {
                  el.innerText = "ALARM";
                  el.classList.add("alarm");
                } else {
                  el.innerText = "Silent";
                  el.classList.remove("alarm");
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
