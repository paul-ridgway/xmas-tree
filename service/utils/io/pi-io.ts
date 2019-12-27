import { IIO } from "./io-provider";
import { createLogger } from "../../../shared/utils/logger";


const logger = createLogger("PiIO");

export class PiIO implements IIO {
  
  private ws281x = require('rpi-ws281x');

  constructor(private leds: number, private gpio: number) {    
    this.ws281x.configure({ leds, gpio });
  }

  render(pixels: Uint32Array) {
    this.ws281x.render(pixels);
  }
}
