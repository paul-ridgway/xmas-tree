import * as express from "express";
import { BaseController } from "./base-controller";
import { Animator } from "../leds/animator";
import { LedStrip } from "../leds/led-strip";
import { Scenes } from "../leds/scenes";

// const logger = createLogger("DoorbellController");

export class LedsController extends BaseController {

  private readonly ledStrip: LedStrip;

  constructor(private animator: Animator, private scenes: Scenes) {
    super();
    this.ledStrip = animator.getLedStrip();
    this.getRouter().post("/values", this.values);
    this.getRouter().post("/scenenames", this.sceneNames);
    this.getRouter().post("/currentscene", this.currentScene);
    this.getRouter().post("/changescene", this.changeScene);
    
  }

  private values = (req: express.Request, res: express.Response): void => {
    res.send(this.ledStrip.toArray(true));
  }

  private sceneNames = (req: express.Request, res: express.Response): void => {
    res.send(this.scenes.sceneNames());
  }

  private currentScene = (req: express.Request, res: express.Response): void => {
    res.send({name: this.animator.getScene().getName()});
  }

  private changeScene = (req: express.Request, res: express.Response): void => {
    this.animator.setScene(this.scenes.get(req.body.name));
    res.send({name: this.animator.getScene().getName()});
  }

}
