import { Scene } from "../scene";
import { RGB } from "../led";

export class BlueGoblin extends Scene {

  constructor() {
    super("BlueGoblin");
    this.setDecay(0);
  }

  valueFor = (led: number, offset: number): RGB => {
    const x = (led / 8) % 6;
    const o = Math.sin(-offset * 2 * Math.PI + x * 6);
    return { r: 0.3 * o, g: 0.8 * o, b: 1 * o };
  }

}