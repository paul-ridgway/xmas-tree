import { RGB } from "./led";

export abstract class Scene {
  private decay = 0;
  private leds = 0;

  protected constructor(private name: string) {
  }

  public setLeds = (leds: number): void => { this.leds = leds };

  protected getLeds = (): number => this.leds;

  abstract valueFor(led: number, offset: number, loops: number): RGB;

  protected setDecay = (decay: number): void => {
    this.decay = decay;
  };

  public getDecay = (): number => this.decay;

  public getName = (): string => this.name;

  protected blank = (): RGB => ({ r: 0, g: 0, b: 0 });

  protected rgb = (r: number, g: number, b: number): RGB => ({ r, g, b });
}
