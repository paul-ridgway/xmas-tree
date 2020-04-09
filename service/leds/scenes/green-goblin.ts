import { Scene } from "../scene";
import { RGB } from "../led";

export class GreenGoblin extends Scene {

  constructor() {
    super("GreenGoblin");
    this.setDecay(0);
  }

  valueFor = (led: number, offset: number): RGB => {
    const x = (led / 27) % 27;
    const o = Math.sin(-offset * 2 * Math.PI + x * 6);
    return { r: 0.3 * o, g: 1 * o, b: 0.5 * o };
  }

}