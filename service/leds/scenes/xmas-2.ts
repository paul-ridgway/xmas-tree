import { Scene } from "../scene";
import { RGB } from "../led";

export class Xmas2 extends Scene {

  constructor() {
    super("Xmas1+Decay");
    this.setDecay(2);
  }

  valueFor = (led: number, offset: number): RGB => {
    if (Math.random() < 0.9) {
      return this.blank();
    }
    const x = led % 4;
    const rgb: RGB = { r: 0, g: 0, b: 0 };
    const pi = offset * Math.PI * 2;
    switch (x) {
      case 0:
        rgb.r = 1;
        rgb.r *= Math.sin(pi);
        break;
      case 1:
        rgb.g = 1;
        rgb.g *= Math.sin(pi - (Math.PI / 2));
        break;
      case 2:
        rgb.b = 1;
        rgb.b *= Math.sin(pi - (2 * (Math.PI / 2)));
        break;
      case 3:
        rgb.r = 1;
        rgb.g = 1;
        rgb.r *= Math.sin(pi - (3 * (Math.PI / 2)));
        rgb.g *= Math.sin(pi - (3 * (Math.PI / 2)));
        break;
    }
    return rgb;
  }

}