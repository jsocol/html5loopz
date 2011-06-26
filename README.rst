===========
HTML5 Loopz
===========

HTML5 Loop(z|s) is a track/loop mixer in HTML5 using nothing but HTML, CSS and
JavaScript. It targets Firefox >= 4 because it uses ``TypedArrays`` and the
Mozilla audio-writing API (``Audio().mozWriteAudio()``). Other browser support
would be great.

We generate audio on the fly from JS by writing the waveform directly into the
audio system. Right now we can mix down and render 4 channel audio somewhere
between "insanely" fast and "holy shit" fast.


Credits
=======

`Matt Claypotch <https://github.com/potch>`_ and `James Socol
<https://github.com/jsocol>`_ created this as a one-day hack for an event `Jeff
Balogh <https://github.com/jbalogh>`_ put together.


TODO
====

V1:

* Make the UI correctly add samples to channels. (Timing is off.)
* Finish the drag/drop events. (Moving and Removing need implemetation.)
* Investigate audio writing issues. (Writing data too quickly?)
* Store serialized Timelines in localStorage with names.
* Add more clips.
* Make phat beatz with Kumar!

V+:

* Drag/drop + FileAPI: add custom samples from .wav/.ogg.
* Share Timelines (requires server-side component) via URL.
* Bounce down to stereo.
* Keyframed output channel fade control.
* Generate .wav files in humongous data URIs--let people download/save.
* Add/remove channels.
* On-the-fly waveform rendering (instead of pre-rendering the whole thing).
* Timeline UI zooming and scaling.
* Timeline transforms (e.g.: scale by X, pitch modulate, volume controls).

Vlolmaybe:

* Bounce down to 5.1.
