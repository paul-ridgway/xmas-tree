#!/usr/bin/env node
console.log("Tree!");

var ws281x = require('rpi-ws281x');

var leds = 250;

ws281x.configure({ leds, gpio: 12 });

const step = 0.01;
let offset = 0;
var pixels = new Uint32Array(leds);

let decay = 0;


function rgb(r, g, b) {
    // console.log(b);
    r = Math.max(Math.min(r, 1), 0);
    g = Math.max(Math.min(g, 1), 0);
    b = Math.max(Math.min(b, 1), 0);
    return (parseInt(r * 255) << 16) + (parseInt(g * 255) << 8) + parseInt(b * 255)
}

function blend(r1, g1, b1, r2, g2, b2, mix) {
    mix = Math.max(Math.min(mix, 1), 0);
    imix = 1 - mix;
    return rgb((r1 * mix) + (r2 * imix), (g1 * mix) + (g2 * imix), (b1 * mix) + (b2 * imix));
}

function pixel2(led, offset) {
    let mod = 0;
    let col = 0;
    let o = (offset * 2);
    if (offset > 0.5) {
        o = 1 - ((offset - 0.5) * 2);
    }
    let r = led / leds;
    let g = 1 - r;
    let b = Math.sin(r) * Math.cos(g) * Math.tan(o);
    col = blend(r, g, b, 0, 0, 0, Math.cos(o));

    // console.log(col.toString(16));
    return col;

}

function tallBuilding(led, offset) {
    decay = 20;
    if (led < 220 || (offset < 0.7 || (offset > 0.8 && offset < 0.9))) {
        return 0;
    }

    return rgb(1, 0, 0);
}

function greenGoblin(led, offset) {
    decay = 0;
    const x = (led / 8) % 6;

    const o = Math.sin((-offset * 2 * Math.PI) + x * 6);

    return rgb(0.3 * o, 1 * o, 0.5 * o);
}

function winterLights(led, offset) {
    decay = 2;
    if (Math.random() < 0.95) {
        return 0;
    }
    if ((led / leds) - offset > 0.1) {
        // return 0;
    }
    // let mod = 0;
    // let col = 0;
    // let o = (offset * 2);
    // if (offset > 0.5) {
    //     o = 1 - ((offset - 0.5) * 2);
    // }
    // let r = led / leds;
    // let g = 1 - r;
    // let b = Math.sin(r) * Math.cos(g) * Math.tan(o);
    // col = blend(r, g, b, 0, 0, 0, Math.cos(o));
    // col = rgb(Math.random(), Math.random(), Math.random());
    let r = Math.min(Math.random() + 0, 0.8);
    let g = Math.random() + r;
    col = rgb(r, g, 1);

    return col;

}

function render() {
    offset += step;
    while (offset > 1) {
        offset -= 1;
    }
    console.log(offset);
    for (var i = 0; i < leds; ++i) {
        if (decay) {
            if (pixels[i] === 0) {
                pixels[i] += greenGoblin(i, offset);
            }
            let v = pixels[i];
            let r = (v & 0xFF0000) >> 16;
            let g = (v & 0xFF00) >> 8;
            let b = v & 0xFF
            r = Math.max(0, r - decay);
            g = Math.max(0, g - decay);
            b = Math.max(0, b - decay);
            pixels[i] = (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b);
            // pixels[i] = Math.max(pixels[i] - 1000, 0);
        } else {
            pixels[i] = greenGoblin(i, offset);
        }
    }
    ws281x.render(pixels);
}

setInterval(render, 10);