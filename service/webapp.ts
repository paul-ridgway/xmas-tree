import cookieParser = require("cookie-parser");
import * as express from "express";
import * as createHttpError from "http-errors";
import { Router } from "./routes";
import expressLogger from "../shared/utils/express-logger";

import path = require("path");
import { Animator } from "./leds/animator";
import { Scenes } from "./leds/scenes";

export class WebApp {

  private readonly webapp = express();

  constructor(animator: Animator, scenes: Scenes) {
    const router = new Router(animator, scenes);

    this.webapp.use(expressLogger);
    this.webapp.use(express.json());
    this.webapp.use(express.urlencoded({ extended: false }));
    this.webapp.use(cookieParser());
    this.webapp.use(express.static(path.join(__dirname, "../web/build")));

    this.webapp.use(router.get());

    // catch 404 and forward to error handler
    this.webapp.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(createHttpError(404));
    });

    // error handler
    this.webapp.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });
  }

  public getApp = (): express.Express => this.webapp;

}
