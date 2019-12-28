import { WinterLights } from "./scenes/winter-lights";
import { Scene } from "./scene";
import { TallBuilding } from "./scenes/tall-building";

type SceneConstructor<T extends Scene> = new () => T;

interface SceneStore {
  [key: string]: SceneConstructor<any>;
}

export class Scenes {

  private readonly scenes: SceneStore = {};

  constructor(private leds: number) {
    this.registerScene(WinterLights);
    this.registerScene(TallBuilding);
    this.leds * 2; // TODO: Remove
  }

  public sceneNames = (): string[] => Object.keys(this.scenes);

  public get = (name: string): Scene => new this.scenes[name]();

  private registerScene<T extends Scene>(scene: SceneConstructor<T>): void {
    const s = new scene();
    this.scenes[s.getName()] = scene;
  }

}
