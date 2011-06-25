var Player = (function(RATE) {
    var output = new Audio(),
        playloop;
    output.mozSetup(1, RATE);

    function Silence(length) {
        return new Float32Array(length);
    }

    return {
        play: function(timeline) {
            var CHANNELS = timeline.channels.length,
                audio = [],
                tracklength = 0;

            for (var c=0; c<CHANNELS; c++) {
                if (timeline.channels[c].samples.length == 0) continue;
                var chan = timeline.channels[c],
                    samp = chan.samples,
                    last = samp[samp.length - 1];
                var end = last.time + Library[last.sample].sample.length;
                if (tracklength < end) {
                    tracklength = end;
                }
            }

            var compiled = new Float32Array(tracklength);

            for (var c=0; c<CHANNELS; c++) {
                // Compile each channel.
                var channel = timeline.channels[c],
                    SAMPLES = channel.samples.length,
                    cursor = 0,
                    data = new Float32Array(tracklength);
                for (var s=0; s<SAMPLES; s++) {
                    var sample = channel.samples[s],
                        clip = Library[sample.sample];
                    if (cursor < sample.time) {
                        data.set(Silence(sample.time - cursor), cursor);
                        cursor = sample.time;
                    }
                    data.set(clip.sample, cursor);
                    cursor += clip.sample.length;
                }
                audio.push(data);
            }
            for (var j=0; j<tracklength; j++) {
                for (var k=0; k<CHANNELS; k++) {
                    compiled[j] += audio[k][j];
                }
                compiled[j] /= CHANNELS;
            }

            //drawSample($('#debug')[0], compiled);

            var currentWritePosition = 0,
                bufferSize = 22050,
                tail = null,
                counter = 0;
            playloop = setInterval(function() {
                var written;
                if (tail) {
                    written = output.mozWriteAudio(tail);
                    currentWritePosition += written;
                    if (written < tail.length) {
                        tail = tail.subarray(written, tail.length);
                        return;
                    }
                    tail = null;
                }

                var sliceEnd = currentWritePosition + bufferSize,
                    soundData = compiled.subarray(currentWritePosition, sliceEnd);
                written = output.mozWriteAudio(soundData);
                currentWritePosition += written;
                if (written < soundData.length) {
                    tail = soundData.subarray(written, soundData.length);
                }
                if (counter > 10) clearInterval(playloop);
                counter++;
            }, 100);
        },
        pause: function() {
            output.pause();
            clearInterval(playloop);
        }
    }
})(44100);
