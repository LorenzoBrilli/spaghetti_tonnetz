# Spaghetti Tonnetz

Spaghetti Tonnetz is a tonnetz diagram viewer built for browser in html5+css3+javascript using canvas html5 canvas element for graphics and the Web Audio API for sound.

The project was initially based on the [p5.js](https://p5js.org/) and [p5.sound](https://github.com/processing/p5.js-sound) open source libraries to handle graphics and sound, then moved to html5 api just for educational purposes.

## Getting Started

You just need to serve the src folder through a web server, then navigate to the index.html file to run the software. Midi functionality on Chrome needs the page to be on localhost or https server. If you want you can build a single html file using the provided pure python3 script inside the build directory wich simply replace all external css and js with internal css and js.

## Browser Compatibility

This project is compatible with most common browser even on mobile, however midi functionality is available just for few browser (Chrome included).

## Built With

* HTML5 + CSS3 + Javascript
* HTML5 Canvas - Render the graphics
* Web Audio API - Handle Audio generation with a simple Polyphonic Synthesizer
* [webmidi.js](https://github.com/djipco/webmidi) - Web MIDI API helper
* [Montserrat Project Font](https://github.com/JulietaUla/Montserrat) - Very cool font (base64 encoded)

## Authors

* **Brilli Lorenzo** - [LorenzoBrilli](https://github.com/LorenzoBrilli)

## Why "Spaghetti"

Because yes.

## License

This project is licensed under the GNU General Public License v3 - see LICENSE.txt for details.

Spaghetti Tonnetz - browser tonnetz visualizator.
Copyright (C) 2020  Brilli Lorenzo