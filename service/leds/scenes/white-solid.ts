import { Scene } from "../scene";
import { RGB } from "../led";

export class WhiteSolid extends Scene {
  constructor() {
    super("WhiteSolid");
    this.setDecay(0);
  }

  valueFor = (led: number, offset: number): RGB => {
    const rgb: RGB = { r: 0, g: 0, b: 0 };
    rgb.r = 1;
    rgb.g = 1;
    rgb.b = 1;
    return rgb;
  };
}
