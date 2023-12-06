#!/usr/bin/env node

import { getIO, IIO } from "../utils/io/io-provider";
import { LED, RGB } from "./led";
import { LedStrip } from "./led-strip";
import { Scene } from "./scene";
import { Blank } from "./scenes/blank";

const gpio = 18;

export class Animator {
  private renderTimer?: NodeJS.Timer;
  private ledStrip: LedStrip;
  private io: IIO;
  private scene: Scene = new Blank();
  private loops = 0;
  private readonly step = 0.01;
  private offset = 0;


  constructor(private _length: number) {
    this.io = getIO(_length, gpio);

    // Sign remapping
    const pixMap = new Uint16Array(_length);
    // const width = 27;
    for(let i = 0; i < _length; ++i) {
      let j = i;
    //   if (Math.floor(i / width) % 2 == 1) {
    //     const mod = i % width;
    //     j = (width - 1) + (i - mod) - mod;
    //   }
    //   if (j >= length) {
    //     throw new Error(`Out of range: ${j}`);
    //   }
      pixMap[i] = j;
    }

    this.ledStrip = new LedStrip(_length, this.io, pixMap);
  }

  public getLedStrip = (): LedStrip => this.ledStrip;

  public getScene = (): Scene => this.scene;

  public setScene = (scene: Scene, reset: boolean = false): void => {
    if (reset) {
      this.ledStrip.reset();
    }
    this.scene = scene;
  }

  public render = () => {
    this.offset += this.step;
    while (this.offset > 1) {
      this.offset -= 1;
      this.loops += 1;
    }
    // console.log(offset);
    for (var i = 0; i < this._length; ++i) {
      const val: RGB = this.scene.valueFor(i, this.offset, this.loops);
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
        led.set({ r, g, b });
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
