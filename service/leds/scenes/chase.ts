import { Scene } from "../scene";
import { RGB } from "../led";

export class Chase extends Scene {

  constructor() {
    super("Chase");
    this.setDecay(5);
  }

  valueFor = (led: number, offset: number, loops: number): RGB => {
    if (led % 27 === Math.floor(offset * 27)) {
      return this.rgb(1,1,1);
    }

    return this.blank();
  }

}