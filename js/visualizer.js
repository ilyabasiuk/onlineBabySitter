define(
    'visualizer',
    [],
    function(){
        return function(canvas) {
            var ctx = canvas.getContext("2d"),
                maxHeight = canvas.height,
                width = 30,
                height;


            return {
              set: function(value) {
                var height = maxHeight/100 * value;
                ctx.clearRect ( 0 , 0 , width , maxHeight );
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(0,0,width, height);
              }
            }
        }
    }
);
