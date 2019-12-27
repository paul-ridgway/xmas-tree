#!/usr/bin/env node
console.log("Tree!");

var ws281x = require('rpi-ws281x');

var leds = 250;

ws281x.configure({ leds, gpio: 18 });

const step = 0.01;
let offset = 0;
var pixels = new Uint32Array(leds);

let decay = 0;
let loops = 0;


function rgb(r: number, g: number, b: number) {
    r = Math.max(Math.min(r, 1), 0);
    g = Math.max(Math.min(g, 1), 0);
    b = Math.max(Math.min(b, 1), 0);
    return (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255)
}

function blend(r1, g1, b1, r2, g2, b2, mix) {
    mix = Math.max(Math.min(mix, 1), 0);
    const imix = 1 - mix;
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

function rand(led, offset) {
    decay = 2;
    if (Math.random() < 0.95) {
        return 0;
    }
    return rgb(Math.random(), Math.random(), Math.random());
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

function blueGoblin(led, offset) {
    decay = 0;
    const x = (led / 8) % 6;

    const o = Math.sin((-offset * 2 * Math.PI) + x * 6);

    return rgb(0.3 * o, 0.8 * o, 1 * o);
}

function winterLights(led, offset) {
    decay = 2;
    if (Math.random() < 0.95) {
        return 0;
    }
    let r = Math.min(Math.random() + 0, 0.8);
    let g = Math.random() + r;
    const col = rgb(r, g, 1);
    // col = rgb(g, 1, g);
    return col;
}

function winterLightsNight(led, offset) {
    decay = 2;
    if (Math.random() < 0.99) {
        return 0;
    }
    let r = Math.min(Math.random() + 0, 0.8);
    let g = Math.random() + r;
    const clamp = 0.35
    const col = rgb(Math.min(r, clamp), Math.min(g, clamp), Math.min(1, clamp));
    return col;
}

function winterLights2(led, offset) {
    decay = 2;
    if (Math.random() < 0.95) {
        return 0;
    }
    let r = Math.min(Math.random() + 0, 0.8);
    let g = (Math.random() / 2) + r + 0.5;
    let col;
    if (Math.random() > 0.5) {
        col = rgb(r, g, 1);
    } else {
        col = rgb(r, 1, g);
    }
    return col;
}

function chase(led, offset) {
    if (led > 220) {
        decay = 0;
        return rgb(1, 0.8, 0);
    }
    decay = 3;
    if (Math.round(offset * leds) !== led) {
        return 0;
    }
    const mod = loops % 5;
    if (mod == 1) {
        decay = 4;
        return rgb(0.3, 1, 0.5);
    } else if (mod === 2) {
        return rgb(0.3, 0.5, 1);
    } else if (mod === 3) {
        return rgb(1, 0.7, 0.5);
    } else if (mod === 4) {
        return rgb(1, 0.5, 1);
    } else {
        return rgb(0.8, 0.9, 1);
    }
}

function render() {
    offset += step;
    while (offset > 1) {
        offset -= 1;
        ++loops;
    }
    // console.log(offset);
    for (var i = 0; i < leds; ++i) {
        const val = winterLights(i, offset);
        if (decay) {
            if (pixels[i] === 0) {
                pixels[i] += val;
            }
            let v = pixels[i];
            let r = (v & 0xFF0000) >> 16;
            let g = (v & 0xFF00) >> 8;
            let b = v & 0xFF
            r = Math.max(0, r - decay);
            g = Math.max(0, g - decay);
            b = Math.max(0, b - decay);
            pixels[i] = (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b);
            // pixels[i] = Math.max(pixels[i] - 1000, 0);
        } else {
            pixels[i] = val;
        }
    }
    ws281x.render(pixels);
}

setInterval(render, 10);
