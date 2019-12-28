import { Scene } from "../scene";
import { RGB } from "../led";

export class WinterLightsNight extends Scene {

  constructor() {
    super("WinterLightsNight");
    this.setDecay(2);
  }

  valueFor = (led: number, offset: number): RGB => {
    if (Math.random() < 0.99) {
      return this.blank();
    }
    let r = Math.min(Math.random() + 0, 0.8);
    let g = Math.random() + r;
    const clamp = 0.35;
    return this.rgb(
      Math.min(r, clamp),
      Math.min(g, clamp),
      Math.min(1, clamp)
    );
  }

}