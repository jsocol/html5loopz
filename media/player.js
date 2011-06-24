var Player = (function(RATE) {
    var output = new Audio();
    output.mozSetup(1, RATE);

    function Silence(length) {
        return new Float32Array(length);
    }

    return {
        play: function(timeline) {
            var CHANNELS = timeline.channels.length,
                audio = [],
                compiled = new Float32Array();
            for (var c=0; c<CHANNELS; c++) {
                // Compile each channel.
                var channel = timeline.channels[c],
                    SAMPLES = channel.samples.length,
                    data=new Float32Array(),
                    cursor=0;
                for (var s=0; s<SAMPLES; s++) {
                    var sample = channel.samples[i],
                        clip = Library[sample.sample];
                    if (cursor < sample.time) {
                        data.push.apply(data, Silence(sample.time - cursor));
                        cursor += sample.time;
                    }
                    data.push.apply(data, clip.sample);
                    cursor += clip.sample.length;
                }
                audio.push(data);
            }
            var max = 0;
            for (var i=0; i<CHANNELS; i++) {
                if (audio[i].length > max) max = audio[i].length;
            }
            for (var j=0; j<max; j++) {
                compiled.push((audio[0][j] + audio[1][j] + audio[2][j] + audio[3][j])/4);
            }
            output.mozWriteAudio(compiled);
        },
        pause: function() {
            output.pause();
        }
    }
})(44100);
