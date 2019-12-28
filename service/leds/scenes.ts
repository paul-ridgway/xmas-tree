import { WinterLights } from "./scenes/winter-lights";
import { Scene } from "./scene";
import { TallBuilding } from "./scenes/tall-building";
import { GreenGoblin } from "./scenes/green-goblin";
import { BlueGoblin } from "./scenes/blue-goblin";
import { Random } from "./scenes/random";
import { Chase } from "./scenes/chase";
import { Chase2 } from "./scenes/chase2";
import { WinterLightsNight } from "./scenes/winter-lights-night";
import { WinterLights2 } from "./scenes/winter-lights-2";

type SceneConstructor<T extends Scene> = new () => T;

interface SceneStore {
  [key: string]: SceneConstructor<any>;
}

export class Scenes {

  private readonly scenes: SceneStore = {};

  constructor(private leds: number) {
    this.registerScene(WinterLights);
    this.registerScene(WinterLights2);
    this.registerScene(WinterLightsNight);
    this.registerScene(TallBuilding);
    this.registerScene(GreenGoblin);
    this.registerScene(BlueGoblin);
    this.registerScene(Random);
    this.registerScene(Chase);
    this.registerScene(Chase2);
  }

  public sceneNames = (): string[] => Object.keys(this.scenes);

  public get = (name: string): Scene => {
    const scene = new this.scenes[name]();
    scene.setLeds(this.leds);
    return scene;
  };

  private registerScene<T extends Scene>(scene: SceneConstructor<T>): void {
    const s = new scene();
    this.scenes[s.getName()] = scene;
  }

}
