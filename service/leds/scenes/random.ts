import { Scene } from "../scene";
import { RGB } from "../led";

export class Random extends Scene {

  constructor() {
    super("Random");
    this.setDecay(2);
  }

  valueFor = (led: number, offset: number): RGB => {
    if (Math.random() < 0.95) {
      return { r: 0, g: 0, b: 0 }
    }
    return { r: Math.random(), g: Math.random(), b: Math.random() };

  }

}