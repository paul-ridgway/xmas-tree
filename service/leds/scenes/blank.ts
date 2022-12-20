import { Scene } from "../scene";
import { RGB } from "../led";

export class Blank extends Scene {
  constructor() {
    super("Blank");
    this.setDecay(0);
  }

  valueFor = (led: number, offset: number): RGB => {
    return this.blank();
  };
}
