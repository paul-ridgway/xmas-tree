import { Scene } from "../scene";
import { RGB } from "../led";

export class WinterLights2 extends Scene {

  constructor() {
    super("WinterLights2");
    this.setDecay(2);
  }

  valueFor = (led: number, offset: number): RGB => {
  if (Math.random() < 0.95) {
    return this.blank();
  }
  let r = Math.min(Math.random() + 0, 0.8);
  let g = Math.random() / 2 + r + 0.5;
  let col;
  if (Math.random() > 0.5) {
    col = this.rgb(r, g, 1);
  } else {
    col = this.rgb(r, 1, g);
  }
  return col;
  }

}