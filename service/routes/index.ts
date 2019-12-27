import * as express from "express";
import { LedsController } from "../controllers/leds-controller";
import { Animator } from "../leds/animator";

export class Router {
  private readonly router = express.Router();

  constructor(animator: Animator) {
    this.router.use("/api/leds", new LedsController(animator)
      .getRouter());
  }

  public get = (): express.Router => this.router;

}
