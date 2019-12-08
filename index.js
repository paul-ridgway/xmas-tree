#!/usr/bin/env node

console.log("Tree!");

var ws281x = require('rpi-ws281x');

var leds = 250;

// One time initialization
ws281x.configure({ leds, gpio: 12 });


let offset = 0;
var pixels = new Uint32Array(leds);

function pixel(led, offset) {
    let mod = (led + offset) % 2;
    let col = 0;
    // Set a specific pixel
    if (mod === 0) {
        col = 0xFF00ff;
    } else if (mod === 1) {
        col = 0xFFAA00;
    } else if (mod === 4) {
        // col = 0x0000FF;
    } else if (mod === 6) {
        // col = 0xFFAA00;
    }
    return col;

}

function render() {
    offset = (offset + 1) % leds;
    for (var i = 0; i < leds; ++i) {
        pixels[i] = pixel(i, offset);
    }
    ws281x.render(pixels);
}

setInterval(render, 100);