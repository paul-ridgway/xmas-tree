import { IIO } from "./io-provider";

export class PiIO implements IIO {
  
  private ws281x = require('rpi-ws281x');

  constructor(leds: number, gpio: number) {    
    this.ws281x.configure({ leds, gpio });
  }

  render(pixels: Uint32Array) {
    this.ws281x.render(pixels);
  }
}
