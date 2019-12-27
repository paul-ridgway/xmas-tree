import { LED, RGB } from "./led";
import { IIO } from "../utils/io/io-provider";

export class LedStrip {
  private readonly leds: LED[];
  private readonly pixels: Uint32Array;

  constructor(private length: number, private io: IIO) {
    this.leds = new Array(length);
    this.pixels = new Uint32Array(length);
    for (let i = 0; i < this.length; i++) {
      this.leds[i] = new LED();
    }
  }

  public getIO = (): IIO => this.io;

  public set = (index: number, rgb: RGB) => {
      this.get(index).set(rgb);
  }

  public get = (index: number) => {
    if (index >= this.length) {
        throw new Error(`index of ${index} exceeds length: ${this.length}`);
    }
    return this.leds[index];
  }

  public toArray = (): Uint32Array => {
    for (let index = 0; index < this.length; index++) {
      const led = this.leds[index];
      this.pixels[index] = led.toInt32();
    }
    return this.pixels;
  };

  public render = () => {
    this.io.render(this.toArray());
  }

}
