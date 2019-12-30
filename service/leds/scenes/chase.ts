import { Scene } from "../scene";
import { RGB } from "../led";

export class Chase extends Scene {

  constructor() {
    super("Chase");
    this.setDecay(2);
  }

  valueFor = (led: number, offset: number, loops: number): RGB => {
    if (led > 220) {
      this.setDecay(0);
      return this.rgb(1, 0.8, 0);
    }
    this.setDecay(3);
    if (Math.round(offset * this.getLeds()) !== led) {
      return this.blank();
    }
    const mod = loops % 5;
    if (mod == 1) {
      this.setDecay(4);
      return this.rgb(0.3, 1, 0.5);
    } else if (mod === 2) {
      return this.rgb(0.3, 0.5, 1);
    } else if (mod === 3) {
      return this.rgb(1, 0.7, 0.5);
    } else if (mod === 4) {
      return this.rgb(1, 0.5, 1);
    } else {
      return this.rgb(0.8, 0.9, 1);
    }
  }

}