import * as http from "http";
import { AddressInfo } from "net";
import * as os from "os";
import { createLogger } from "../shared/utils/logger";
import { isPi } from "../shared/utils/detect-rpi";
import { Animator } from "./leds/animator";
import { normalizePort } from "./utils/port-utils";
import { WebApp } from "./webapp";
import { Scenes } from "./leds/scenes";

const logger = createLogger("server");

const processInfo = (): void => {
  logger.info(`Running on: ${os.hostname()}`);
  if (isPi()) {
    logger.info("Running on Raspberry Pi!");
  } else {
    logger.info("NOT Running on Raspberry Pi!");
  }
};

const onError = (error: any): void => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case "EACCES":
    logger.error(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case "EADDRINUSE":
    logger.error(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
};

const onListening = (): void => {
  const addr = server.address();
  let message = "Listening...";
  if (addr) {
    const addrPort = (addr as AddressInfo).port;
    if (addrPort) {
      message = `Listening on port ${addrPort}...`;
    } else if (typeof addr === "string") {
      message = `Listening on ${addr}...`;
    }
  }
  logger.info(message);
  logger.info("Starting animator");
  animator.start();
};

logger.info("Server starting...");

// Print Info
processInfo();

const leds = 250;
const animator = new Animator(leds);
const scenes = new Scenes(leds);

// Create web app
const port = normalizePort(process.env.PORT || "8080");
const app = new WebApp(animator, scenes);
app.getApp().set("port", port);

// Create server
const server = http.createServer(app.getApp());
server.on("error", onError);
server.on("listening", onListening);

// Start Listening
server.listen(port);
