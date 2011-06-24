var Timeline = (function(CHANNELS) {
    function TimedSample(sample, time) {
        this.sample = sample;
        this.time = time;
    }
    function Channel() {
        this.samples = [];
    }
    Channel.prototype.sort = function () {
        this.samples.sort(function (a, b) {
            return a.time - b.time;
        });
    };
    Channel.prototype.addSample = function (sample, time) {
        var ts = new TimedSample(sample, time);
        this.samples.push(ts);
        this.sort();
        return this.samples.indexOf(ts);
    };
    Channel.prototype.removeSample = function(id) {
        this.samples.splice(id, 1);
        this.sort();
    };
    function _Timeline() {
        this.channels = [];
        for (var i = 0; i < CHANNELS; i++) {
            this.channels.push(new Channel());
        }
    }
    return new _Timeline();
})(4);
