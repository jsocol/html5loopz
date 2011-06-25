var Timeline = (function(CHANNELS) {

    // Insert a sample at a time.
    function TimedSample(sample, time) {
        this.sample = sample;
        this.time = time;
    }

    // Stores a sequence of TimedSamples.
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
    Channel.prototype.moveSample = function(id, newTime) {
        this.samples[id].time = newTime;
        this.sort();
    };
    Channel.prototype.dumps = function() {
        var samples = [];
        for (var i=0; i<this.samples.length; i++) {
            var sample = this.samples[i];
            samples.push(sample.sample + ':' + sample.time);
        }
        return samples.join(';');
    };
    Channel.prototype.loads = function(str) {
        this.samples = [];
        var parts = str.split(';');
        for (var i=0; i<parts.length; i++) {
            var [s, t] = parts[i].split(':');
            this.samples.push(new TimedSample(s, t));
        }
        this.sort();
    };

    // Manage a collection of Channels.
    function _Timeline() {
        this.channels = [];
        for (var i = 0; i < CHANNELS; i++) {
            this.channels.push(new Channel());
        }
    }
    _Timeline.prototype.dumps = function() {
        var channels = [];
        for (var i=0; i<this.channels.length; i++) {
            channels.push(this.channels[i].dumps());
        }
        return channels.join('|');
    };
    _Timeline.prototype.loads = function(str) {
        var channels = str.split('|');
        while (channels.length > this.channels.length) {
            this.channels.push(new Channel());
        }
        for (var i=0; i<channels.length; i++) {
            this.channels[i].loads(channels[i]);
        }
    };
    return new _Timeline();
})(4);
