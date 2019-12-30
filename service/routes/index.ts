import * as express from "express";
import { LedsController } from "../controllers/leds-controller";
import { Animator } from "../leds/animator";
import { Scenes } from "../leds/scenes";

export class Router {
  private readonly router = express.Router();

  constructor(animator: Animator, scenes: Scenes) {
    this.router.use("/api/leds", new LedsController(animator, scenes)
      .getRouter());
  }

  public get = (): express.Router => this.router;

}
