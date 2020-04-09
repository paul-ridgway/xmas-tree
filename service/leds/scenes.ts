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
import { Xmas1 } from "./scenes/xmas-1";
import { Xmas2 } from "./scenes/xmas-2";
import { Xmas3 } from "./scenes/xmas-3";
import { Xmas4 } from "./scenes/xmas-4";
import { XmasSolid } from "./scenes/xmas-solid";
import { WhiteSolid } from "./scenes/white-solid";

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
    this.registerScene(Xmas1);
    this.registerScene(Xmas2);
    this.registerScene(Xmas3);
    this.registerScene(Xmas4);
    this.registerScene(XmasSolid);
    this.registerScene(WhiteSolid);
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
