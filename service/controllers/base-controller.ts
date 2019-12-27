import * as express from "express";

export class BaseController {
  private readonly router = express.Router();

  public getRouter(): express.Router {
    return this.router;
  }
}
