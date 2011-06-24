var snare = (function() {
    var samples = new Float32Array(44100);
    var len = samples.length;
    for (var i=0; i < len; i++) {
        samples[i] = (Math.random() * 2 - 1) * ((i-len)/len);
    }
    return fadeOut(samples);
})();
function fadeOut(samp) {
    var len = samp.length;
    for (var i=0; i < len; i++) {
        samp[i] = samp[i]*((len-i)/len);
    }
    return samp;
}

var wave = (function() {
    var samples = new Float32Array(44100);
    for (var i=0; i < 44100; i++) {
        samples[i] = Math.sin(i/Math.PI);
    }
    return samples;
})();

function SampleCanvas(sample) {
    var $canvas = $('<canvas height="50" width="250">'),
        ctx = $canvas[0].getContext('2d'),
        HEIGHT = 50, WIDTH = 250;

    ctx.beginPath();
    ctx.translate(0, HEIGHT/2);
    for (var i=1; i<=WIDTH; i++) {
        var j = ~~(i / WIDTH * 44100),
            A = ~~((HEIGHT/2) * Math.abs(sample[j]));
        ctx.moveTo(i, A);
        ctx.lineTo(i, -A);
    }
    ctx.stroke();
    return $canvas[0];
}


