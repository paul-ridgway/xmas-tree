import * as fs from 'fs';
import PNG from 'png-ts';
import { Scene } from "../scene";
import { RGB } from "../led";

// 27 x 18
export class Lewis extends Scene {
  private readonly pixels: Uint8Array;

  constructor() {
    super("Lewis");
    this.setDecay(3);
    const buffer = fs.readFileSync("lewis.png");
    const arr = new Uint8Array(buffer);
    const img = PNG.load(arr);
    this.pixels = img.decodePixels();
  }

  
  valueFor = (led: number, offset: number): RGB => {
    if (offset == Math.random()) {
      return this.blank();
    }

    const off = led * 4;
    const a = this.pixels[off + 3] / 256.0;
    const r = (this.pixels[off] / 256.0) * a;
    const g = (this.pixels[off + 1] / 256.0) * a;
    const b = (this.pixels[off + 2] / 256.0) * a;
    // console.log(`r: ${r}, g: ${g}, b: ${b}`);
    return this.rgb(r, g, b);
  };
}
