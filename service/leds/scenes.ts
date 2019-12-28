import { WinterLights } from "./scenes/winter-lights";
import { Scene } from "./scene";

type SceneConstructor<T extends Scene> = new () => T;

interface SceneStore {
  [key: string]: SceneConstructor<any>;
}

export class Scenes {

  private readonly scenes: SceneStore = {};

  constructor(private leds: number) {
    this.registerScene(WinterLights);
  }

  public sceneNames = (): string[] => Object.keys(this.scenes);

  private registerScene<T extends Scene>(scene: SceneConstructor<T>): void {
    const s = new scene();
    this.scenes[s.getName()] = scene;
  }

}
