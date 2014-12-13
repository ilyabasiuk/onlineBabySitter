define(
    'soundController',
    [],
    function(){
        var audioElem = document.createElement("audio"),
            channel_max = 10,										// number of channels
            audiochannels = new Array(),
            a;

        audioElem.setAttribute("src", "sound/flute_c_long_01.wav");
        audioElem.setAttribute("preload", "auto");

        for (a=0;a<channel_max;a++) {									// prepare the channels
        	audiochannels[a] = new Array();
        	audiochannels[a]['channel'] = new Audio();						// create a new audio object
        	audiochannels[a]['finished'] = -1;							// expected end time for this channel
        }

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
