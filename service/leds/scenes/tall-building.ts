import { Scene } from "../scene";
import { RGB } from "../led";

export class TallBuilding extends Scene {

  constructor() {
    super("TallBuilding");
    this.setDecay(20);
  }

  valueFor = (led: number, offset: number): RGB => {
    if (led < 220 || offset < 0.7 || (offset > 0.8 && offset < 0.9)) {
      return {r: 0, g: 0, b: 0};
    }
  
    return {r: 1, g: 0, b: 0};
  }

}