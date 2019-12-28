import { Scene } from "../scene";
import { RGB } from "../led";

export class WinterLights extends Scene {

  constructor() {
    super("WinterLights");
    this.setDecay(2);
  }

  valueFor = (led: number, offset: number): RGB => {
    if (Math.random() < 0.95) {
      return { r: 0, g: 0, b: 0};
    }
    let r = Math.min(Math.random() + 0, 0.8);
    let g = Math.random() + r;
    return {r, g, b: 1};
  }

}