import { Scene } from "../scene";
import { RGB } from "../led";

export class WhiteSolid extends Scene {
  constructor() {
    super("WhiteSolid");
    this.setDecay(0);
  }

  valueFor = (led: number, offset: number): RGB => {
    const rgb: RGB = { r: 0, g: 0, b: 0 };
    rgb.r = 0.8;
    rgb.g = 0.8;
    rgb.b = 0.8;
    return rgb;
  };
}
