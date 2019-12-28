import { Scene } from "../scene";
import { RGB } from "../led";

export class Chase2 extends Scene {

  constructor() {
    super("Chase2");
    this.setDecay(2);
  }

  valueFor = (led: number, offset: number, loops: number): RGB => {
    let col = this.blank();
    const mod = loops % 5;
    if (mod == 1) {
      this.setDecay(4);
      col = this.rgb(0.3, 1, 0.5);
    } else if (mod === 2) {
      col = this.rgb(0.3, 0.5, 1);
    } else if (mod === 3) {
      col = this.rgb(1, 0.7, 0.5);
    } else if (mod === 4) {
      col = this.rgb(1, 0.5, 1);
    } else {
      col = this.rgb(0.8, 0.9, 1);
    }
    if (led > 220) {
      this.setDecay(0);
      return col;
    }
    this.setDecay(3);
    if (Math.round(offset * this.getLeds()) !== led) {
      return this.blank();
    }
    return col;
  }

}