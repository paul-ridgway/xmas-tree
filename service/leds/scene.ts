import { RGB } from "./led";

export abstract class Scene {
  private decay = 0;

  protected constructor(private name: string) {
    
  }

  abstract valueFor(led: number, offset: number): RGB;

  protected setDecay = (decay: number): void => {
    this.decay = decay;
  };

  public getDecay = (): number => this.decay;

  public getName = (): string => this.name;
}
