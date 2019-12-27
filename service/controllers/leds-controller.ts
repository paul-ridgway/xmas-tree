import * as express from "express";
import { inspect } from "util";
import { BaseController } from "./base-controller";
import { createLogger } from "../../shared/utils/logger";
import { Animator } from "../leds/animator";
import { LedStrip } from "../leds/led-strip";

const logger = createLogger("DoorbellController");

export class LedsController extends BaseController {

  private readonly ledStrip: LedStrip;

  constructor(animator: Animator) {
    super();
    this.ledStrip = animator.getLedStrip();
    this.getRouter().post("/values", this.values);
  }

  private values = (req: express.Request, res: express.Response): void => {
    res.send(this.ledStrip.toArray());
  }

}
