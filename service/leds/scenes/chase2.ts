import { Scene } from "../scene";
import { RGB } from "../led";

export class Chase2 extends Scene {

  constructor() {
    super("Chase2");
    this.setDecay(2);
  }

  colForLoops = (loops: number): RGB => {
    const mod = loops % 5;
    let col = this.blank();
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
    return col;
  }

  valueFor = (led: number, offset: number, loops: number): RGB => {
    
    if ((offset * this.getLeds()) > 220 && led > 220) {
      this.setDecay(0);
      return this.colForLoops(loops);
    }
    this.setDecay(3);
    if (Math.round(offset * this.getLeds()) !== led) {
      return this.blank();
    }
    return this.colForLoops(loops);;
  }

}