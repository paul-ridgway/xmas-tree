#!/usr/bin/env node

import { getIO, IIO } from "../utils/io/io-provider";
import { LED, RGB } from "./led";
import { LedStrip } from "./led-strip";
import { WinterLights } from "./scenes/winter-lights";
import { Scene } from "./scene";

const leds = 250;
const gpio = 18;

const step = 0.01;
let offset = 0;

// function blend(r1, g1, b1, r2, g2, b2, mix): LED {
//   mix = Math.max(Math.min(mix, 1), 0);
//   const imix = 1 - mix;
//   return new LED(
//     r1 * mix + r2 * imix,
//     g1 * mix + g2 * imix,
//     b1 * mix + b2 * imix
//   );
// }

// function pixel2(led, offset): LED {
//   let o = offset * 2;
//   if (offset > 0.5) {
//     o = 1 - (offset - 0.5) * 2;
//   }
//   let r = led / leds;
//   let g = 1 - r;
//   let b = Math.sin(r) * Math.cos(g) * Math.tan(o);
//   return blend(r, g, b, 0, 0, 0, Math.cos(o));
// }

// function rand(led, offset): LED {
//   decay = 2;
//   if (Math.random() < 0.95) {
//     return new LED();
//   }
//   return new LED(Math.random(), Math.random(), Math.random());
// }

// function greenGoblin(led, offset): RGB {
//   decay = 0;
//   const x = (led / 8) % 6;

//   const o = Math.sin(-offset * 2 * Math.PI + x * 6);

//   return {r: 0.3 * o, g: 1 * o, b: 0.5 * o};
// }

// function blueGoblin(led, offset) {
//   decay = 0;
//   const x = (led / 8) % 6;

//   const o = Math.sin(-offset * 2 * Math.PI + x * 6);

//   return new LED(0.3 * o, 0.8 * o, 1 * o);
// }

// function winterLightsNight(led, offset) {
//   decay = 2;
//   if (Math.random() < 0.99) {
//     return 0;
//   }
//   let r = Math.min(Math.random() + 0, 0.8);
//   let g = Math.random() + r;
//   const clamp = 0.35;
//   const col = new LED(
//     Math.min(r, clamp),
//     Math.min(g, clamp),
//     Math.min(1, clamp)
//   );
//   return col;
// }

// function winterLights2(led, offset) {
//   decay = 2;
//   if (Math.random() < 0.95) {
//     return 0;
//   }
//   let r = Math.min(Math.random() + 0, 0.8);
//   let g = Math.random() / 2 + r + 0.5;
//   let col;
//   if (Math.random() > 0.5) {
//     col = new LED(r, g, 1);
//   } else {
//     col = new LED(r, 1, g);
//   }
//   return col;
// }

// function chase(led, offset) {
//   if (led > 220) {
//     decay = 0;
//     return new LED(1, 0.8, 0);
//   }
//   decay = 3;
//   if (Math.round(offset * leds) !== led) {
//     return 0;
//   }
//   const mod = loops % 5;
//   if (mod == 1) {
//     decay = 4;
//     return new LED(0.3, 1, 0.5);
//   } else if (mod === 2) {
//     return new LED(0.3, 0.5, 1);
//   } else if (mod === 3) {
//     return new LED(1, 0.7, 0.5);
//   } else if (mod === 4) {
//     return new LED(1, 0.5, 1);
//   } else {
//     return new LED(0.8, 0.9, 1);
//   }
// }

export class Animator {
  private renderTimer?: NodeJS.Timer;
  private ledStrip: LedStrip;
  private io: IIO;
  private scene = new WinterLights();

  constructor(length: number) {
    this.io = getIO(leds, gpio);
    this.ledStrip = new LedStrip(length, this.io);
  }

  public getLedStrip = (): LedStrip => this.ledStrip;

  public getScene = (): Scene => this.scene;

  public setScene = (scene: Scene): void => {
    this.scene = scene;
  }

  public render = () => {
    offset += step;
    while (offset > 1) {
      offset -= 1;
    }
    // console.log(offset);
    for (var i = 0; i < leds; ++i) {
      const val: RGB = this.scene.valueFor(i, offset);
      const decay = this.scene.getDecay();
      const led: LED = this.ledStrip.get(i);
      if (decay) {
        if (led.toInt32() === 0) {
          led.add(val);;
        }
        let v = led.toInt32();
        let r = (v & 0xff0000) >> 16;
        let g = (v & 0xff00) >> 8;
        let b = v & 0xff;
        r = Math.max(0, r - decay) / 255.0;
        g = Math.max(0, g - decay) / 255.0;
        b = Math.max(0, b - decay) / 255.0;
        led.set({r, g, b});
        // pixels[i] = Math.max(pixels[i] - 1000, 0);
      } else {
        this.ledStrip.set(i, val);
      }
    }
    this.ledStrip.render();
  };

  public start = () => {
    if (this.renderTimer) {
      return;
    }
    this.renderTimer = setInterval(() => this.render(), 10);
  };

  public stop = () => {
    if (!this.renderTimer) {
      return;
    }
    clearInterval(this.renderTimer);
    this.renderTimer = undefined;
  };
}
