import { Scene } from "../scene";
import { RGB } from "../led";

export class XmasSolid extends Scene {

  constructor() {
    super("XmasSolid");
    this.setDecay(0);
  }

  valueFor = (led: number, offset: number): RGB => {
    const x = led % 4;
    const rgb: RGB = { r: 0, g: 0, b: 0 };
    switch (x) {
      case 0:
        rgb.r = 1;
        break;
      case 1:
        rgb.g = 1;
        break;
      case 2:
        rgb.b = 1;
        break;
      case 3:
        rgb.r = 1;
        rgb.g = 1;
        break;
    }
    return rgb;
  }

}