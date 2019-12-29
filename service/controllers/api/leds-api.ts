import { ILedsApi } from "../../../shared/api/leds-api";
export class LedsApi implements ILedsApi {

  ledValues(): Uint32Array {
    throw new Error("Method not implemented.");
  }

  sceneNames(): string[] {
    throw new Error("Method not implemented.");
  }
  currentScene(): import("../../../shared/api/leds-api").ICurrentScene {
    throw new Error("Method not implemented.");
  }
  changeScene(req: import("../../../shared/api/leds-api").IChangeScene): import("../../../shared/api/leds-api").ICurrentScene {
    throw new Error("Method not implemented.");
  }


}