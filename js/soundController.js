define(
    'soundController',
    [],
    function(){
      //<audio id="multiaudio1" src="audio/flute_c_long_01.wav" preload="auto"></audio>
        var audioElem = document.createElement("audio");

        audioElem.setAttribute("src", "sound/flute_c_long_01.wav");
        audioElem.setAttribute("preload", "auto");

        var channel_max = 10;										// number of channels
        var audiochannels = new Array();
        for (a=0;a<channel_max;a++) {									// prepare the channels
        	audiochannels[a] = new Array();
        	audiochannels[a]['channel'] = new Audio();						// create a new audio object
        	audiochannels[a]['finished'] = -1;							// expected end time for this channel
        }
         //
        return {
           play : function() {
              for (a=0;a<audiochannels.length;a++) {
              		thistime = new Date();
              		if (audiochannels[a]['finished'] < thistime.getTime()) {			// is this channel finished?
              			audiochannels[a]['finished'] = thistime.getTime() + audioElem.duration*1000;
              			audiochannels[a]['channel'].src = audioElem.src;
              			audiochannels[a]['channel'].load();
              			audiochannels[a]['channel'].play();
              			break;
              		}
              }
           }
        }
    }
);
